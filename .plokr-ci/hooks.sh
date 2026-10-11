#!/usr/bin/env bash
# Vendored by plokr-ci. DO NOT EDIT here; edit plokr-ci and re-sync (check-drift.sh enforces this).
#
# Git-hook helpers invoked by lefthook.yml. Works in Git Bash on Windows and on Linux.
#
#   hooks.sh commit-msg <msg-file>
#   hooks.sh gitleaks-staged
#   hooks.sh gitleaks-push          (reads git pre-push stdin)
#   hooks.sh semgrep                (pre-push; warns loudly if neither semgrep nor docker exists)
#   hooks.sh gofmt <files...>
#   hooks.sh golangci
#   hooks.sh govulncheck
#   hooks.sh eslint <files...>
#   hooks.sh npm-audit
#
# The pre-push hook is the compensating control for GitHub Free, which cannot
# enforce branch protection on private repos. `git push --no-verify` bypasses
# it; CI still runs every gate on the pushed commits.
set -euo pipefail

# Keep these in sync with _security-common.yml (both are vendored from plokr-ci).
readonly GITLEAKS_VERSION="v8.30.1"
readonly GOVULNCHECK_VERSION="v1.8.0"
readonly SEMGREP_IMAGE="semgrep/semgrep@sha256:32e459968daabe7ab86968184a29109b9564aa00392401156f9788452b42786b"
readonly ZERO_SHA="0000000000000000000000000000000000000000"

root="$(git rev-parse --show-toplevel)"
cd "$root"

red()  { printf '\033[31m%s\033[0m\n' "$*" >&2; }
warn() { printf '\033[33m%s\033[0m\n' "$*" >&2; }

# Run gitleaks from PATH, or fall back to `go run` of the pinned version.
gitleaks_cmd() {
  if command -v gitleaks >/dev/null 2>&1; then
    gitleaks "$@"
  elif command -v go >/dev/null 2>&1; then
    go run "github.com/zricethezav/gitleaks/v8@${GITLEAKS_VERSION}" "$@"
  else
    red "gitleaks is required for this hook but was not found."
    red "Install it: winget install gitleaks | brew install gitleaks | https://github.com/gitleaks/gitleaks/releases"
    return 1
  fi
}

cmd_commit_msg() {
  local file="${1:?commit message file required}"
  local subject
  subject="$(grep -v '^#' "$file" | sed -e 's/\r$//' | grep -m1 -v '^[[:space:]]*$' || true)"
  local re='^(feat|fix|refactor|docs|test|chore|perf|ci|build|revert)(\([A-Za-z0-9._/-]+\))?!?: .+'
  if [[ "$subject" =~ $re ]]; then return 0; fi
  # Git-generated subjects are allowed through unchanged.
  if [[ "$subject" =~ ^(Merge\ |Revert\ \"|fixup!\ |squash!\ |amend!\ ) ]]; then return 0; fi
  red "commit-msg: subject does not follow Conventional Commits:"
  red "  '$subject'"
  red "expected: <type>(<scope>)?!?: <description>"
  red "types:    feat fix refactor docs test chore perf ci build revert"
  return 1
}

cmd_gitleaks_staged() {
  gitleaks_cmd protect --staged --config .plokr-ci/gitleaks.toml --redact --no-banner
}

cmd_gitleaks_push() {
  local _local_ref local_sha _remote_ref remote_sha range any=0
  while read -r _local_ref local_sha _remote_ref remote_sha; do
    [[ -z "${local_sha:-}" || "$local_sha" == "$ZERO_SHA" ]] && continue  # branch deletion
    if [[ "$remote_sha" == "$ZERO_SHA" ]]; then
      # New remote branch: scan everything not already on origin/main.
      if git rev-parse --verify --quiet origin/main >/dev/null; then
        range="origin/main..${local_sha}"
      else
        range="${local_sha}"
      fi
    else
      range="${remote_sha}..${local_sha}"
    fi
    any=1
    echo "gitleaks: scanning ${range}"
    gitleaks_cmd detect --config .plokr-ci/gitleaks.toml --redact --no-banner --log-opts="${range}"
  done
  if (( any == 0 )); then
    # No stdin (e.g. manual `lefthook run pre-push`): scan what origin/main lacks.
    if git rev-parse --verify --quiet origin/main >/dev/null; then
      gitleaks_cmd detect --config .plokr-ci/gitleaks.toml --redact --no-banner --log-opts="origin/main..HEAD"
    else
      gitleaks_cmd detect --config .plokr-ci/gitleaks.toml --redact --no-banner
    fi
  fi
}

semgrep_lang() {
  if [[ -f go.mod ]]; then echo golang; else echo typescript; fi
}

cmd_semgrep() {
  local lang args
  lang="$(semgrep_lang)"
  args=(scan --metrics=off --error --severity ERROR --quiet
        --config p/owasp-top-ten --config p/secrets --config "p/${lang}"
        --config .plokr-ci/semgrep --exclude .plokr-ci/semgrep)
  if command -v semgrep >/dev/null 2>&1; then
    semgrep "${args[@]}" .
  elif command -v docker >/dev/null 2>&1 && docker info >/dev/null 2>&1; then
    local src
    src="$(pwd -W 2>/dev/null || pwd)"
    MSYS_NO_PATHCONV=1 docker run --rm -v "${src}:/src" -w /src "$SEMGREP_IMAGE" semgrep "${args[@]}" /src
  else
    warn "=================================================================="
    warn " WARNING: semgrep SAST was NOT run (neither semgrep nor a running"
    warn " docker daemon was found). CI will still run it on this push."
    warn " Install: pipx install semgrep   (or start Docker/Rancher Desktop)"
    warn "=================================================================="
  fi
}

cmd_gofmt() {
  (( $# == 0 )) && return 0
  local unformatted
  unformatted="$(gofmt -l "$@")"
  if [[ -n "$unformatted" ]]; then
    red "gofmt: these files need formatting (run: gofmt -w <file>):"
    sed 's/^/  /' <<<"$unformatted" >&2
    return 1
  fi
}

cmd_golangci() {
  if ! command -v golangci-lint >/dev/null 2>&1; then
    warn "golangci-lint not installed; skipping pre-commit lint (CI enforces it)."
    warn "Install: https://golangci-lint.run/welcome/install/"
    return 0
  fi
  local major
  major="$(golangci-lint version 2>/dev/null | sed -n 's/.*version v\{0,1\}\([0-9]\+\)\..*/\1/p' | head -1)"
  if [[ "${major:-1}" -ge 2 ]]; then
    golangci-lint run --new-from-rev=HEAD --fast-only
  else
    golangci-lint run --new-from-rev=HEAD --fast
  fi
}

cmd_govulncheck() {
  if command -v govulncheck >/dev/null 2>&1; then
    govulncheck ./...
  else
    go run "golang.org/x/vuln/cmd/govulncheck@${GOVULNCHECK_VERSION}" ./...
  fi
}

cmd_eslint() {
  (( $# == 0 )) && return 0
  if ! ls eslint.config.* .eslintrc* >/dev/null 2>&1; then
    warn "No ESLint config in this repo; skipping (CI FAILS until one is added)."
    return 0
  fi
  npx --no-install eslint "$@"  # errors block; warnings match CI (eslint . passes with warnings)
}

cmd_npm_audit() {
  bash .plokr-ci/ci/npm-audit.sh --level high
}

sub="${1:-}"; shift || true
case "$sub" in
  commit-msg)      cmd_commit_msg "$@" ;;
  gitleaks-staged) cmd_gitleaks_staged ;;
  gitleaks-push)   cmd_gitleaks_push ;;
  semgrep)         cmd_semgrep ;;
  gofmt)           cmd_gofmt "$@" ;;
  golangci)        cmd_golangci ;;
  govulncheck)     cmd_govulncheck ;;
  eslint)          cmd_eslint "$@" ;;
  npm-audit)       cmd_npm_audit ;;
  *) echo "usage: $0 <commit-msg|gitleaks-staged|gitleaks-push|semgrep|gofmt|golangci|govulncheck|eslint|npm-audit>" >&2; exit 2 ;;
esac

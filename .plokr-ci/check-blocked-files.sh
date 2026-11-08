#!/usr/bin/env bash
# Vendored by plokr-ci. DO NOT EDIT here; edit plokr-ci and re-sync (check-drift.sh enforces this).
#
# Fail if files that must never be committed are staged (--staged, used by the
# pre-commit hook) or tracked (--tracked, the default, used by CI):
#   .env* (except .env.example / .env.*.example), *.key, *.p12, *.pfx, id_rsa*
#   (and other SSH private key names), *.pem (unless listed in
#   .plokr-ci/allowed-pem.txt), *.log, *.exe, *.dll, and any file > 1 MiB
#   (unless listed in .plokr-ci/allowed-large.txt).
# Allow-list files hold one exact repo-relative path per line; '#' starts a comment.
# Sizes come from the git index in ONE `git ls-files --format` call (git >= 2.38).
# Works in Git Bash on Windows and on Linux (bash >= 4).
set -euo pipefail

mode="tracked"
case "${1:-}" in
  --staged) mode="staged" ;;
  --tracked|"") mode="tracked" ;;
  *) echo "usage: $0 [--staged|--tracked]" >&2; exit 2 ;;
esac

readonly MAX_BYTES=1048576
root="$(git rev-parse --show-toplevel)"
cd "$root"

load_allowlist() {
  local file="$1"
  [[ -f "$file" ]] || return 0
  # Strip comments, CRs and surrounding whitespace; skip blank lines.
  sed -e 's/#.*$//' -e 's/\r$//' -e 's/^[[:space:]]*//' -e 's/[[:space:]]*$//' "$file" | grep -v '^$' || true
}

declare -A allowed_pem=() allowed_large=() size_of=() wanted=()
while IFS= read -r p; do allowed_pem["$p"]=1; done < <(load_allowlist .plokr-ci/allowed-pem.txt)
while IFS= read -r p; do allowed_large["$p"]=1; done < <(load_allowlist .plokr-ci/allowed-large.txt)

# Index blob sizes for every path (the index holds the staged content).
while IFS= read -r -d '' entry; do
  size_of["${entry#* }"]="${entry%% *}"
done < <(git ls-files -z --format='%(objectsize) %(path)')

if [[ "$mode" == "staged" ]]; then
  while IFS= read -r -d '' p; do wanted["$p"]=1; done < <(git diff --cached --name-only --diff-filter=ACMR -z)
else
  for p in "${!size_of[@]}"; do wanted["$p"]=1; done
fi

violations=0
report() {
  echo "BLOCKED: $1 -- $2" >&2
  violations=$((violations + 1))
}

for path in "${!wanted[@]}"; do
  base="${path##*/}"
  lower="${base,,}"
  case "$lower" in
    .env.example|.env.*.example) ;;
    .env|.env.*|.envrc) report "$path" "environment file (only .env.example may be committed)" ;;
    *.key) report "$path" "private key material (*.key)" ;;
    *.p12|*.pfx) report "$path" "PKCS#12 keystore" ;;
    id_rsa*|id_dsa*|id_ecdsa*|id_ed25519*) report "$path" "SSH key" ;;
    *.pem)
      [[ -n "${allowed_pem[$path]:-}" ]] || report "$path" "*.pem not listed in .plokr-ci/allowed-pem.txt" ;;
    *.log) report "$path" "log file" ;;
    *.exe|*.dll) report "$path" "Windows binary" ;;
  esac
  size="${size_of[$path]:-0}"
  if [[ "$size" =~ ^[0-9]+$ ]] && (( size > MAX_BYTES )) && [[ -z "${allowed_large[$path]:-}" ]]; then
    report "$path" "file is ${size} bytes (> 1 MiB) and not listed in .plokr-ci/allowed-large.txt"
  fi
done

if (( violations > 0 )); then
  echo "check-blocked-files: ${violations} blocked file(s) (${mode}). Remove them (git rm --cached <file>) or, for a" >&2
  echo "reviewed public .pem / large asset, add the exact path to .plokr-ci/allowed-pem.txt / allowed-large.txt." >&2
  exit 1
fi
echo "check-blocked-files: OK (${mode}, ${#wanted[@]} file(s) checked)"

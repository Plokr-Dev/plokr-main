#!/usr/bin/env bash
# Vendored by plokr-ci. DO NOT EDIT here; edit plokr-ci and re-sync.
# Semgrep CE SAST in the digest-pinned official image.
# Configs: p/owasp-top-ten, p/secrets, p/<lang>, and local rules in .plokr-ci/semgrep.
# Every finding is reported; the job FAILS on any ERROR-severity finding
# (the equivalent of `--error` scoped to ERROR) or on any scanner/rule error,
# because a broken scanner must never look like a pass.
#   usage: semgrep.sh <lang>     e.g. golang | typescript
set -euo pipefail
# shellcheck source=lib.sh
source "$(dirname "$0")/lib.sh"

lang="${1:?language pack required, e.g. golang or typescript}"
[[ "$lang" =~ ^[a-z0-9-]+$ ]] || { echo "invalid language pack name: $lang" >&2; exit 2; }
image="${SEMGREP_IMAGE:?SEMGREP_IMAGE must be set to a digest-pinned image}"
[[ "$image" == *@sha256:* ]] || { echo "SEMGREP_IMAGE must be pinned by digest" >&2; exit 2; }

# Git Bash on Windows: hand docker a Windows path and stop MSYS path mangling.
src="$(pwd -W 2>/dev/null || pwd)"
out="$(cd "$FINDINGS_DIR" && (pwd -W 2>/dev/null || pwd))"
rc=0
MSYS_NO_PATHCONV=1 docker run --rm \
  -v "${src}:/src:ro" -v "${out}:/out" -w /src "$image" \
  semgrep scan --metrics=off --disable-version-check \
    --config p/owasp-top-ten --config p/secrets --config "p/${lang}" \
    --config .plokr-ci/semgrep \
    --exclude .plokr-ci/semgrep --exclude node_modules \
    --json --output /out/semgrep.json . || rc=$?

json="$FINDINGS_DIR/semgrep.json"
if (( rc != 0 )) || [[ ! -s "$json" ]]; then
  summary semgrep FAIL "semgrep exited with ${rc} (scanner/config error). Treating as failure."
  exit 1
fi

jq -r '.results[] | [.extra.severity, "\(.path):\(.start.line)", (.check_id | split(".") | last), (.extra.message | split("\n") | join(" ") | .[0:160])] | @tsv' "$json" \
  | sort > "$FINDINGS_DIR/semgrep.txt"
errors=$(jq '[.results[] | select(.extra.severity == "ERROR")] | length' "$json")
total=$(jq '.results | length' "$json")
rule_errors=$(jq '[.errors[]? | select((.type | tostring) | test("Rule|Config|InvalidRule|MissingPlugin"; "i"))] | length' "$json")

cat "$FINDINGS_DIR/semgrep.txt"
if (( rule_errors > 0 )); then
  jq -r '.errors[]? | .message' "$json" | head -20
  summary semgrep FAIL "${rule_errors} rule/config error(s); fix the rules before trusting this scan."
  exit 1
fi
if (( errors > 0 )); then
  summary semgrep FAIL "${total} finding(s), **${errors} at ERROR severity** (blocking). Columns: severity, location, rule, message." "$(fence "$FINDINGS_DIR/semgrep.txt")"
  exit 1
fi
if (( total > 0 )); then
  summary semgrep WARN "${total} non-blocking finding(s) (WARNING/INFO). Columns: severity, location, rule, message." "$(fence "$FINDINGS_DIR/semgrep.txt")"
else
  summary semgrep PASS "No findings."
fi

#!/usr/bin/env bash
# Vendored by plokr-ci. DO NOT EDIT here; edit plokr-ci and re-sync.
# Secret scan with gitleaks over the commit range relevant to the event.
#   PR:            base..head of the pull request
#   push:          before..after of the push (falls back to the last commit)
#   full history:  every fetched ref (FULL_HISTORY=true; weekly audit)
# Requires a checkout with fetch-depth: 0.
set -euo pipefail
# shellcheck source=lib.sh
source "$(dirname "$0")/lib.sh"

zero="0000000000000000000000000000000000000000"
has_commit() { [[ -n "${1:-}" && "$1" != "$zero" ]] && git cat-file -e "${1}^{commit}" 2>/dev/null; }

if [[ "${FULL_HISTORY:-false}" == "true" ]]; then
  log_opts="--all"; scope="full history (all refs)"
elif [[ "${EVENT_NAME:-}" == "pull_request" ]] && has_commit "${PR_BASE_SHA:-}" && has_commit "${PR_HEAD_SHA:-}"; then
  log_opts="${PR_BASE_SHA}..${PR_HEAD_SHA}"; scope="pull request ${log_opts}"
elif [[ "${EVENT_NAME:-}" == "push" ]] && has_commit "${PUSH_BEFORE:-}"; then
  log_opts="${PUSH_BEFORE}..${HEAD_SHA:-HEAD}"; scope="push ${log_opts}"
elif git rev-parse --verify --quiet HEAD~1 >/dev/null; then
  log_opts="HEAD~1..HEAD"; scope="last commit"
else
  log_opts="HEAD"; scope="initial commit"
fi
echo "gitleaks scope: ${scope}"

report="$FINDINGS_DIR/gitleaks.json"
rc=0
gitleaks git --config .plokr-ci/gitleaks.toml --redact --no-banner \
  --report-format json --report-path "$report" --log-opts="$log_opts" . || rc=$?

count=0
[[ -s "$report" ]] && count=$(jq 'length' "$report")
if (( rc == 0 )); then
  summary gitleaks PASS "Scope: ${scope}. No secrets found."
elif (( rc == 1 )); then
  jq -r '.[] | "- \(.File):\(.StartLine) rule \(.RuleID) commit \(.Commit[0:12])"' "$report" > "$FINDINGS_DIR/gitleaks.txt"
  summary gitleaks FAIL "Scope: ${scope}. **${count} secret(s) found** (values redacted). Rotate every exposed credential, then purge it from history." "$(fence "$FINDINGS_DIR/gitleaks.txt" 100)"
  exit 1
else
  summary gitleaks FAIL "gitleaks exited with ${rc} (scanner error). Treating as failure."
  exit "$rc"
fi

#!/usr/bin/env bash
# Vendored by plokr-ci. DO NOT EDIT here; edit plokr-ci and re-sync.
# hadolint on every tracked Dockerfile*. Every finding is printed. The job fails
# on error-level rules plus these security-relevant rules promoted to error:
#   DL3002 last USER is root        DL3006 image without an explicit tag
#   DL3007 image uses :latest       DL4006 RUN pipes without `set -o pipefail`
# The flags are always passed, so a repo .hadolint.yaml cannot lower them
# (it can still add `ignored:` rules, which show up in the PR diff).
set -euo pipefail
# shellcheck source=lib.sh
source "$(dirname "$0")/lib.sh"

files=()
while IFS= read -r -d '' f; do files+=("$f"); done < <(
  git ls-files -z -- 'Dockerfile' 'Dockerfile.*' '*/Dockerfile' '*/Dockerfile.*' '*.Dockerfile' ':!:**/node_modules/**')

if (( ${#files[@]} == 0 )); then
  summary hadolint SKIP "No Dockerfiles tracked."
  exit 0
fi

out="$FINDINGS_DIR/hadolint.txt"
rc=0
hadolint --no-color --failure-threshold error \
  --error DL3002 --error DL3006 --error DL3007 --error DL4006 \
  "${files[@]}" > "$out" 2>&1 || rc=$?
cat "$out"
if (( rc == 0 )); then
  if [[ -s "$out" ]]; then
    summary hadolint PASS "Checked: ${files[*]}. Non-blocking findings:" "$(fence "$out" 100)"
  else
    summary hadolint PASS "Checked: ${files[*]}. No findings."
  fi
else
  summary hadolint FAIL "Checked: ${files[*]}" "$(fence "$out" 150)"
  exit 1
fi

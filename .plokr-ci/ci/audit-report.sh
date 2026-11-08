#!/usr/bin/env bash
# Vendored by plokr-ci. DO NOT EDIT here; edit plokr-ci and re-sync.
# Aggregate a Markdown audit report from job results + downloaded findings.
#   audit-report.sh <findings-dir> <report-file>
# Env: NEEDS_JSON (toJSON(needs)), RUN_URL, PLOKR_CI_VERSION.
# Prints "failed=true|false" to $GITHUB_OUTPUT.
set -euo pipefail

dir="${1:?findings dir}"
report="${2:?report file}"
needs="${NEEDS_JSON:-}"
[[ -n "$needs" ]] || needs="{}"

failed=$(jq -r '[to_entries[] | select(.value.result == "failure" or .value.result == "cancelled")] | length > 0' <<<"$needs")

{
  echo "# Weekly security audit"
  echo
  echo "Run: ${RUN_URL:-n/a}  "
  echo "Commit: ${GITHUB_SHA:-n/a}  "
  echo "plokr-ci: ${PLOKR_CI_VERSION:-unknown}"
  echo
  echo "| Job | Result |"
  echo "| --- | --- |"
  jq -r 'to_entries[] | "| \(.key) | \(.value.result) |"' <<<"$needs"
  echo
  if [[ "$failed" == "true" ]]; then
    echo "**At least one job failed.** Details per tool below; full reports are in the run artifacts."
  else
    echo "All jobs passed."
  fi
  echo
  if [[ -d "$dir" ]]; then
    find "$dir" -type f -name '*.md' | sort | while IFS= read -r f; do
      cat "$f"
      echo
    done
  fi
} > "$report"

cat "$report" >> "${GITHUB_STEP_SUMMARY:-/dev/null}"
echo "failed=${failed}"
if [[ -n "${GITHUB_OUTPUT:-}" ]]; then echo "failed=${failed}" >> "$GITHUB_OUTPUT"; fi

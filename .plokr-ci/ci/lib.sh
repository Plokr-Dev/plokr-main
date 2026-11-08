#!/usr/bin/env bash
# Vendored by plokr-ci. DO NOT EDIT here; edit plokr-ci and re-sync.
# Shared helpers for the .plokr-ci/ci/*.sh scripts (sourced, not executed).

FINDINGS_DIR="${FINDINGS_DIR:-${RUNNER_TEMP:-/tmp}/findings}"
mkdir -p "$FINDINGS_DIR"

# summary <tool> <PASS|FAIL|WARN|SKIP> <markdown lines...>
# Appends a section to the job summary AND to $FINDINGS_DIR/<tool>.md so the
# weekly report can aggregate it from the uploaded artifacts.
summary() {
  local tool="$1" status="$2"; shift 2
  local label="$status"
  [[ "$status" == "FAIL" ]] && label="**FAIL**"
  {
    echo "### ${tool}: ${label}"
    echo
    printf '%s\n' "$@"
    echo
  } | tee -a "${GITHUB_STEP_SUMMARY:-/dev/null}" >> "$FINDINGS_DIR/${tool}.md"
}

# fence <file> [max-lines]: print a file inside a markdown code fence, truncated.
fence() {
  local file="$1" max="${2:-200}" n=0
  echo '```'
  if [[ -s "$file" ]]; then head -n "$max" "$file"; else echo "(empty)"; fi
  [[ -f "$file" ]] && n=$(wc -l < "$file" | tr -d ' ')
  if (( n > max )); then
    echo "... truncated (${n} lines total; full output is in the findings artifact)"
  fi
  echo '```'
}

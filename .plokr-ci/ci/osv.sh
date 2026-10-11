#!/usr/bin/env bash
# Vendored by plokr-ci. DO NOT EDIT here; edit plokr-ci and re-sync.
# OSV-Scanner over every lockfile in the repo. Fails on any vulnerability whose
# max CVSS severity is >= 7.0 (High/Critical). Accepted risks go in the
# repo-owned osv-scanner.toml ([[IgnoredVulns]] with reason + ignoreUntil).
set -euo pipefail
# shellcheck source=lib.sh
source "$(dirname "$0")/lib.sh"

json="$FINDINGS_DIR/osv.json"
args=(scan source --recursive --format json --output-file "$json")
if [[ -f osv-scanner.toml ]]; then args+=(--config osv-scanner.toml); fi

rc=0
osv-scanner "${args[@]}" . || rc=$?
case "$rc" in
  0|1) ;;
  128) summary osv-scanner PASS "No lockfiles/packages found to scan."; exit 0 ;;
  *) summary osv-scanner FAIL "osv-scanner exited with ${rc} (scanner error). Treating as failure."; exit 1 ;;
esac
[[ -s "$json" ]] || { summary osv-scanner FAIL "osv-scanner produced no report."; exit 1; }

tab="$(printf '\t')"
jq -r '.results[]? as $r | $r.packages[]? as $p | $p.groups[]? |
  [ (.max_severity // ""), ($p.package.ecosystem // ""), ($p.package.name // ""),
    ($p.package.version // ""), (.ids | join(",")), ($r.source.path // "" | sub("^.*/"; "")) ] | @tsv' "$json" \
  | sort -t "$tab" -k1,1gr > "$FINDINGS_DIR/osv.txt"

high=$(awk -F '\t' '$1 != "" && $1 + 0 >= 7.0' "$FINDINGS_DIR/osv.txt" | wc -l | tr -d ' ')
unknown=$(awk -F '\t' '$1 == ""' "$FINDINGS_DIR/osv.txt" | wc -l | tr -d ' ')
total=$(wc -l < "$FINDINGS_DIR/osv.txt" | tr -d ' ')
cat "$FINDINGS_DIR/osv.txt"

if (( high > 0 )); then
  summary osv-scanner FAIL "${total} vulnerable package group(s); **${high} High/Critical (CVSS >= 7.0)**. Columns: severity, ecosystem, package, version, ids, lockfile." "$(fence "$FINDINGS_DIR/osv.txt")"
  exit 1
fi
if (( total > 0 )); then
  summary osv-scanner WARN "${total} lower-severity finding(s); ${unknown} have no CVSS score (Go advisories often lack one; govulncheck gates those)." "$(fence "$FINDINGS_DIR/osv.txt")"
else
  summary osv-scanner PASS "No known vulnerabilities."
fi

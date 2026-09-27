#!/usr/bin/env bash
# Vendored by plokr-ci. DO NOT EDIT here; edit plokr-ci and re-sync.
# Maintain ONE open issue titled "Weekly security audit" with the GitHub CLI.
#   audit-issue.sh upsert  <body-file>   create it, or replace its body + comment
#   audit-issue.sh comment <body-file>   comment on it (create it if missing)
#   audit-issue.sh resolve               comment "all clear" and close it, if open
# Env: GH_TOKEN (issues: write), GH_REPO (owner/repo), RUN_URL.
set -euo pipefail

readonly TITLE="Weekly security audit"
readonly MAX_BODY=60000
: "${GH_TOKEN:?}" "${GH_REPO:?}"
run_url="${RUN_URL:-}"

find_issue() {
  gh issue list --state open --limit 50 --search "\"${TITLE}\" in:title" --json number,title \
    --jq "map(select(.title == \"${TITLE}\")) | sort_by(.number) | .[0].number // empty"
}

clip() {
  local src="$1" dst
  dst="$(mktemp)"
  head -c "$MAX_BODY" "$src" > "$dst"
  if (( $(wc -c < "$src") > MAX_BODY )); then
    printf '\n\n_Truncated; the full report is in the run artifacts: %s_\n' "$run_url" >> "$dst"
  fi
  echo "$dst"
}

action="${1:?upsert|comment|resolve}"
number="$(find_issue)"
case "$action" in
  upsert)
    body="$(clip "${2:?body file required}")"
    if [[ -n "$number" ]]; then
      gh issue edit "$number" --body-file "$body" >/dev/null
      gh issue comment "$number" --body "Audit still failing; report refreshed by ${run_url}" >/dev/null
      echo "updated issue #${number}"
    else
      gh issue create --title "$TITLE" --body-file "$body"
    fi ;;
  comment)
    body="$(clip "${2:?body file required}")"
    if [[ -n "$number" ]]; then
      gh issue comment "$number" --body-file "$body" >/dev/null
      echo "commented on issue #${number}"
    else
      gh issue create --title "$TITLE" --body-file "$body"
    fi ;;
  resolve)
    if [[ -n "$number" ]]; then
      gh issue comment "$number" --body "All weekly security audit jobs passed in ${run_url}. Closing." >/dev/null
      gh issue close "$number" >/dev/null
      echo "closed issue #${number}"
    else
      echo "no open audit issue; nothing to resolve"
    fi ;;
  *) echo "usage: $0 upsert <file> | comment <file> | resolve" >&2; exit 2 ;;
esac

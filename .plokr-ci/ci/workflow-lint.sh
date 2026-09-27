#!/usr/bin/env bash
# Vendored by plokr-ci. DO NOT EDIT here; edit plokr-ci and re-sync.
# actionlint (with shellcheck) + zizmor over .github/workflows and dependabot.yml.
# zizmor runs from its digest-pinned image; GH_TOKEN (read-only) enables the
# online audits (impostor commits, ref confusion, known-vulnerable actions).
set -euo pipefail
# shellcheck source=lib.sh
source "$(dirname "$0")/lib.sh"

image="${ZIZMOR_IMAGE:?ZIZMOR_IMAGE must be set to a digest-pinned image}"
[[ "$image" == *@sha256:* ]] || { echo "ZIZMOR_IMAGE must be pinned by digest" >&2; exit 2; }
status=0

out="$FINDINGS_DIR/actionlint.txt"
rc=0
actionlint -no-color > "$out" 2>&1 || rc=$?
cat "$out"
if (( rc == 0 )); then
  summary actionlint PASS "No problems in .github/workflows."
else
  summary actionlint FAIL "$(fence "$out" 150)"; status=1
fi

out="$FINDINGS_DIR/zizmor.txt"
rc=0
src="$(pwd -W 2>/dev/null || pwd)"
MSYS_NO_PATHCONV=1 docker run --rm -e GH_TOKEN -v "${src}:/src:ro" -w /src "$image" \
  --format plain --no-progress --color never .github > "$out" 2>&1 || rc=$?
cat "$out"
if (( rc == 0 )); then
  summary zizmor PASS "No findings."
else
  summary zizmor FAIL "zizmor exit ${rc}. Fix the finding or add an inline '# zizmor: ignore[<audit>]' with a reason (in plokr-ci)." "$(fence "$out" 150)"
  status=1
fi
exit "$status"

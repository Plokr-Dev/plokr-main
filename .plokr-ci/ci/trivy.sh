#!/usr/bin/env bash
# Vendored by plokr-ci. DO NOT EDIT here; edit plokr-ci and re-sync.
# Trivy, HIGH+CRITICAL only, unfixed ignored, exit 1 on findings. Honors the
# repo-owned .trivyignore (trivy reads it from the working directory).
#   trivy.sh fs            filesystem: vuln + misconfig + secret
#   trivy.sh image <ref>   a locally built image: vuln + secret
set -euo pipefail
# shellcheck source=lib.sh
source "$(dirname "$0")/lib.sh"

mode="${1:?fs|image}"
common=(--severity "HIGH,CRITICAL" --ignore-unfixed --exit-code 1 --no-progress --format table)
case "$mode" in
  fs)
    tool="trivy-fs"
    cmd=(trivy fs "${common[@]}" --scanners "vuln,misconfig,secret"
         --skip-dirs node_modules --skip-dirs .plokr-ci/semgrep .) ;;
  image)
    ref="${2:?image reference required}"
    tool="trivy-image"
    cmd=(trivy image "${common[@]}" --scanners "vuln,secret" "$ref") ;;
  *) echo "usage: $0 fs | image <ref>" >&2; exit 2 ;;
esac

out="$FINDINGS_DIR/${tool}.txt"
rc=0
"${cmd[@]}" > "$out" 2>&1 || rc=$?
cat "$out"
if (( rc == 0 )); then
  summary "$tool" PASS "No fixable HIGH/CRITICAL findings."
elif (( rc == 1 )); then
  summary "$tool" FAIL "Fixable HIGH/CRITICAL findings: fix them, or accept one with a dated reason in .trivyignore." "$(fence "$out" 250)"
  exit 1
else
  summary "$tool" FAIL "trivy exited with ${rc} (scanner error). Treating as failure." "$(fence "$out" 50)"
  exit 1
fi

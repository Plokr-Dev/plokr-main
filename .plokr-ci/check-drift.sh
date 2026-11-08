#!/usr/bin/env bash
# Vendored by plokr-ci. DO NOT EDIT here; edit plokr-ci and re-sync (check-drift.sh enforces this).
#
# Verify every file vendored by plokr-ci/sync.sh still matches the SHA-256
# recorded in .plokr-ci/MANIFEST, so a repo cannot quietly weaken its own gates
# (e.g. by adding `|| true` to a scan or deleting a job). A missing vendored
# file is also a failure. Hashes are computed over the content with CR bytes
# stripped, so Windows autocrlf checkouts hash identically to Linux.
#
# To change a gate: edit plokr-ci, then re-run `plokr-ci/sync.sh <repo> <profile>`.
# Repo-owned tuning files (osv-scanner.toml, .trivyignore, .plokr-ci/allowed-*.txt,
# .plokr-ci/zap/rules.tsv, .golangci.yml) are intentionally NOT in the manifest;
# changes to them are reviewed in the PR diff instead.
set -euo pipefail

root="$(git rev-parse --show-toplevel 2>/dev/null || pwd)"
cd "$root"
manifest=".plokr-ci/MANIFEST"

if [[ ! -f "$manifest" ]]; then
  echo "check-drift: $manifest is missing; re-run plokr-ci/sync.sh" >&2
  exit 1
fi

hash_file() { tr -d '\r' < "$1" | sha256sum | cut -d' ' -f1; }

failures=0 checked=0
while IFS= read -r line || [[ -n "$line" ]]; do
  line="${line%$'\r'}"
  [[ -z "$line" || "$line" == \#* ]] && continue
  expected="${line%%  *}"
  path="${line#*  }"
  if [[ ! "$expected" =~ ^[0-9a-f]{64}$ || -z "$path" || "$path" == "$line" ]]; then
    echo "check-drift: malformed manifest line: $line" >&2
    failures=$((failures + 1)); continue
  fi
  checked=$((checked + 1))
  if [[ ! -f "$path" ]]; then
    echo "DRIFT: vendored file deleted: $path" >&2
    failures=$((failures + 1)); continue
  fi
  actual="$(hash_file "$path")"
  if [[ "$actual" != "$expected" ]]; then
    echo "DRIFT: vendored file modified in-repo: $path" >&2
    failures=$((failures + 1))
  fi
done < "$manifest"

if (( checked == 0 )); then
  echo "check-drift: manifest lists no files; refusing to pass an empty manifest" >&2
  exit 1
fi
if (( failures > 0 )); then
  echo "check-drift: ${failures} problem(s). Vendored CI files must only change via plokr-ci/sync.sh." >&2
  exit 1
fi
echo "check-drift: OK (${checked} vendored files match plokr-ci $(tr -d '\r\n' < .plokr-ci/VERSION 2>/dev/null || echo unknown))"

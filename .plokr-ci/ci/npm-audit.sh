#!/usr/bin/env bash
# Vendored by plokr-ci. DO NOT EDIT here; edit plokr-ci and re-sync.
# npm audit gate that honours the repo-owned osv-scanner.toml exceptions.
#   usage: .plokr-ci/ci/npm-audit.sh [--all] [--level high|critical]
#     --all     include devDependencies (default: runtime deps only, --omit=dev)
#     --level   minimum blocking severity (default: high)
# An advisory is waived ONLY if its GHSA id is listed in osv-scanner.toml as an
# [[IgnoredVulns]] entry whose ignoreUntil is today or later. Expired or
# undated waivers do not count, so the gate re-fails automatically on expiry.
set -euo pipefail

omit="--omit=dev"; level="high"
while (( $# )); do
  case "$1" in
    --all) omit="" ;;
    --level) level="$2"; shift ;;
    *) echo "npm-audit.sh: unknown argument $1" >&2; exit 2 ;;
  esac
  shift
done

report="$(mktemp)"
# npm audit exits non-zero whenever it finds anything; the verdict is computed below.
# shellcheck disable=SC2086
npm audit $omit --json > "$report" 2>/dev/null || true

LEVEL="$level" REPORT="$report" node - <<'JS'
const fs = require('fs');
const rank = { info: 0, low: 1, moderate: 2, high: 3, critical: 4 };
const min = rank[process.env.LEVEL];
if (min === undefined) { console.error(`npm-audit.sh: bad --level ${process.env.LEVEL}`); process.exit(2); }

let audit;
try { audit = JSON.parse(fs.readFileSync(process.env.REPORT, 'utf8')); }
catch { console.error('npm-audit.sh: npm audit produced no JSON (registry/network error). Failing closed.'); process.exit(1); }
if (audit.error) { console.error(`npm-audit.sh: npm audit error: ${JSON.stringify(audit.error)}. Failing closed.`); process.exit(1); }

// Active waivers from osv-scanner.toml: blocks of id = "..." + ignoreUntil = <date>.
const today = new Date().toISOString().slice(0, 10);
const waived = new Map();
if (fs.existsSync('osv-scanner.toml')) {
  const blocks = fs.readFileSync('osv-scanner.toml', 'utf8').split(/^\s*\[\[IgnoredVulns\]\]\s*$/m).slice(1);
  for (const b of blocks) {
    const id = (b.match(/^\s*id\s*=\s*["']([^"']+)["']/m) || [])[1];
    const until = (b.match(/^\s*ignoreUntil\s*=\s*["']?(\d{4}-\d{2}-\d{2})/m) || [])[1];
    if (!id) continue;
    if (!until) { console.log(`waiver ${id} has no ignoreUntil: NOT honoured`); continue; }
    if (until < today) { console.log(`waiver ${id} expired ${until}: NOT honoured`); continue; }
    waived.set(id, until);
  }
}

// Collect blocking advisories (npm v7+ report format) keyed by GHSA id.
const blocking = new Map();
for (const [pkg, v] of Object.entries(audit.vulnerabilities || {})) {
  for (const via of v.via || []) {
    if (typeof via !== 'object') continue; // transitive pointer; the root advisory is listed on its own package
    if ((rank[via.severity] ?? 0) < min) continue;
    const ghsa = (String(via.url || '').match(/GHSA-[\w-]+/) || [String(via.source)])[0];
    if (!blocking.has(ghsa)) blocking.set(ghsa, { pkg, severity: via.severity, title: via.title });
  }
}

let fail = 0;
for (const [id, a] of blocking) {
  if (waived.has(id)) { console.log(`waived  ${a.severity.padEnd(8)} ${id} ${a.pkg} (until ${waived.get(id)})`); continue; }
  console.log(`BLOCK   ${a.severity.padEnd(8)} ${id} ${a.pkg}: ${a.title}`);
  fail++;
}
console.log(`npm-audit: ${blocking.size} advisory(ies) at >= ${process.env.LEVEL}, ${fail} blocking, ${blocking.size - fail} waived`);
process.exit(fail ? 1 : 0);
JS

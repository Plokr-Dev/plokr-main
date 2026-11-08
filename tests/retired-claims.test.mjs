// Regression guard: claims the product cannot support must not reappear in the built site.
// Scans every dist/ HTML page (markup, meta tags and JSON-LD included). Run `npm run build` first.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { DIST, listFiles, rel } from './_security-lib.mjs';

assert.ok(existsSync(DIST), 'dist/ not found: run `npm run build` before `npm test`');

const pages = listFiles(DIST)
  .filter((f) => f.endsWith('.html'))
  .map((f) => ({ file: rel(f), html: readFileSync(f, 'utf8') }));

const RETIRED = [
  ['SOC 2 certification', /SOC.?2/i],
  ['Type II', /Type II/i],
  ['200+ teams', /200\+\s*teams/i],
  ['14k repos', /14k/i],
  ['1.2M issues', /1\.2M/i],
  ['99.95% uptime', /99\.95/],
  ['GraphQL API', /GraphQL/i],
  ['SDKs', /SDKs?\s+for/i],
  ['Okta', /Okta/i],
  ['CloudTrail', /CloudTrail/i],
  ['Zuora', /Zuora/i],
  ['Snowflake', /Snowflake/i],
  ['Revenue Leakage', /Leakage/i],
  ['SAML', /SAML/i],
  ['SCIM', /SCIM/i],
  ['burndown', /burndown/i],
  ['read-only claim', /read.?only/i],
  ['two-way sync', /two[\s-]way[\s-]sync/i],
  ['tracked work', /tracked work/i],
  ['former legal entity', /Plokr,\s*Inc/i],
  ['former street address', /548 Market/i],
  ['San Francisco address', /San Francisco/i],
  ['removed /jira-monitoring route', /jira-monitoring/i],
  ['free tier', /free[\s-](tier|forever)/i],
  ['zero-price JSON-LD offer', /"price"\s*:\s*"?0"?\s*[,}]/],
];

for (const [label, pattern] of RETIRED) {
  test(`no built page contains retired claim: ${label}`, () => {
    const hits = pages.filter(({ html }) => pattern.test(html)).map(({ file }) => file);
    assert.deepEqual(hits, [], `${label} found in: ${hits.join(', ')}`);
  });
}

test('no page advertises a free plan (the pricing FAQ may only deny one)', () => {
  const offenders = [];
  for (const { file, html } of pages) {
    const stripped = html.replace(/Is there a free plan\?/gi, '');
    if (/free plan/i.test(stripped)) offenders.push(file);
  }
  assert.deepEqual(offenders, []);
  const pricing = pages.find((p) => p.file.endsWith('pricing/index.html'));
  assert.ok(pricing, 'pricing page missing');
  assert.match(pricing.html, /Is there a free plan\?[\s\S]{0,400}?No\./);
});

test('legal pages name Plokr Sdn. Bhd. with its registration number', () => {
  for (const name of ['terms', 'privacy', 'dpa']) {
    const page = pages.find((p) => p.file.endsWith(`${name}/index.html`));
    assert.ok(page, `${name} page missing`);
    assert.match(page.html, /Plokr Sdn\. Bhd\./, `${name} must name Plokr Sdn. Bhd.`);
  }
  for (const name of ['terms', 'dpa']) {
    const page = pages.find((p) => p.file.endsWith(`${name}/index.html`));
    assert.match(page.html, /202601028423/, `${name} must carry the registration number`);
  }
});

test('terms give the Kuala Lumpur registered office', () => {
  const terms = pages.find((p) => p.file.endsWith('terms/index.html'));
  assert.match(terms.html, /Kuala Lumpur/);
});

test('the /integrate page is still built', () => {
  assert.ok(pages.some((p) => p.file.endsWith('integrate/index.html')));
});

// Pricing copy and plan constants. Run `npm run build` first for the dist checks.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { ROOT, DIST, listFiles } from './_security-lib.mjs';

assert.ok(existsSync(DIST), 'dist/ not found: run `npm run build` before `npm test`');

const constants = readFileSync(join(ROOT, 'src', 'lib', 'constants.ts'), 'utf8');
const htmlFiles = listFiles(DIST).filter((f) => f.endsWith('.html'));
const read = (...parts) => readFileSync(join(DIST, ...parts), 'utf8');

test('constants define exactly the individual and team plans', () => {
  const ids = [...constants.matchAll(/^\s+id: '([a-z]+)',/gm)].map((m) => m[1]);
  assert.deepEqual(ids, ['individual', 'team']);
  assert.match(constants, /monthlyCents: 2900,\s*annualCents: 29000,\s*creditsPerSeat: 1500,\s*seats: '1 seat'/);
  assert.match(constants, /monthlyCents: 7900,\s*annualCents: 79000,\s*creditsPerSeat: 4000,\s*seats: 'Minimum 3 seats'/);
});

test('constants define the 7-day card-required trial and CTA', () => {
  assert.match(constants, /TRIAL = \{ days: 7, cardRequired: true \}/);
  assert.match(constants, /CTA_CORE = 'Start 7-day free trial'/);
});

test('no built page mentions a 14-day trial, SAVE 20% or free forever', () => {
  for (const f of htmlFiles) {
    const html = readFileSync(f, 'utf8');
    assert.doesNotMatch(html, /14-day/i, f);
    assert.doesNotMatch(html, /SAVE 20%/, f);
    assert.doesNotMatch(html, /free forever/i, f);
  }
});

test('pricing page shows two plans with the 7-day trial copy', () => {
  const html = read('pricing', 'index.html');
  assert.doesNotMatch(html, /\bBasic\b/);
  assert.doesNotMatch(html, /\bProfessional\b/);
  assert.ok(html.includes('Start 7-day free trial'));
  assert.ok(html.includes('2 months free'));
  assert.ok(html.includes('7-day'));
});

test('integrate JSON-LD offer price is 29', () => {
  assert.match(read('integrate', 'index.html'), /"price":\s*"29"/);
});

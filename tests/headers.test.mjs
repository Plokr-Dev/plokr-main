// Asserts the canonical security headers (public/_headers) and that every
// mirror (vercel.json, nginx snippet) carries exactly the same /* headers.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { ROOT, readCanonicalHeaders, parseCsp } from './_security-lib.mjs';

// Origins (beyond 'self') this site may submit forms to.
const ALLOWED_FORM_ACTION_ORIGINS = ['https://formspree.io'];

const { global: headers } = readCanonicalHeaders();
const csp = parseCsp(headers.get('content-security-policy') ?? '');

const EXACT = {
  'strict-transport-security': 'max-age=63072000; includeSubDomains; preload',
  'x-content-type-options': 'nosniff',
  'referrer-policy': 'strict-origin-when-cross-origin',
  'cross-origin-opener-policy': 'same-origin',
  'x-frame-options': 'DENY',
};

for (const [name, value] of Object.entries(EXACT)) {
  test(`_headers /* sets ${name}: ${value}`, () => {
    assert.equal(headers.get(name), value);
  });
}

test('Permissions-Policy disables camera, microphone and geolocation', () => {
  const pp = headers.get('permissions-policy') ?? '';
  for (const feature of ['camera=()', 'microphone=()', 'geolocation=()']) {
    assert.ok(pp.split(/,\s*/).includes(feature), `missing ${feature} in "${pp}"`);
  }
});

test('CSP is present with the required locked-down directives', () => {
  assert.ok(headers.has('content-security-policy'), 'Content-Security-Policy missing');
  assert.deepEqual(csp.get('default-src'), ["'self'"]);
  assert.deepEqual(csp.get('object-src'), ["'none'"]);
  assert.deepEqual(csp.get('base-uri'), ["'self'"]);
  assert.deepEqual(csp.get('frame-ancestors'), ["'none'"]);
  for (const d of ['script-src', 'style-src', 'img-src', 'font-src', 'connect-src', 'frame-src']) {
    assert.ok(csp.has(d), `CSP must set ${d} explicitly`);
  }
});

test("CSP form-action is 'self' plus only the allowed form origins", () => {
  const formAction = csp.get('form-action') ?? [];
  assert.equal(formAction[0], "'self'");
  for (const src of formAction.slice(1)) {
    assert.ok(ALLOWED_FORM_ACTION_ORIGINS.includes(src), `unexpected form-action source ${src}`);
  }
});

test("CSP never allows 'unsafe-eval' (or wasm/unsafe-hashes escapes) anywhere", () => {
  for (const [directive, sources] of csp) {
    for (const bad of ["'unsafe-eval'", "'wasm-unsafe-eval'", "'unsafe-hashes'"]) {
      assert.ok(!sources.includes(bad), `${directive} contains ${bad}`);
    }
  }
});

test("script-src has no 'unsafe-inline', wildcards or bare schemes", () => {
  const script = csp.get('script-src') ?? [];
  assert.ok(!script.includes("'unsafe-inline'"), "script-src must not contain 'unsafe-inline'");
  for (const src of script) {
    assert.ok(!src.includes('*'), `wildcard source in script-src: ${src}`);
    assert.ok(!/^[a-z][a-z0-9+.-]*:$/i.test(src), `bare scheme source in script-src: ${src}`);
  }
});

test('connect-src has no wildcards or bare schemes', () => {
  for (const src of csp.get('connect-src') ?? []) {
    assert.ok(!src.includes('*'), `wildcard source in connect-src: ${src}`);
    assert.ok(!/^[a-z][a-z0-9+.-]*:$/i.test(src), `bare scheme source in connect-src: ${src}`);
  }
});

test('no CSP directive allows plain http: sources', () => {
  for (const [directive, sources] of csp) {
    for (const src of sources) {
      assert.ok(!/^http:/i.test(src) && src.toLowerCase() !== 'http:', `${directive} allows insecure ${src}`);
      assert.ok(!src.includes('*'), `${directive} contains wildcard ${src}`);
    }
  }
});

test('vercel.json (if kept) mirrors public/_headers exactly', { skip: !existsSync(join(ROOT, 'vercel.json')) }, () => {
  const vercel = JSON.parse(readFileSync(join(ROOT, 'vercel.json'), 'utf8'));
  const all = vercel.headers.find((h) => h.source === '/(.*)');
  assert.ok(all, 'vercel.json needs a /(.*) header rule');
  const mirrored = new Map(all.headers.map((h) => [h.key.toLowerCase(), h.value]));
  assert.deepEqual(mirrored, headers);
});

test('nginx security-headers snippet (if present) mirrors public/_headers exactly', { skip: !existsSync(join(ROOT, 'nginx', 'security-headers.conf')) }, () => {
  const conf = readFileSync(join(ROOT, 'nginx', 'security-headers.conf'), 'utf8');
  const mirrored = new Map();
  for (const m of conf.matchAll(/^\s*add_header\s+([\w-]+)\s+"([^"]*)"\s+always;\s*$/gm)) {
    mirrored.set(m[1].toLowerCase(), m[2]);
  }
  assert.deepEqual(mirrored, headers);
  const nginx = readFileSync(join(ROOT, 'nginx.conf'), 'utf8');
  assert.match(nginx, /server_tokens\s+off;/);
  // Every location that sets its own add_header must re-include the snippet,
  // otherwise nginx silently drops the inherited security headers there.
  for (const block of nginx.matchAll(/location[^{]*\{([^}]*)\}/g)) {
    if (/add_header/.test(block[1])) {
      assert.match(block[1], /include\s+\/etc\/nginx\/snippets\/security-headers\.conf;/, `location without security headers: ${block[0]}`);
    }
  }
});

// Scans the built site (dist/) against the CSP in public/_headers.
// Run `npm run build` first; a missing dist/ is a failure, not a skip.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { basename, join } from 'node:path';
import {
  ROOT, DIST, readCanonicalHeaders, parseCsp, sourcesFor, originAllowed, sha256Source,
  listFiles, rel, findTags, isExecutableInlineScript,
} from './_security-lib.mjs';

const SITE_ORIGIN = 'https://plokr.com';

assert.ok(existsSync(DIST), 'dist/ not found: run `npm run build` before `npm test`');

const csp = parseCsp(readCanonicalHeaders().global.get('content-security-policy'));
const files = listFiles(DIST);
const htmlFiles = files.filter((f) => f.endsWith('.html'));
const cssFiles = files.filter((f) => f.endsWith('.css'));
const pages = htmlFiles.map((f) => ({ file: rel(f), html: readFileSync(f, 'utf8') }));

/** Resolve a URL found in a page; null for same-document / non-network URLs. */
function resolve(url) {
  const trimmed = url.trim();
  if (!trimmed || trimmed.startsWith('#') || /^(data|blob|mailto|tel|about):/i.test(trimmed)) return null;
  return new URL(trimmed, `${SITE_ORIGIN}/`).href;
}

function allowedBy(directive, url) {
  return originAllowed(sourcesFor(csp, directive), url, SITE_ORIGIN);
}

test('dist/ contains built HTML pages', () => {
  assert.ok(htmlFiles.length > 0, 'no HTML files in dist/');
});

test('every inline <script> is allowed by a script-src sha256 hash', () => {
  const allowed = new Set(sourcesFor(csp, 'script-src'));
  const missing = new Map();
  for (const { file, html } of pages) {
    for (const script of findTags(html, 'script').filter(isExecutableInlineScript)) {
      const hash = sha256Source(script.body);
      if (!allowed.has(hash)) missing.set(hash, `${file}: ${script.body.trim().slice(0, 80)}...`);
    }
  }
  const report = [...missing].map(([hash, where]) => `  ${hash}  ${where}`).join('\n');
  assert.equal(missing.size, 0, `inline scripts not allowed by CSP (externalize them, or add the hash to public/_headers and its mirrors):\n${report}`);
});

test("inline styles are allowed by style-src (only relevant without 'unsafe-inline')", () => {
  const sources = sourcesFor(csp, 'style-src');
  if (sources.includes("'unsafe-inline'")) return;
  const allowed = new Set(sources);
  const offenders = [];
  for (const { file, html } of pages) {
    for (const m of html.matchAll(/<style\b[^>]*>([\s\S]*?)<\/style\s*>/gi)) {
      if (!allowed.has(sha256Source(m[1]))) offenders.push(`${file}: <style> ${sha256Source(m[1])}`);
    }
    for (const m of html.matchAll(/<[a-z][^>]*\sstyle\s*=/gi)) offenders.push(`${file}: style attribute in ${m[0].slice(0, 60)}`);
  }
  assert.deepEqual(offenders, [], 'style-src has no unsafe-inline: move inline CSS into a stylesheet');
});

test('every external <script src> origin is allowed by script-src', () => {
  for (const { file, html } of pages) {
    for (const { attrs } of findTags(html, 'script')) {
      const url = attrs.has('src') ? resolve(attrs.get('src')) : null;
      if (url) assert.ok(allowedBy('script-src', url), `${file}: script ${url} not allowed by script-src`);
    }
  }
});

test('no javascript: URLs or inline event-handler attributes', () => {
  // Inline handlers (onclick=...) are blocked by a hash-based script-src and
  // would silently break; javascript: URLs are an XSS pattern.
  const offenders = [];
  for (const { file, html } of pages) {
    for (const m of html.matchAll(/<[a-z][^>]*\s(on[a-z]+)\s*=/gi)) offenders.push(`${file}: ${m[1]}=`);
    for (const m of html.matchAll(/(?:href|src|action)\s*=\s*["']?\s*javascript:/gi)) offenders.push(`${file}: ${m[0]}`);
  }
  assert.deepEqual(offenders, []);
});

test('every <iframe>/<frame> source is allowed by frame-src, and no <embed>/<object>', () => {
  for (const { file, html } of pages) {
    for (const tag of ['iframe', 'frame']) {
      for (const { attrs } of findTags(html, tag)) {
        const url = resolve(attrs.get('src') ?? '') ?? `${SITE_ORIGIN}/`;
        assert.ok(allowedBy('frame-src', url), `${file}: <${tag}> ${url} not allowed by frame-src`);
      }
    }
    for (const tag of ['embed', 'object']) {
      assert.equal(findTags(html, tag).length, 0, `${file}: <${tag}> is blocked by object-src 'none'`);
    }
  }
});

test('stylesheets, preloads, images and form targets are allowed by CSP', () => {
  for (const { file, html } of pages) {
    for (const { attrs } of findTags(html, 'link')) {
      const relAttr = (attrs.get('rel') ?? '').toLowerCase();
      const url = resolve(attrs.get('href') ?? '');
      if (!url) continue;
      if (relAttr.includes('stylesheet')) assert.ok(allowedBy('style-src', url), `${file}: stylesheet ${url} not allowed by style-src`);
      if (relAttr.includes('modulepreload')) assert.ok(allowedBy('script-src', url), `${file}: modulepreload ${url} not allowed by script-src`);
    }
    for (const { attrs } of findTags(html, 'img')) {
      const url = resolve(attrs.get('src') ?? '');
      if (url) assert.ok(allowedBy('img-src', url), `${file}: image ${url} not allowed by img-src`);
    }
    for (const { attrs } of findTags(html, 'form')) {
      const url = resolve(attrs.get('action') ?? '/');
      if (url) assert.ok(originAllowed(csp.get('form-action') ?? [], url, SITE_ORIGIN), `${file}: form action ${url} not allowed by form-action`);
    }
  }
  for (const f of cssFiles) {
    const css = readFileSync(f, 'utf8');
    for (const m of css.matchAll(/@import\s+(?:url\()?\s*['"]?(https?:\/\/[^'")\s]+)/g)) {
      assert.ok(allowedBy('style-src', m[1]), `${rel(f)}: @import ${m[1]} not allowed by style-src`);
    }
  }
});

test('no asset is loaded over plain http://', () => {
  const offenders = [];
  const assetAttrs = {
    script: ['src'], link: ['href'], img: ['src', 'srcset'], iframe: ['src'], source: ['src', 'srcset'],
    video: ['src', 'poster'], audio: ['src'], form: ['action'], object: ['data'], embed: ['src'],
  };
  for (const { file, html } of pages) {
    for (const [tag, names] of Object.entries(assetAttrs)) {
      for (const { attrs } of findTags(html, tag)) {
        for (const name of names) {
          if (/(^|[\s,])http:\/\//i.test(attrs.get(name) ?? '')) offenders.push(`${file}: <${tag} ${name}="${attrs.get(name)}">`);
        }
      }
    }
  }
  for (const f of cssFiles) {
    for (const m of readFileSync(f, 'utf8').matchAll(/url\(\s*['"]?(http:\/\/[^'")]+)|@import\s+['"](http:\/\/[^'"]+)/gi)) {
      offenders.push(`${rel(f)}: ${m[1] ?? m[2]}`);
    }
  }
  assert.deepEqual(offenders, []);
});

test('every target="_blank" link has rel="noopener"', () => {
  const offenders = [];
  for (const { file, html } of pages) {
    for (const tag of ['a', 'area', 'form']) {
      for (const { attrs } of findTags(html, tag)) {
        if ((attrs.get('target') ?? '').toLowerCase() !== '_blank') continue;
        const relTokens = (attrs.get('rel') ?? '').toLowerCase().split(/\s+/);
        if (!relTokens.includes('noopener')) offenders.push(`${file}: <${tag} href="${attrs.get('href') ?? attrs.get('action')}">`);
      }
    }
  }
  assert.deepEqual(offenders, []);
});

test('no source maps are shipped', () => {
  assert.deepEqual(files.filter((f) => f.endsWith('.map')).map(rel), []);
  for (const f of files.filter((p) => /\.(js|mjs|css)$/.test(p))) {
    assert.ok(!/[#@]\s*sourceMappingURL=/.test(readFileSync(f, 'utf8')), `${rel(f)} references a source map`);
  }
});

test('no env files, keys or certificates leak into dist/', () => {
  const leaked = files.filter((f) => {
    const name = basename(f).toLowerCase();
    return name.startsWith('.env') || name === '.npmrc' || /^id_(rsa|ed25519|ecdsa)/.test(name) || /\.(pem|key|p12|pfx|crt|cer|der)$/.test(name);
  });
  assert.deepEqual(leaked.map(rel), []);
});

test('dist/_headers is the canonical public/_headers, unmodified', () => {
  const built = join(DIST, '_headers');
  assert.ok(existsSync(built), 'dist/_headers missing: Cloudflare Pages would serve no security headers');
  const normalize = (p) => readFileSync(p, 'utf8').replace(/\r\n/g, '\n');
  assert.equal(normalize(built), normalize(join(ROOT, 'public', '_headers')));
});

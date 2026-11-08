// Shared, dependency-free helpers for the security tests (not a test file).
import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { join, dirname, relative, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createHash } from 'node:crypto';

export const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
export const DIST = join(ROOT, 'dist');

/** Parse a Cloudflare Pages `_headers` file into Map<pathPattern, Map<lowercased name, value>>. */
export function parseHeadersFile(text) {
  const rules = new Map();
  let current = null;
  for (const rawLine of text.split(/\r?\n/)) {
    if (!rawLine.trim() || rawLine.trim().startsWith('#')) continue;
    if (!/^\s/.test(rawLine)) {
      current = new Map();
      rules.set(rawLine.trim(), current);
      continue;
    }
    if (!current) throw new Error(`header line before any path: ${rawLine}`);
    const idx = rawLine.indexOf(':');
    if (idx === -1) throw new Error(`malformed header line: ${rawLine}`);
    const name = rawLine.slice(0, idx).trim().toLowerCase();
    if (current.has(name)) throw new Error(`duplicate header ${name}`);
    current.set(name, rawLine.slice(idx + 1).trim());
  }
  return rules;
}

export function readCanonicalHeaders() {
  const rules = parseHeadersFile(readFileSync(join(ROOT, 'public', '_headers'), 'utf8'));
  const global = rules.get('/*');
  if (!global) throw new Error('public/_headers has no /* rule');
  return { rules, global };
}

/** Parse a CSP string into Map<directive, string[]>. */
export function parseCsp(csp) {
  const map = new Map();
  for (const part of csp.split(';')) {
    const tokens = part.trim().split(/\s+/).filter(Boolean);
    if (!tokens.length) continue;
    const name = tokens[0].toLowerCase();
    if (map.has(name)) throw new Error(`duplicate CSP directive ${name}`);
    map.set(name, tokens.slice(1));
  }
  return map;
}

/** Sources that apply to a fetch directive, falling back to default-src like browsers do. */
export function sourcesFor(csp, directive) {
  return csp.get(directive) ?? csp.get('default-src') ?? [];
}

/** True when `url` (absolute) is allowed by the source list. Only exact-origin / 'self' matching. */
export function originAllowed(sources, url, siteOrigin) {
  const u = new URL(url);
  if (sources.includes("'none'")) return false;
  if (u.origin === siteOrigin && sources.includes("'self'")) return true;
  return sources.some((s) => {
    if (!/^https?:\/\//.test(s)) return false;
    const allowed = new URL(s);
    return allowed.origin === u.origin && u.pathname.startsWith(allowed.pathname);
  });
}

export function sha256Source(text) {
  return `'sha256-${createHash('sha256').update(text, 'utf8').digest('base64')}'`;
}

export function listFiles(dir) {
  const out = [];
  if (!existsSync(dir)) return out;
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const p = join(dir, entry.name);
    if (entry.isDirectory()) out.push(...listFiles(p));
    else out.push(p);
  }
  return out;
}

export const rel = (p) => relative(ROOT, p).split(sep).join('/');

/** Extract attributes of an HTML start tag's attribute string into a Map (lowercased names). */
export function parseAttrs(attrText) {
  const attrs = new Map();
  // eslint-disable-next-line security/detect-unsafe-regex -- disjoint char classes, input is our own build output
  const re = /([^\s=/>"']+)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]+)))?/g;
  for (const m of attrText.matchAll(re)) {
    attrs.set(m[1].toLowerCase(), m[2] ?? m[3] ?? m[4] ?? '');
  }
  return attrs;
}

/** All start tags of `tag` in html: [{ attrs, body? }] (body only for script). */
export function findTags(html, tag) {
  if (tag === 'script') {
    return [...html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script\s*>/gi)].map((m) => ({ attrs: parseAttrs(m[1]), body: m[2] }));
  }
  if (!/^[a-z][a-z0-9-]*$/.test(tag)) throw new Error(`invalid tag name ${tag}`);
  // eslint-disable-next-line security/detect-non-literal-regexp -- tag is validated above
  return [...html.matchAll(new RegExp(String.raw`<${tag}(?=[\s/>])([^>]*)>`, 'gi'))].map((m) => ({ attrs: parseAttrs(m[1]) }));
}

const NON_EXECUTABLE_SCRIPT_TYPES = new Set(['application/ld+json', 'application/json']);
export function isExecutableInlineScript({ attrs }) {
  if (attrs.has('src')) return false;
  const type = (attrs.get('type') ?? '').toLowerCase();
  return !NON_EXECUTABLE_SCRIPT_TYPES.has(type);
}

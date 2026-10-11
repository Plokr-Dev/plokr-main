// Tests the Formspree endpoint validator added to src/components/ContactForm.tsx
// (resolveEndpoint): a misconfigured/malicious PUBLIC_FORMSPREE_ENDPOINT must never
// be used, since the form would otherwise post lead data to an arbitrary origin.
//
// resolveEndpoint() is not exported (it is an implementation detail of a React
// component we must not modify), so this test extracts its exact source text from
// the real file at run time and transpiles it with the `typescript` package (an
// existing devDependency) rather than re-typing the logic here. That keeps the
// test honest: if the real implementation changes shape, extraction — and the
// test — fails loudly instead of silently validating a stale copy.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, writeFileSync, rmSync } from 'node:fs';
import { join } from 'node:path';
import { tmpdir } from 'node:os';
import { pathToFileURL } from 'node:url';
import ts from 'typescript';
import { ROOT } from './_security-lib.mjs';

const SOURCE_PATH = join(ROOT, 'src', 'components', 'ContactForm.tsx');
const source = readFileSync(SOURCE_PATH, 'utf8');

const constMatch = source.match(/const FORMSPREE_ORIGIN\s*=\s*'[^']*';/);
const fnMatch = source.match(/function resolveEndpoint\([^)]*\)[^{]*\{[\s\S]*?\n\}/);
assert.ok(constMatch, 'FORMSPREE_ORIGIN constant not found in ContactForm.tsx — update this test\'s extraction regex');
assert.ok(fnMatch, 'resolveEndpoint() not found in ContactForm.tsx — update this test\'s extraction regex');

const snippet = `${constMatch[0]}\n${fnMatch[0]}\nexport { resolveEndpoint };\n`;
const { outputText, diagnostics } = ts.transpileModule(snippet, {
  compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2020 },
  reportDiagnostics: true,
});
assert.deepEqual(diagnostics ?? [], [], 'extracted resolveEndpoint() snippet failed to transpile');

const tmpFile = join(tmpdir(), `contact-form-resolve-endpoint-${process.pid}-${Date.now()}.mjs`);
writeFileSync(tmpFile, outputText);
let resolveEndpoint;
try {
  // tmpFile is built above from tmpdir()/pid/Date.now(), not from user/network input.
  // eslint-disable-next-line no-unsanitized/method
  ({ resolveEndpoint } = await import(pathToFileURL(tmpFile).href));
} finally {
  rmSync(tmpFile, { force: true });
}

test('resolveEndpoint returns null when unset or empty', () => {
  assert.equal(resolveEndpoint(undefined), null);
  assert.equal(resolveEndpoint(''), null);
});

test('resolveEndpoint returns null for a malformed URL', () => {
  assert.equal(resolveEndpoint('not-a-url'), null);
});

test('resolveEndpoint rejects a non-Formspree origin (anti-SSRF / anti-exfiltration)', () => {
  assert.equal(resolveEndpoint('https://evil.example.com/f/abc123'), null);
});

test('resolveEndpoint rejects plain-http Formspree (protocol downgrade)', () => {
  assert.equal(resolveEndpoint('http://formspree.io/f/abc123'), null);
});

test('resolveEndpoint rejects a Formspree URL outside the /f/ form path', () => {
  assert.equal(resolveEndpoint('https://formspree.io/account/settings'), null);
});

test('resolveEndpoint accepts a well-formed Formspree form URL', () => {
  assert.equal(resolveEndpoint('https://formspree.io/f/abc123'), 'https://formspree.io/f/abc123');
});

test('resolveEndpoint normalizes via URL#toString (query/hash preserved, origin re-verified)', () => {
  assert.equal(resolveEndpoint('https://formspree.io/f/abc123?x=1'), 'https://formspree.io/f/abc123?x=1');
});

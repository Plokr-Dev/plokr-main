// Entry point for `node --test tests/`.
// Node >= 22 treats the positional `tests/` as a module path (not a directory to
// search), which resolves to this file. Test files are imported statically; the
// guard below fails the run if a *.test.mjs file exists that is not listed here,
// so a new test can never be silently skipped.
import { readdirSync } from 'node:fs';
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import './headers.test.mjs';
import './build-output.test.mjs';
import './contact-form-endpoint.test.mjs';
import './pricing.test.mjs';

const REGISTERED = ['build-output.test.mjs', 'contact-form-endpoint.test.mjs', 'headers.test.mjs', 'pricing.test.mjs'];
const onDisk = readdirSync(dirname(fileURLToPath(import.meta.url))).filter((f) => f.endsWith('.test.mjs')).sort();
const unregistered = onDisk.filter((f) => !REGISTERED.includes(f));
if (unregistered.length > 0) {
  throw new Error(`tests/index.js does not import: ${unregistered.join(', ')}`);
}

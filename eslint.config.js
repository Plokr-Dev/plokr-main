// ESLint flat config — security-first lint for the Astro + React marketing site.
import js from '@eslint/js';
import { defineConfig } from 'eslint/config';
import tseslint from 'typescript-eslint';
import astro from 'eslint-plugin-astro';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import security from 'eslint-plugin-security';
import noUnsanitized from 'eslint-plugin-no-unsanitized';
import globals from 'globals';

// `set:html` injects raw HTML. Allow only string literals, expression-free
// template literals, or the escaping JSON-LD serializer; anything else must be
// reviewed and explicitly disabled with a justification.
const SET_HTML_NON_LITERAL =
  "JSXAttribute[name.namespace.name='set'][name.name.name='html'] > JSXExpressionContainer > " +
  ":not(Literal, TemplateLiteral[expressions.length=0], CallExpression[callee.name='serializeJsonLd'])";

const bannedSyntax = [
  'error',
  { selector: SET_HTML_NON_LITERAL, message: 'set:html with a non-literal value is an XSS sink. Use {expr} (auto-escaped) or serializeJsonLd().' },
  { selector: "CallExpression[callee.name='Function'], NewExpression[callee.name='Function']", message: 'Function constructor is eval.' },
  { selector: "CallExpression[callee.property.name='insertAdjacentHTML']", message: 'insertAdjacentHTML is an XSS sink.' },
  { selector: "CallExpression[callee.object.name='document'][callee.property.name=/^write(ln)?$/]", message: 'document.write is an XSS sink.' },
];

const securityRules = {
  'no-eval': 'error',
  'no-implied-eval': 'error',
  'no-new-func': 'error',
  'no-script-url': 'error',
  'no-restricted-syntax': bannedSyntax,
};

export default defineConfig(
  {
    ignores: [
      'dist/**',
      '.astro/**',
      'node_modules/**',
      // Claude Design handoff prototypes: reference material, never built or shipped.
      'chats/**',
      'project/**',
    ],
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  ...astro.configs.recommended,
  security.configs.recommended,
  noUnsanitized.configs.recommended,
  {
    languageOptions: { globals: { ...globals.browser } },
    rules: securityRules,
  },
  {
    files: ['**/*.{jsx,tsx}'],
    plugins: { react, 'react-hooks': reactHooks },
    settings: { react: { version: 'detect' } },
    rules: {
      ...react.configs.recommended.rules,
      ...react.configs['jsx-runtime'].rules,
      ...reactHooks.configs.recommended.rules,
      'react/no-danger': 'error',
      'react/jsx-no-target-blank': ['error', { allowReferrer: false, enforceDynamicLinks: 'always' }],
      'react/jsx-no-script-url': 'error',
      'react/prop-types': 'off',
    },
  },
  {
    files: ['tests/**/*.mjs', '*.config.{js,mjs}'],
    languageOptions: { globals: { ...globals.node } },
    rules: {
      // Tests read files from paths they build themselves (dist/, public/).
      'security/detect-non-literal-fs-filename': 'off',
    },
  },
);

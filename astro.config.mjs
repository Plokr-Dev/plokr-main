import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://plokr.com',
  // Fully static: every marketing page is prerendered to HTML at build time and
  // Cloudflare Pages serves dist/ as plain files, with response headers taken
  // from public/_headers (the single source of truth for security headers).
  //
  // The @astrojs/cloudflare adapter was removed: with zero on-demand routes it
  // only emitted an unused _worker.js/_routes.json, and the adapter versions
  // that support a patched Astro split output into dist/client + dist/server
  // and pull in wrangler. If a page ever needs on-demand SSR
  // (`export const prerender = false`), re-add the adapter and move the Pages
  // output directory to dist/client.
  output: 'static',
  integrations: [react(), sitemap()],
  vite: {
    build: {
      // Never inline Vite assets or processed <script> bundles into HTML: every
      // first-party script ships as an external /_astro/*.js file covered by
      // script-src 'self'. Only Astro's fixed island-hydration runtime stays
      // inline and is allowed by sha256 hash (see public/_headers).
      assetsInlineLimit: 0,
      sourcemap: false,
    },
  },
});

import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import cloudflare from '@astrojs/cloudflare';

export default defineConfig({
  site: 'https://plokr.com',
  // Static-by-default: every marketing page is prerendered to HTML at build time
  // (free + fast + best SEO on Cloudflare Pages). The Cloudflare adapter makes the
  // site SSR-capable so any page that must render on-demand can opt in with
  // `export const prerender = false`.
  //
  // For "dynamic for SEO": repo-managed programmatic pages (per-integration,
  // per-use-case landing pages) should use getStaticPaths so they stay static and
  // free; reserve on-demand SSR (prerender = false) for content that must change
  // without a rebuild (e.g. a headless CMS). With zero on-demand routes the build
  // stays fully static and no Worker bundle is emitted.
  output: 'static',
  adapter: cloudflare(),
  integrations: [react(), sitemap()],
});

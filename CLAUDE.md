# Plokr Main (Landing)

> **Guardrails:** work in this repo is gated by build/QA/security agents — see `../CLAUDE.md` and `AGENTS.md`. Do not commit until `bash ../.claude/gates/gate.sh check main` passes.

## What it is / live-vs-legacy

Astro 7 static marketing site (+ React islands) for Plokr Core (Jira monitoring & dependency
health) and Plokr Integrate (on-prem scanning). It is the handoff implementation of the "Plokr
Homepage" Claude Design export (`project/`, `chats/`).

**This is the deployed, live marketing site**, not `plokr-website`:
- It is the only one of the two wired into the workspace root `docker-compose.yml` — service
  `landing` (`context: ./plokr-main`, container `plokr-landing`, host port **3000**) — and is the
  target of `ADMIN_PUBLIC_URL`/cross-app CTA wiring from the other repos.
- It owns a working deploy pipeline: `Dockerfile` (Node build → `nginxinc/nginx-unprivileged`
  serve) + `nginx.conf`, with `public/_headers` (the Cloudflare Pages header convention) as the
  single canonical source of CSP/security headers — `nginx/security-headers.conf` (included by
  `nginx.conf`) and the root `vercel.json` (a holdover from an earlier Vercel deploy target) must
  mirror it exactly, and `tests/headers.test.mjs` fails the build if they drift. There is no
  adapter in `astro.config.mjs` — the `@astrojs/cloudflare` adapter was removed (zero on-demand
  routes meant it only emitted an unused Worker bundle); the site is fully static (`output:
  'static'`).
- `plokr-website` (sibling repo) has none of this: no Dockerfile, no nginx config, no compose
  entry. It is a separately-built, more recent redesign (first commit 2026-07-18 vs. this repo's
  2026-07-15, built from a different Claude Design export — "Plokr Site") that is **not deployed or
  wired into anything verifiable in this workspace**. Treat `plokr-main` as the real site and
  `plokr-website` as an in-progress replacement candidate until infra says otherwise.
- **Conflict to flag:** both repos set `site: 'https://plokr.com'` in their `astro.config.mjs`.
  Only one can actually own that domain — this is still an open product decision, unresolved by
  the security-debt merge.

## Stack

| Layer | Version |
|---|---|
| Framework | Astro ^7.3.5, `output: 'static'`, no adapter (fully static — the `@astrojs/cloudflare` adapter was dropped since zero on-demand routes need it) |
| Islands | `@astrojs/react` ^7.0.0 + React 18.3 (`client:load` only — no `client:visible`/`idle` anywhere) |
| Sitemap | `@astrojs/sitemap` ^3.7.4 |
| Icons | `lucide-react` |
| Lang | TypeScript 5.7 |
| Fonts | Google Fonts (preconnect in `Layout.astro`) |

## App map

| Route | File | Purpose |
|---|---|---|
| `/` | `src/pages/index.astro` | Dual hero (Core + Integrate), trust bar, feature sections, pricing teaser |
| `/about` | `src/pages/about.astro` | Company/about |
| `/pricing` | `src/pages/pricing.astro` | Pricing tiers + FAQ (`PricingTiers`, `FAQAccordion` islands) |
| `/integrations` | `src/pages/integrations.astro` | Integrations listing |
| `/docs` | `src/pages/docs.astro` | Documentation landing |
| `/jira-monitoring` | `src/pages/jira-monitoring.astro` | Plokr Core feature page |
| `/dependency-checker` | `src/pages/dependency-checker.astro` | Plokr Core feature page |
| `/core/` | `src/pages/core/index.astro` | Plokr Core product overview |
| `/integrate/` | `src/pages/integrate/index.astro` | Plokr Integrate product overview |
| `/blog`, `/blog/why-dependency-risk` | `src/pages/blog/*.astro` | Blog index + one post |
| `/changelog` | `src/pages/changelog.astro` | Changelog |
| `/contact` | `src/pages/contact.astro` | Demo request form (`ContactForm` island → Formspree) |
| `/security` | `src/pages/security.astro` | Security & data integrity |
| `/privacy`, `/terms`, `/dpa` | `src/pages/*.astro` | Legal (indexed) |
| `/404` | `src/pages/404.astro` | Not found (`noIndex: true`) |

`src/pages/**/*.ts` is empty — no on-demand API routes exist; the site is fully static.

## Architecture

**Layout** — single shell `src/layouts/Layout.astro`: full SEO `<head>` (title, description,
canonical, Open Graph, Twitter `summary_large_image`, Organization JSON-LD on the homepage, extra
page JSON-LD via a `slot="head"`), then `<Nav>` `<slot/>` `<Footer>` `<AuthModal client:load>`.

**Components** — `Nav.astro` (static product-switcher/company dropdowns + a small inline vanilla-JS
script for open/close — not a React island) and `Footer.astro` are `.astro`; `AuthModal.tsx`,
`ContactForm.tsx`, `FAQAccordion.tsx`, `PricingTiers.tsx` are React islands, all hydrated with
`client:load`. **`AuthModal` is cosmetic**: its provider buttons and email field never call an auth
API — `go()` just shows a 1.2s "redirecting…" animation then `window.open()`s `PLOKR_APP`
(the real workspace app's `/auth/login`). Real auth happens entirely in `plokr-frontend`.

**Content source** — no CMS; copy lives directly in `.astro`/`.tsx` files and `src/lib/constants.ts`
(`PLOKR_APP` CTA target, `SITE_*` constants, `PRICING_TIERS`). `project/` (HTML/JSX prototypes) and
`chats/` (design transcripts) are the Claude Design handoff reference only — nothing under `src/`
imports them; don't treat them as live code.

**Styling** — one global stylesheet `src/styles/global.css`; no Tailwind, no component-scoped
token system (unlike `plokr-admin`/`plokr-website`).

**SEO** — per-page `title`/`description`/`canonical`/`ogImage`/`noIndex` props into `Layout.astro`;
sitemap generated by `@astrojs/sitemap` at build (`robots.txt` points to
`/sitemap-index.xml`); Organization JSON-LD ships on the homepage, `SoftwareApplication` JSON-LD
added per-page via the `head` slot.

**Images** — static files under `public/brand/` (favicons, wordmark PNGs); no image CDN/optimization
pipeline — PNGs only, uploaded pre-sized.

## Critical rules

1. Treat `project/Plokr Homepage.html` and `chats/` as the design contract for layout/copy/visual
   structure changes — recreate pixel-perfect rather than freelancing (`AGENTS.md`).
2. No client framework beyond the declared React islands, and no new hydration directive beyond
   `client:load` without a stated reason — this is a performance-budgeted static marketing site.
3. Static output only (`output: 'static'`) — there is no adapter configured, so an on-demand
   (`prerender = false`) route will fail to build; re-add `@astrojs/cloudflare` (or another
   adapter) and move the Pages output directory to `dist/client` first if SSR is ever needed.
4. No backend secrets and no authenticated API calls belong here — `AuthModal` must stay a redirect
   dressed as a sign-in flow, never a real credential submission.
5. Keep `Layout.astro`'s SEO head (canonical, Open Graph, Twitter card, security meta) intact on
   every page; set `noIndex` explicitly for non-indexable pages (see `404.astro`).
6. `public/_headers` is the canonical CSP/HSTS/frame header source; `nginx/security-headers.conf`
   and root `vercel.json` must mirror it exactly — `tests/headers.test.mjs` fails the build if they
   drift, so update all three together.
7. `PUBLIC_PLOKR_APP` is inlined at **build time** (Astro `PUBLIC_*` convention) — it cannot be
   changed at container runtime; it must be passed as a Docker build `ARG`/compose build arg.
8. `ContactForm` posts to `PUBLIC_FORMSPREE_ENDPOINT` (external, public form backend) — this is not
   a Plokr backend call and must not be repointed at an internal/authenticated endpoint without
   re-reviewing rule 4.

## Conventions & commands

| Task | Command | Notes |
|---|---|---|
| Install | `npm install` | |
| Dev server | `npm run dev` | |
| Build | `npm run build` | `astro build` → `dist/` |
| Type/content check | `npm run check` | `astro check` |
| Preview | `npm run preview` | |
| Unit tests | `npm test` | `node --test tests/` — header-drift, build-output and lint-adjacent checks (no component/E2E suite) |
| Lint | `npm run lint` | `eslint .` (`eslint.config.js`, incl. `eslint-plugin-security`/`astro`/`react`) |
| Security scan | `bash ../.claude/gates/gate.sh run main scan` | Vendored gate config now lives in this repo's own `.plokr-ci/` (gitleaks, semgrep, osv-scanner, npm audit); `lefthook.yml` wires pre-push hooks |

## Local dev

`npm install && npm run dev` (no Docker required for day-to-day work, per `Dockerfile`'s own
comment). To exercise the production build path: root `docker compose up` builds this repo via its
`Dockerfile` into the `landing` service on port 3000, with `PUBLIC_PLOKR_APP` defaulting to
`http://localhost:4200/auth/login` (the compose `frontend` service).

## Uncertain / unverified

- The live-vs-legacy call above is inferred from docker-compose wiring + presence/absence of deploy
  config + commit history, not from a canonical statement anywhere that says "plokr-main is live" —
  no deployment logs or DNS records were available to check directly.

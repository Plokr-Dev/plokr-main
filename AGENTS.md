# plokr-main

Astro 7 static marketing/landing site (`output: 'static'`, no adapter) with React islands (`client:load` only) for Plokr Core and Plokr Integrate. Implements the "Plokr Homepage" Claude Design handoff; `project/` and `chats/` are design reference, never imported by `src/`.

## Commands

| Task | Command |
|---|---|
| Dev | `npm run dev` (port 4321, no backend needed) |
| Build | `npm run build` (`astro build` to `dist/`) |
| Check | `npm run check` (`astro check`) |
| Test | `npm test` (`node --test tests/`: header drift, build output) |
| Lint | `npm run lint` |
| Preview | `npm run preview` |
| Scan | `bash ../.claude/gates/gate.sh run plokr-main scan` |

## Routes (`src/pages/`, all static)

- `/`, `/about`, `/pricing`, `/integrations`, `/docs`, `/changelog`, `/contact`, `/security`
- `/jira-monitoring`, `/dependency-checker`, `/core/`, `/integrate/`
- `/blog`, `/blog/why-dependency-risk`
- Legal: `/privacy`, `/terms`, `/dpa`; `/404` (`noIndex`)

## Mechanisms

- One shell, `src/layouts/Layout.astro`, owns the SEO head (canonical, OG, Twitter, JSON-LD) and mounts `AuthModal`.
- `AuthModal` is cosmetic: it never calls an auth API, only animates then opens `PLOKR_APP` (`src/lib/constants.ts`); real auth is in `plokr-frontend`.
- `public/_headers` is the canonical CSP/security-header source; `nginx/security-headers.conf` and `vercel.json` mirror it and `tests/headers.test.mjs` fails on drift.

## Rules

- **Rule 1** — `project/Plokr Homepage.html` and `chats/` are the design contract for layout/copy/visual changes; recreate faithfully, don't freelance.
- **Rule 2** — No client framework beyond the declared React islands, and no hydration directive beyond `client:load` without a stated reason.
- **Rule 3** — Static output only; an on-demand (`prerender = false`) route fails to build without an adapter, so add one deliberately first.
- **Rule 4** — No backend secrets and no authenticated API calls; `AuthModal` stays a redirect, never a credential submission.
- **Rule 5** — Keep `Layout.astro`'s SEO head intact on every page; set `noIndex` explicitly on non-indexable pages.
- **Rule 6** — `public/_headers`, `nginx/security-headers.conf` and `vercel.json` must match exactly; update all three together.
- **Rule 7** — `PUBLIC_PLOKR_APP` is inlined at build time; pass it as a Docker build `ARG`/compose build arg, not at runtime.
- **Rule 8** — `ContactForm` posts only to the external `PUBLIC_FORMSPREE_ENDPOINT`; never repoint it at an internal or authenticated endpoint without re-reviewing Rule 4.

## Local dev

`npm install && npm run dev` (port 4321). Don't run alongside `plokr-website`'s dev server without overriding one port.
Production build path: root `docker compose up` (service `landing`, port 3000).

## Guardrails

Changes are `full`-tier (9 gates when a UI path is touched: `src/**` non-test, `*.astro`, `*.scss`, `public/**`); `instructions`-tier when only AGENTS.md/CLAUDE.md/`.claude/**` change. Tiers and UI bar: `../AGENTS.md`.
Stay inside the active manifest (`bash ../.claude/gates/gate.sh scope show plokr-main`); do not commit until `bash ../.claude/gates/gate.sh check plokr-main` passes.

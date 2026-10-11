# Plokr Main (Landing) — Agent Guide

Astro 7 static site (+ React islands via `@astrojs/react`) implementing the "Plokr Homepage"
Claude Design handoff. `chats/` holds the design transcripts; `project/Plokr Homepage.html`
is the primary visual source of truth.

## Commands

| Task | Command |
|---|---|
| Dev server | `npm run dev` |
| Build | `npm run build` (`astro build`) |
| Type/content check | `npm run check` (`astro check`) |
| Preview | `npm run preview` |
| Unit tests | `npm test` (`node --test tests/`) — header-drift and build-output checks; no component/E2E suite |
| Lint | `npm run lint` (`eslint .`) |
| Security scan | `bash ../.claude/gates/gate.sh run main scan` — vendored gate config lives in this repo's own `.plokr-ci/` |

## Repo invariants

No repo-level `CLAUDE.md` yet:

- Treat `project/Plokr Homepage.html` and `chats/` as the design contract — read them before
  changing layout, copy, or visual structure; recreate pixel-perfect rather than freelancing.
- No client framework beyond the declared React islands — don't add new ones without checking
  the handoff's intent first.
- Public marketing surface: no backend secrets, no authenticated API calls belong here.

Guardrails: see `../AGENTS.md` and `../CLAUDE.md`. Changes here are `full`-tier (all 7
gates: build, tests, scan, scopecheck, qa, security, scope — tests has no suite here, see
above) unless only this file or `.claude/**` changed (`instructions`-tier: scan + security
only). Stay inside the active scope manifest (`gate.sh scope show plokr-main`) — if the
task needs more files, stop and get the manifest amended. Do not commit until
`bash ../.claude/gates/gate.sh check plokr-main` passes.

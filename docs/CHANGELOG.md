# RayApp — Changelog

> Append one entry per iteration / PR. Newest first.
> Format: `## [version] — YYYY-MM-DD`

---

## [0.0.2] — 2026-02-27

### Changed (internal)
- Created `docs/prompts/bootstrap.md` — canonical scope of truth for v0.1
- Created living docs suite: `docs/INDEX.md`, `docs/STATUS.md`, `docs/ARCHITECTURE.md`,
  `docs/API.md`, `docs/CHANGELOG.md`, `docs/adr/INDEX.md`

### How to verify
- All files exist under `docs/`
- `docs/INDEX.md` links to every other doc correctly

---

## [0.0.1] — 2026-02-27

### Changed (internal)
- Unloaded all Expo demo/example code from `application/` scaffold
- Moved project into monorepo layout (`application/`, future `backend/`)

### How to verify
- `cd application && npm start` — app boots to blank placeholder screen

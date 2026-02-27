# RayApp — Changelog

> Append one entry per iteration / PR. Newest first.
> Format: `## [version] — YYYY-MM-DD`

---

## [0.0.4] — 2026-02-27

### Changed (internal)
- Added `.github/workflows/ci.yml` — runs lint + type-check + Jest on every PR and push to master
- Added `.github/workflows/build.yml` — triggers EAS Build (preview, Android APK) on successful CI run on master via `workflow_run`
- Added `application/eas.json` — EAS Build config with `preview` profile (`distribution: internal`, `buildType: apk`)
- Added `docs/adr/0001-ci-cd-pipeline.md` — records Node 22 choice, two-file workflow design, and Android-only initial build decision

### Manual steps required
```sh
# 1. Create EXPO_TOKEN at expo.dev → Settings → Access Tokens
# 2. Add secret to GitHub repo → Settings → Secrets → EXPO_TOKEN
# 3. Initialize EAS project:
cd application && npx eas-cli build:configure
# Commit the updated app.json (adds projectId), then push
```

### How to verify
- Open a PR → CI workflow fires; lint + type-check + tests must pass
- Merge to master → EAS Build workflow triggers; check expo.dev/builds for APK job

---

## [0.0.3] — 2026-02-27

### Changed (internal)
- Added Prettier (`prettier --check/--write` wired into `npm run lint` / `npm run format`)
- Added Jest via `jest-expo` preset with `@testing-library/react-native`; `npm run test` passes sanity test
- Added `npm run type-check` (`tsc --noEmit`)
- Added husky v9 pre-commit hook: runs lint-staged (ESLint + Prettier) + type-check on staged files
- Added `application/babel.config.js` required by jest-expo transformer
- Created `application/src/__tests__/sanity.test.ts` — baseline test to confirm runner wiring

### How to verify
```sh
cd application && npm install
npm run lint        # ESLint + Prettier check pass
npm run type-check  # zero TypeScript errors
npm run test        # sanity test passes (1 + 1 = 2)
```

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

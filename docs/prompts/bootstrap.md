# RayApp — Bootstrap Specification (Canonical Scope of Truth)

> **This file is the authoritative requirements document.**
> Nothing in the repo should drift from it without an accompanying ADR in `docs/adr/`.

---

## 1. Project Identity

- **App name**: RayApp
- **Owner**: Ray Parkar (personal project)
- **Platforms**: iOS and Android
- **Repo structure**: Monorepo — `application/` (Expo app), `backend/` (future)

---

## 2. v0.1 Feature Scope

The sole user-visible deliverable for v0.1 is a **Profile screen**:

- A photo of Ray Parkar centred on screen
- The title text **"Ray Parkar"** displayed below the photo
- No navigation, no other screens, no data fetching

Everything else is infrastructure (see §4).

---

## 3. Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Expo SDK 54 |
| Runtime | React Native 0.81 |
| Language | TypeScript (strict mode) |
| Router | expo-router v6 |
| React | React 19 |
| Architecture | New Architecture enabled (Fabric + JSI) |
| Backend | None required for v0.1 |

---

## 4. Infrastructure Requirements

This is the primary deliverable of the initial phase.

### 4.1 CI/CD — GitHub Actions + EAS Build

**On every pull request:**
1. Install dependencies (`npm ci`)
2. Run ESLint (`npm run lint`)
3. Run TypeScript type-check (`tsc --noEmit`)
4. Run unit tests (`npm test -- --ci`)

**On merge to `master`:**
1. All PR checks (above)
2. EAS Build — `preview` profile (produces installable `.ipa` / `.apk`)

Tooling: `expo-github-action` for EAS CLI setup; `EXPO_TOKEN` stored as a GitHub Actions secret.

### 4.2 Testing

- **Runner**: Jest (via `jest-expo` preset)
- **Library**: `@testing-library/react-native`
- **Location**: `application/src/**/__tests__/`
- **Coverage target**: Every new component ships with at least a render smoke test

### 4.3 Linting & Formatting

- **Linting**: ESLint — already configured by Expo scaffold
- **Formatting**: Prettier (`.prettierrc` in `application/`) — consistent style, no debates
- Both run as a single `npm run lint` script (ESLint + Prettier check)

### 4.4 TypeScript

- `strict: true` in `application/tsconfig.json`
- No `any` escapes without an explicit comment justifying it

### 4.5 Pre-commit Hooks

- **husky** — manages git hooks
- **lint-staged** — runs on staged files only (fast)
  - `.ts` / `.tsx`: ESLint (auto-fix) + Prettier (write) + `tsc --noEmit`
- Prevents broken code from ever entering the commit history

---

## 5. Quality Standards

Every PR merged to `master` must satisfy:

- [ ] ESLint passes with zero errors
- [ ] TypeScript type-check passes with zero errors
- [ ] All unit tests pass
- [ ] No new `any` without justification comment
- [ ] `docs/STATUS.md` updated if behaviour changed
- [ ] `docs/CHANGELOG.md` appended

---

## 6. Out of Scope for v0.1

The following are explicitly deferred:

- Backend / API (`backend/` directory not yet created)
- Authentication or user accounts
- Navigation beyond a single screen
- Remote data fetching or state management library
- Push notifications
- Analytics or crash reporting
- Dark mode / theming system

---

## 7. Future Extensibility

The application structure must not become an obstacle as the app grows:

- Source code lives under `application/src/`
- Use a **feature-folder pattern**: `application/src/features/<featureName>/`
- Shared primitives go in `application/src/components/` and `application/src/utils/`
- When a backend is introduced, add `backend/` at the repo root (per existing monorepo layout)
- Any deviation from this structure requires an ADR

---

## 8. Backlog / Known Issues

Items flagged during code review that must be resolved before v0.1 ships.

| # | Area | Description | File |
|---|------|-------------|------|
| B-1 | Pre-commit | ~~Husky hook lint-staged globs used `*.{ts,tsx}` — `*` doesn't cross directory boundaries in micromatch, so files in subdirectories were silently skipped.~~ **Fixed**: globs changed to `**/*.{ts,tsx}` and `**/*.{js,json,md}`. | `application/package.json` |
| B-2 | Formatting | ~~`.prettierignore` still references `app-example/` which was deleted in the tooling PR.~~ **Fixed**: stale entry removed. | `application/.prettierignore` |
| B-3 | Docs | ~~CHANGELOG `[0.0.3]` says the pre-commit hook runs type-check "on staged files".~~ **Fixed**: corrected to "runs lint-staged (ESLint + Prettier on staged files) + type-check on every commit". | `docs/CHANGELOG.md` |

---

## 9. Revision History

| Version | Date | Change |
|---------|------|--------|
| 0.1 | 2026-02-27 | Initial bootstrap specification |
| 0.2 | 2026-02-27 | Added §8 Backlog from Copilot review of PR #1 |
| 0.3 | 2026-02-27 | Resolved all §8 backlog items (B-1, B-2, B-3) |

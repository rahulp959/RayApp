# RayApp — Status (Working Memory)

> Keep this file short and current. Update it after every meaningful iteration.
> For navigation to all other docs, see [docs/INDEX.md](INDEX.md).

---

## Current state (2026-02-27)

### What works end-to-end
- Expo scaffold boots on iOS and Android simulators (`npm start`)
- expo-router file-based routing is wired up (`app/_layout.tsx`, `app/index.tsx`)
- ESLint + Prettier run via `npm run lint` / `npm run format`
- Jest runs via `npm run test` (jest-expo preset, sanity test passes)
- TypeScript strict mode (`strict: true`) confirmed + `npm run type-check` wired up
- husky pre-commit hook fires lint-staged + type-check on every commit
- New Architecture (Fabric + JSI) enabled
- React Compiler (auto-memoization) enabled

### What is in progress
- Nothing — tooling foundation is complete

### What does NOT exist yet
- GitHub Actions CI workflow
- EAS Build configuration (`eas.json`)
- `application/src/` feature-folder structure (app still using scaffold layout)
- Profile screen (v0.1 feature — photo + "Ray Parkar" title)
- `backend/` directory

---

## Next 3 priorities

1. **CI/CD** — GitHub Actions (lint + type-check + test on PR; EAS Build on merge)
2. **v0.1 Profile screen** — photo + "Ray Parkar" title, with a smoke test
3. **Backend scaffold** — Fastify API skeleton under `backend/`

---

## Known issues / blockers

| Issue | Location | Notes |
|-------|----------|-------|
| `app/index.tsx` is a blank placeholder | `application/app/index.tsx:3` | Replace with Profile screen in priority 2 |

---

## How to verify the app runs

```sh
cd application
npm install
npm start
# Press 'i' for iOS simulator, 'a' for Android
```

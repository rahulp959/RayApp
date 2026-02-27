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
- GitHub Actions CI workflow runs lint + type-check + tests on every PR and push to master
- EAS Build workflow triggers on successful CI run on master (Android APK, preview profile)
- New Architecture (Fabric + JSI) enabled
- React Compiler (auto-memoization) enabled

### What is in progress
- Nothing — CI/CD foundation is complete (manual EXPO_TOKEN + EAS project init steps remain)

### What does NOT exist yet
- `application/src/` feature-folder structure (app still using scaffold layout)
- Profile screen (v0.1 feature — photo + "Ray Parkar" title)
- `backend/` directory

---

## Next 3 priorities

1. **EAS project init** — `cd application && npx eas-cli build:configure`, add `EXPO_TOKEN` secret to GitHub
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

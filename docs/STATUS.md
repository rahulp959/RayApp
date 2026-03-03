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
- v0.1 Profile screen renders (placeholder avatar + "Ray Parkar" title), with smoke tests
- Feature-folder structure established under `src/features/`
- New Architecture (Fabric + JSI) enabled
- React Compiler (auto-memoization) enabled

### What is in progress
- Nothing

### What does NOT exist yet
- Real profile photo (current screen uses placeholder avatar — swap in `assets/images/profile.jpg`)
- `backend/` directory

---

## Next 3 priorities

1. **Real profile photo** — add `assets/images/profile.jpg` and update `ProfileScreen.tsx`
2. **Backend scaffold** — Fastify API skeleton under `backend/`

---

## Known issues / blockers

| Issue | Location | Notes |
|-------|----------|-------|
| Profile photo is a placeholder circle | `application/src/features/profile/ProfileScreen.tsx:12` | Add `assets/images/profile.jpg` and swap in `<Image>` per comment in file |

---

## How to verify the app runs

```sh
cd application
npm install
npm start
# Press 'i' for iOS simulator, 'a' for Android
```

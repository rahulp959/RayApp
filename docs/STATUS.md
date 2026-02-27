# RayApp — Status (Working Memory)

> Keep this file short and current. Update it after every meaningful iteration.
> For navigation to all other docs, see [docs/INDEX.md](INDEX.md).

---

## Current state (2026-02-27)

### What works end-to-end
- Expo scaffold boots on iOS and Android simulators (`npm start`)
- expo-router file-based routing is wired up (`app/_layout.tsx`, `app/index.tsx`)
- ESLint runs via `npm run lint` (eslint-config-expo)
- New Architecture (Fabric + JSI) enabled
- React Compiler (auto-memoization) enabled

### What is in progress
- Nothing — infrastructure setup is the immediate next priority

### What does NOT exist yet
- `docs/` living docs were just created (this iteration)
- `docs/prompts/bootstrap.md` was just created (this iteration)
- Prettier / consistent formatting config
- Jest + `@testing-library/react-native`
- husky + lint-staged pre-commit hooks
- GitHub Actions CI workflow
- EAS Build configuration (`eas.json`)
- `application/src/` feature-folder structure (app still using scaffold layout)
- Profile screen (v0.1 feature — photo + "Ray Parkar" title)
- `backend/` directory

---

## Next 3 priorities

1. **Tooling foundation** — add Prettier, Jest, husky + lint-staged, TypeScript strict mode
2. **CI/CD** — GitHub Actions (lint + type-check + test on PR; EAS Build on merge)
3. **v0.1 Profile screen** — photo + "Ray Parkar" title, with a smoke test

---

## Known issues / blockers

| Issue | Location | Notes |
|-------|----------|-------|
| `app/index.tsx` is a blank placeholder | `application/app/index.tsx:3` | Replace with Profile screen in priority 3 |
| `app-example/` directory still present | `application/app-example/` | Leftover Expo scaffold demo — safe to delete when cleaning up |
| No `tsconfig.json` strict mode | `application/tsconfig.json` | `strict: true` not yet confirmed; verify before tooling PR |

---

## How to verify the app runs

```sh
cd application
npm install
npm start
# Press 'i' for iOS simulator, 'a' for Android
```

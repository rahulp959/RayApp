# RayApp — Architecture

> High-level component map and data flow.
> For current implementation status see [docs/STATUS.md](STATUS.md).

---

## Component map (v0.1)

```
┌─────────────────────────────────────────────────┐
│                   RayApp (iOS / Android)         │
│                                                 │
│  ┌──────────────────────────────────────────┐   │
│  │          expo-router (file-based)        │   │
│  │                                          │   │
│  │   app/_layout.tsx  ──►  Root layout      │   │
│  │   app/index.tsx    ──►  Profile screen   │   │
│  │                         (photo + name)   │   │
│  └──────────────────────────────────────────┘   │
│                                                 │
│  Runtime:  React 19 + React Native 0.81         │
│  Arch:     New Architecture (Fabric + JSI)      │
│  Compiler: React Compiler (auto-memoization)    │
└─────────────────────────────────────────────────┘

         (no backend, no network calls in v0.1)
```

---

## Planned structure (post-v0.1)

```
application/
├── app/                    # expo-router routes (file = URL)
│   ├── _layout.tsx
│   └── index.tsx           # → renders src/features/profile/ProfileScreen
├── src/
│   ├── features/           # one folder per product feature
│   │   └── profile/
│   │       ├── ProfileScreen.tsx
│   │       └── __tests__/
│   │           └── ProfileScreen.test.tsx
│   ├── components/         # shared primitive components
│   └── utils/              # shared utility functions
└── assets/
    └── images/
```

Route files in `app/` are kept thin — they import and render feature screens from `src/features/`.

---

## Key modules

| Module | Path | Responsibility |
|--------|------|---------------|
| Root layout | `app/_layout.tsx` | Providers, splash screen, font loading |
| Profile screen | `app/index.tsx` → `src/features/profile/` | v0.1 entry screen |
| Expo config | `app.json` | Bundle ID, icons, plugins, feature flags |
| TS config | `tsconfig.json` | Compiler options (strict mode target) |

---

## Runtime assumptions

- **New Architecture**: Fabric renderer and JSI are active (`newArchEnabled: true` in app.json). Avoid bridged (legacy) third-party libraries that are not Fabric-compatible.
- **React Compiler**: Components are auto-memoized. Do not add manual `useMemo`/`useCallback` without a measured reason.
- **Portrait only**: `orientation: "portrait"` in app.json.
- **No backend (v0.1)**: All data is static / local. When a backend is introduced, document it in `docs/API.md` and add an ADR.

---

## Future: backend

When introduced, `backend/` will be a TypeScript + Fastify service at the repo root.
All API contracts will be documented in [docs/API.md](API.md).

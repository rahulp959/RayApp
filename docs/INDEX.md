# RayApp — Documentation Index

> Start here. Every doc in this repo is linked below.
> Open this file first; then follow only the link(s) relevant to your task.

---

## Navigation

| Topic | Doc | Purpose |
|-------|-----|---------|
| **Current state** | [docs/STATUS.md](STATUS.md) | What works, what's in progress, next priorities |
| **Requirements** | [docs/prompts/bootstrap.md](prompts/bootstrap.md) | Canonical scope of truth (do not drift without ADR) |
| **Architecture** | [docs/ARCHITECTURE.md](ARCHITECTURE.md) | Component map, data flow, key modules |
| **API contracts** | [docs/API.md](API.md) | Endpoint specs, message schemas, versioning |
| **Decisions** | [docs/adr/INDEX.md](adr/INDEX.md) | All Architecture Decision Records |
| **Release notes** | [docs/CHANGELOG.md](CHANGELOG.md) | What changed per iteration |

---

## Quick-start (development)

```sh
cd application
npm install
npm start          # Expo dev server (scan QR with Expo Go)
npm run ios        # iOS simulator
npm run android    # Android emulator
npm run lint       # ESLint check
```

---

## Repo layout

```
RayApp/
├── application/          # Expo + React Native app (iOS & Android)
│   ├── app/              # expo-router file-based routes
│   │   ├── _layout.tsx   # Root layout
│   │   └── index.tsx     # Entry screen (Profile)
│   ├── assets/           # Images, fonts
│   ├── app.json          # Expo config
│   ├── package.json
│   └── tsconfig.json
├── backend/              # (future) TypeScript + Fastify API
└── docs/
    ├── INDEX.md          # ← you are here
    ├── STATUS.md
    ├── ARCHITECTURE.md
    ├── API.md
    ├── CHANGELOG.md
    ├── adr/
    │   └── INDEX.md
    └── prompts/
        └── bootstrap.md
```

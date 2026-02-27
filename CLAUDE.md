# Repository Guidelines (Claude)

This file is the _operating manual_ for Claude working in this repo. It defines:

- where the canonical requirements live
- how to keep documentation continuously updated after every iteration
- token discipline + “working memory” rules so the agent does not re-read the whole repo every
  loop

## Canonical Sources

- **Build brief / scope of truth:** `docs/prompts/bootstrap.md` (do not drift from it without
  an ADR).
- **Developer-facing runbook:** `README.md` (must match reality).
- **This file:** `CLAUDE.md` (how we work).

## Project Structure & Module Organization

- `application/` contains the Expo + React Native application built for iOS and Android (`application/`).
- `backend/` contains the Typescript + Fastify API (`backend/src`).
- `docs/` contains the bootstrap prompt and all living docs, indexes, ADRs, and schema notes.

## Build, Test, and Development Commands

- `cd application && npm install` — install frontend application dependencies.
- `cd frontend && npm start` — run Expo in development mode.

## Coding Style & Naming Conventions

- Indentation: 2 spaces.
- File and module names: `lowerCamelCase` (e.g., `dataLoader.ts`).
- Function and variable names: `lowerCamelCase`.
- Class names: `PascalCase`.
- Component names: `PascalCase`.
- Component file names: `PascalCase`.
- If you add tooling (Biome/ESLint/Prettier), document it in `README.md` and add the exact
  commands.

## Testing Guidelines

- Tests should always be added when application behaviour changes:
- Backend tests under `backend/tests/`
- Application tests under `application/` (or `application/src/**/__tests__`)
- Document the commands you actually run in PR descriptions and `docs/CHANGELOG.md`.

---

# Documentation System (keep docs updated every iteration)

## The rule

**Every code change must either:**

1. update existing docs that are now wrong, OR
2. add a new doc/ADR that explains the new behavior/decision, AND
3. update the relevant index so future iterations don’t re-scan the whole repo.

## Required “living docs” (create if missing)

These are intentionally small and index-driven.

### 1) `docs/INDEX.md` (the navigation hub)

Purpose: a single page that points to everything else, so the agent can open _one file_ to
locate the rest.
Minimum sections:

- Current status (link to `docs/STATUS.md`)
- Architecture (link to `docs/ARCHITECTURE.md`)
- API protocol (link to `docs/API.md`)
- ADR index (link to `docs/adr/INDEX.md`)
- Data / persistence (link to `docs/db/INDEX.md` if/when DB exists)
- Release notes (link to `docs/CHANGELOG.md`)

### 2) `docs/STATUS.md` (the working memory)

A short, continuously updated snapshot:

- What works end-to-end right now
- What is in progress
- Next 3 priorities
- Known issues / blockers (with pointers to code paths)
- Quick “how to verify” checklist

### 3) `docs/API.md` (API Contracts)

Keep it aligned with `README.md` and actual server/client code:

- Endpoint(s), reconnect semantics
- Message types (backend→application, application→backend)
- JSON payload schemas + examples
- Versioning notes (if changed, add an ADR and bump a protocol version field)

### 4) `docs/ARCHITECTURE.md` (just enough)

- High-level diagram in text (components + data flow)
- Key modules and responsibilities
- Critical runtime assumptions (Pulse/PipeWire monitor, local STT, etc.)

### 5) `docs/CHANGELOG.md` (release notes steward file)

Append one bullet list per iteration/PR:

- What changed (user-visible)
- What changed (internal)
- How to test

---

# ADRs (Architecture Decision Records)

## When to write an ADR

Write an ADR whenever you:

- choose between meaningful alternatives (libraries, protocols, threading model),
- change the WebSocket protocol,
- change audio capture strategy,
- change persistence strategy (file/DB),
- introduce caching/memory mechanisms,
- make a performance or security tradeoff.

## ADR storage

- Folder: `docs/adr/`
- Index: `docs/adr/INDEX.md`
- Filename: `NNNN-short-title.md` (4-digit, zero-padded)

## ADR template

Create new ADRs using this template:

```md
status: "{proposed | rejected | accepted | deprecated | … | superseded by ADR-NNNN"
date: { YYYY-MM-DD when the decision was last updated }

# ADR NNNN: {short title, representative of solved problem and found solution}

## Context and Problem Statement

{Describe the context and problem statement, e.g., in free form using two to three sentences or in the form of an illustrative story. You may want to articulate the problem in form of a question and add links to collaboration boards or issue management systems.}

## Decision Drivers

- {decision driver 1, e.g., a force, facing concern, …}
- {decision driver 2, e.g., a force, facing concern, …}
- … <!-- numbers of drivers can vary -->

## Considered Options

- {title of option 1}
- {title of option 2}
- {title of option 3}
- … <!-- numbers of options can vary -->

## Decision Outcome

Chosen option: "{title of option 1}", because {justification. e.g., only option, which meets k.o. criterion decision driver | which resolves force {force} | … | comes out best (see below)}.

### Consequences

- Good, because {positive consequence, e.g., improvement of one or more desired qualities, …}
- Bad, because {negative consequence, e.g., compromising one or more desired qualities, …}
- … <!-- numbers of consequences can vary -->

## Pros and Cons of the Options

### {title of option 1}

{example | description | pointer to more information | …}

- Good, because {argument a}
- Good, because {argument b}
<!-- use "neutral" if the given argument weights neither for good nor bad -->
- Neutral, because {argument c}
- Bad, because {argument d}
- … <!-- numbers of pros and cons can vary -->

### {title of other option}

{example | description | pointer to more information | …}

- Good, because {argument a}
- Good, because {argument b}
- Neutral, because {argument c}
- Bad, because {argument d}
- …

## More Information

{You might want to provide additional evidence/confidence for the decision outcome here and/or document the team agreement on the decision and/or define when/how this decision the decision should be realized and if/when it should be re-visited. Links to other decisions and resources might appear here as well.}
```

---

# Data / Database / Tables (only when applicable)

If/when a DB is introduced (SQLite/Postgres/etc.), add:

- `docs/db/INDEX.md` (links)
- `docs/db/SCHEMA.md` (human-readable schema)
- Optional: `docs/db/schema.sql` (authoritative DDL snapshot)

## Table documentation rules

For every table, document:

- purpose
- columns (name, type, nullable, default)
- indexes + why they exist
- foreign keys / relationships
- migration notes (if changed)
  Suggested per-table stub:

```md
## <table_name>

Purpose: …
Columns:

- id (INTEGER, PK) — …
- …
  Indexes:
- idx\_<...> — …
  Notes:
- …
```

---

# Token Discipline (do not waste context)

## Principle

**Never re-read large docs or many files by default.** Use the indexes and small “memory” docs.

## Default read order (per iteration)

1. `docs/INDEX.md`
2. `docs/STATUS.md`
3. Only the specific doc(s) linked by the index that are relevant to the current task
4. Only then open code files needed for the change

## Practical rules

- Prefer _one_ authoritative doc over duplicating content across files.
- Keep docs short; link out instead of copying blocks of text.
- When changing a contract (API/messages/CLI flags), update the doc _in the same commit_.
- Avoid “wall-of-text” logs; if you need a log, create a dated note under `docs/notes/YYYY-MM-
DD.md` and link it from `docs/STATUS.md`.

## “Index first” rule

Whenever you create or rename a doc, immediately update:

- `docs/INDEX.md`, and
- any relevant sub-index (`docs/adr/INDEX.md`, `docs/db/INDEX.md`).

---

# Memory Rules (agent working state)

## Where “memory” lives

The agent’s durable memory is the repo itself, specifically:

- `docs/STATUS.md` (current state)
- `docs/INDEX.md` (navigation)
- ADRs (decisions + why)
- `docs/CHANGELOG.md` (what changed)

## What must be written after each iteration

At the end of every meaningful iteration (feature/bugfix/refactor that changes behavior), do
all of:

- Update `docs/STATUS.md` (what works, what changed, what’s next)
- Append to `docs/CHANGELOG.md`
- If a decision was made: add/update an ADR + update `docs/adr/INDEX.md`
- If API changed: update `docs/API.md` + update `README.md` if it documents the same info

---

# Roles (Agents)

- **Documentation Lead**
- Owns `README.md`, `docs/INDEX.md`, and `docs/STATUS.md`.
- Ensures alignment with `docs/prompts/bootstrap.md`.
- **Backend Docs Writer**
- Owns `docs/API.md` backend→frontend + frontend→backend message schemas.
- Documents audio capture prerequisites and error modes.
- **Frontend Docs Writer**
- Documents Electron dev workflow, UI behavior, and WS client usage.
- Keeps `frontend/README.md` accurate if it exists.
- **ADR Steward**
- Owns `docs/adr/INDEX.md` and ensures every major choice is captured.
- **Release Notes Steward**
- Owns `docs/CHANGELOG.md` and PR “how to test” notes.

---

# Commit & Pull Request Guidelines

- Use clear, imperative commit messages.
- PRs should include:
- Summary of changes
- Testing notes (commands + results)
- Screenshots/logs when UI/output changes are visible
- Doc updates checklist (links to updated docs)

## Doc updates checklist (paste into PRs)

- [ ] `docs/STATUS.md` updated
- [ ] `docs/CHANGELOG.md` appended
- [ ] `docs/API.md` updated (if protocol changed)
- [ ] `README.md` updated (if setup/run changed)
- [ ] ADR added/updated (if a decision was made)
- [ ] `docs/INDEX.md` updated (if any doc added/renamed)

---

# Configuration Tips

- None as of yet.

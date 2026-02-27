# ADR Index

> All Architecture Decision Records for RayApp.
> Add a row here whenever a new ADR is created.
> See CLAUDE.md for the ADR template.

---

## Records

| # | Title | Status | Date |
|---|-------|--------|------|
| [0001](0001-ci-cd-pipeline.md) | CI/CD Pipeline — GitHub Actions + EAS Build | accepted | 2026-02-27 |

---

## When to write an ADR

Write one whenever you:

- Choose between meaningful alternatives (libraries, protocols, patterns)
- Change the API / WebSocket protocol
- Change the navigation or state management strategy
- Change the build or CI/CD pipeline
- Introduce a persistence layer (SQLite, Postgres, etc.)
- Make a performance or security trade-off

## Filename convention

`docs/adr/NNNN-short-title.md` — four-digit, zero-padded (e.g. `0001-router-choice.md`)

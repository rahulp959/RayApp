# RayApp — API Contracts

> This file documents all client↔backend communication contracts.
> For navigation see [docs/INDEX.md](INDEX.md).

---

## v0.1 Status

**No backend exists in v0.1.** The Profile screen is fully static — no network calls.

This file is a placeholder. Populate it when the first API endpoint is introduced, and add an
ADR documenting the protocol choice (REST, GraphQL, WebSocket, etc.).

---

## Template (fill in when backend is created)

### Base URL

```
Development:  http://localhost:3000
Production:   TBD
```

### Versioning

All routes are prefixed with `/v1/`. Breaking changes increment the version and require a new
ADR.

---

### Endpoints

#### `GET /v1/health`

Liveness check.

**Response `200`**
```json
{ "status": "ok" }
```

---

## Message schemas (WebSocket — if applicable)

_Document here if real-time transport is introduced._

---

## Changelog

| Version | Date | Change |
|---------|------|--------|
| — | — | No API yet (v0.1 is static) |

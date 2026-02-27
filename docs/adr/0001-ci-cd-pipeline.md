status: "accepted"
date: 2026-02-27

# ADR 0001: CI/CD Pipeline — GitHub Actions + EAS Build

## Context and Problem Statement

RayApp has a complete local tooling foundation (ESLint, Prettier, TypeScript strict mode, Jest,
husky pre-commit hook) but no automated quality gate on pull requests or automated build on
merge to master. The bootstrap spec (§4.1) requires:

- Every PR: lint + type-check + tests must pass before merge
- Every merge to master: same checks, then an EAS Build (`preview` profile → APK)

Three sub-decisions were not explicit in the bootstrap spec and are recorded here.

---

## Decision 1: Node version

### Considered Options

- Node 20 (LTS "Iron")
- **Node 22 (LTS "Jod")** ← chosen
- Node 24 (Current)

### Decision Outcome

Chosen option: **Node 22**, because it is the Active LTS release through April 2027, satisfies
React Native 0.81's `engines` minimum of `>= 20.19.4`, and is more stable in CI environments
than the Current release line (Node 24).

### Consequences

- Good, because Active LTS guarantees security patches and no breaking changes through April 2027
- Good, because Node 22 ships native `fetch` and `--watch` mode used in local dev
- Neutral, because Node 20 would also satisfy the RN minimum; switch to 22 is forward-looking
- Bad, because if Node 22 introduces a breaking edge case for a dependency, we'd need to pin lower

---

## Decision 2: One workflow file vs. two

### Considered Options

- **Two files**: `ci.yml` (quality gate) + `build.yml` (EAS Build) ← chosen
- One combined file with a matrix or job dependency

### Decision Outcome

Chosen option: **Two files**, because the `workflow_run` trigger in `build.yml` creates an
explicit, auditable dependency chain: the EAS Build can only start after the `CI` workflow
completes successfully on the `master` branch. A single file would require complex `if:`
conditions to achieve the same guard, and would mix concerns that have different trigger sets.

### Consequences

- Good, because `build.yml` can be triggered or re-run independently of `ci.yml`
- Good, because the quality gate (`ci.yml`) runs on every PR without EAS credentials being needed
- Good, because the separation makes it obvious what each file is responsible for
- Bad, because `ci.yml` must also run on `push: branches: [master]` (not just PRs) to give
  `workflow_run` a completed run to react to — this is a subtle requirement documented in the
  workflow comments

---

## Decision 3: Android-only for the initial `preview` profile

### Considered Options

- Android only ← chosen
- iOS only
- Both platforms simultaneously

### Decision Outcome

Chosen option: **Android only**, because Android builds do not require Apple credentials
(provisioning profiles, certificates, or Apple Developer team membership). This unblocks
automated preview builds immediately. iOS will be added when physical test devices are
registered and Apple credentials are available.

### Consequences

- Good, because no Apple Developer account or credential setup is required in CI
- Good, because Android produces a directly installable `.apk` artifact (no TestFlight needed)
- Good, because EAS Build supports adding iOS later with a profile change + credential setup
- Bad, because iOS-specific layout/rendering differences will not be caught in CI until iOS is added

---

## Manual Setup Steps (required after merging)

These are one-time steps that must be done by a human with access to the Expo account and
GitHub repository settings.

1. **Create Expo personal access token**
   - Go to expo.dev → Account → Settings → Access Tokens
   - Create a token with "robot" or personal scope

2. **Add `EXPO_TOKEN` secret to GitHub**
   - GitHub repo → Settings → Secrets and variables → Actions → New repository secret
   - Name: `EXPO_TOKEN`, Value: the token from step 1

3. **Initialize EAS project locally**
   ```sh
   cd application
   npx eas-cli build:configure
   ```
   This adds a `projectId` to `app.json`. Commit and push the updated `app.json`.

4. **Verify first build**
   - Merge any commit to master (after CI passes)
   - Check expo.dev/builds — the APK job should appear within ~1 minute

status: "accepted"
date: 2026-03-04

# ADR 0002: iOS Distribution — TestFlight via EAS Managed Credentials

## Context and Problem Statement

The initial CI/CD pipeline (ADR 0001) built Android APKs only, deferring iOS due to Apple
credential complexity. With an active Apple Developer account available, iOS distribution
needs to be added to the `preview` EAS Build profile.

## Decision Drivers

- Active Apple Developer account is available
- Want over-the-air distribution to testers without requiring device UDID registration
- Prefer minimal credential management overhead in CI

## Considered Options

- TestFlight (`distribution: "store"`, EAS managed credentials)
- Ad Hoc (`distribution: "internal"`, requires registered device UDIDs)
- Simulator builds only (no credentials, `.app` bundle, not installable on real devices)

## Decision Outcome

Chosen option: **TestFlight with EAS managed credentials**, because it supports unlimited
testers without UDID registration, EAS handles the Distribution Certificate and Provisioning
Profile automatically, and it mirrors how App Store releases will eventually work.

### Consequences

- Good, because no manual certificate management — EAS renews credentials automatically
- Good, because testers install via TestFlight without registering their devices
- Good, because the same profile can be promoted to a production release later
- Bad, because Apple review of TestFlight builds adds a short delay (~1 hour) before testers can install
- Bad, because requires App Store Connect app entry to exist before first build

## Manual Setup Steps (required once)

1. **Create app in App Store Connect**
   - Go to appstoreconnect.apple.com → Apps → `+` → New App
   - Bundle ID: `com.rbcdigital.rayapp`
   - Name: RayApp

2. **Provision iOS credentials in EAS**
   ```sh
   cd application && npx eas-cli credentials --platform ios
   ```
   EAS will create and store a Distribution Certificate + App Store Provisioning Profile.

3. **Verify first build**
   - Merge any commit to master → check expo.dev/builds for the iOS job
   - Once built, submit to TestFlight: `npx eas-cli submit --platform ios --latest`

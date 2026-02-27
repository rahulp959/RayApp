# Screenshots

Visual snapshots committed alongside the features they document.

## Capture workflow

1. Launch the app in the iOS simulator: `cd application && npm run ios`
2. Navigate to the screen you want to capture.
3. Run `npm run screenshot` — this writes `docs/screenshots/latest.png`.
4. Rename `latest.png` to the versioned filename (see convention below) before committing.

## Filename convention

```
vX.Y.Z-<feature-slug>.png
```

Examples:
- `v0.1.0-profile-screen.png`
- `v0.2.0-home-feed.png`

## Resolution

Captures at the default iPhone 17 Pro simulator resolution. No scaling or cropping needed.

## Committing

Include renamed screenshots in the same PR as the feature they document.
Reference them in `docs/CHANGELOG.md` and PR descriptions using relative Markdown image syntax:

```markdown
![Profile screen](screenshots/v0.1.0-profile-screen.png)
```

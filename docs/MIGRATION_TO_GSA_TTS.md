# Migration Guide: @jeffkeene-gsa → @gsa-tts

> **Date:** June 29, 2026  
> **Version:** 1.0.0  
> **Status:** Active

---

## Overview

The `svelte-ui-uswds` package has migrated from the personal npm scope (`@jeffkeene-gsa`) to the **official GSA-TTS organization** (`@gsa-tts`).

**Old package (deprecated):** `@jeffkeene-gsa/svelte-ui-uswds`  
**New package:** `@gsa-tts/svelte-ui-uswds`

---

## Why This Change?

Moving to the official GSA-TTS organization provides:

- ✅ **Better governance** - Official organizational ownership
- ✅ **Improved security** - Organization-level access controls
- ✅ **Long-term sustainability** - Not tied to individual accounts
- ✅ **Trust signals** - Official GSA-TTS branding
- ✅ **Team collaboration** - Multiple maintainers can publish

---

## For End Users

### Step 1: Uninstall Old Package

```bash
npm uninstall @jeffkeene-gsa/svelte-ui-uswds
```

### Step 2: Install New Package

```bash
npm install @gsa-tts/svelte-ui-uswds
```

### Step 3: Update package.json

Your `package.json` should now reference the new package:

```json
{
  "dependencies": {
    "@gsa-tts/svelte-ui-uswds": "^1.0.0",
    "@uswds/uswds": "^3.13.0",
    "svelte": "^5.56.1"
  }
}
```

### Step 4: No Code Changes Required

**Good news:** Your imports remain the same! No code changes needed.

```svelte
<script>
  // ✅ This still works - no changes required
  import { Button } from '@gsa-tts/svelte-ui-uswds';
</script>

<Button>Click me</Button>
```

Only the package name in `package.json` changes.

---

## Breaking Changes in v1.0.0

### Package Name Change

- **Before:** `@jeffkeene-gsa/svelte-ui-uswds`
- **After:** `@gsa-tts/svelte-ui-uswds`

### What Stayed the Same

- ✅ All component APIs - no changes
- ✅ All component exports - no changes
- ✅ Import syntax - no changes (just package name)
- ✅ USWDS version compatibility - unchanged
- ✅ Svelte version compatibility - unchanged
- ✅ Accessibility features - unchanged
- ✅ Styling and theming - unchanged

**Result:** This is a **non-breaking change** at the code level. Only the dependency name changes.

---

## Installation Examples

### Stable Release (Recommended)

```bash
npm install @gsa-tts/svelte-ui-uswds @uswds/uswds
```

### Alpha Releases (Latest Features)

```bash
npm install @gsa-tts/svelte-ui-uswds@alpha @uswds/uswds
```

### Specific Version

```bash
npm install @gsa-tts/svelte-ui-uswds@1.0.0 @uswds/uswds
```

---

## Verification

After migration, verify the installation:

```bash
# Check installed version
npm list @gsa-tts/svelte-ui-uswds

# Should output something like:
# └── @gsa-tts/svelte-ui-uswds@1.0.0

# Verify old package is removed
npm list @jeffkeene-gsa/svelte-ui-uswds

# Should output:
# └── (empty)
```

---

## What Happens to the Old Package?

The old package (`@jeffkeene-gsa/svelte-ui-uswds`) has been **deprecated** with a warning:

```
npm WARN deprecated @jeffkeene-gsa/svelte-ui-uswds: This package has moved to @gsa-tts/svelte-ui-uswds
```

- ⚠️ Installing the old package shows a deprecation warning
- ⚠️ npm website displays a deprecation banner
- ✅ Old package remains installable (not deleted)
- ✅ Existing installations continue to work
- ❌ No new versions will be published to old package

**Recommendation:** Migrate to the new package as soon as possible.

---

## Timeline

| Date          | Event                                                       |
| ------------- | ----------------------------------------------------------- |
| June 17, 2026 | First version of `@jeffkeene-gsa/svelte-ui-uswds` published |
| June 25, 2026 | Last version (0.2.0) published to old package               |
| June 29, 2026 | Migration to `@gsa-tts/svelte-ui-uswds` v1.0.0              |
| June 29, 2026 | Old package deprecated with warning                         |

---

## Troubleshooting

### Issue: Old package still installed

**Symptom:**

```bash
npm list @jeffkeene-gsa/svelte-ui-uswds
# Shows: @jeffkeene-gsa/svelte-ui-uswds@0.2.0
```

**Solution:**

```bash
npm uninstall @jeffkeene-gsa/svelte-ui-uswds
npm install @gsa-tts/svelte-ui-uswds
rm -rf node_modules package-lock.json
npm install
```

---

### Issue: Import errors after migration

**Symptom:**

```
Error: Cannot find module '@jeffkeene-gsa/svelte-ui-uswds'
```

**Solution:**

Check if you have any hardcoded imports or references to the old package name:

```bash
# Search for old package references
grep -r "@jeffkeene-gsa/svelte-ui-uswds" src/

# Should find nothing after migration
```

If found, update them to `@gsa-tts/svelte-ui-uswds`.

---

### Issue: Dependency conflicts

**Symptom:**

```
npm ERR! ERESOLVE unable to resolve dependency tree
```

**Solution:**

Clear npm cache and reinstall:

```bash
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

---

### Issue: CI/CD pipeline failures

**Symptom:** Build fails with "package not found"

**Solution:**

Update your CI/CD configuration files:

1. Update `package.json` in repository
2. Update lock files (`package-lock.json`, `yarn.lock`, `pnpm-lock.yaml`)
3. Clear CI cache if applicable
4. Re-run pipeline

---

## Support

### Questions or Issues?

- **GitHub Issues:** https://github.com/GSA-TTS/svelte-ui/issues
- **GitHub Discussions:** https://github.com/GSA-TTS/svelte-ui/discussions
- **npm Package:** https://www.npmjs.com/package/@gsa-tts/svelte-ui-uswds
- **Documentation:** https://svelte-ui-library.app.cloud.gov

### Found a Bug?

Please report it at: https://github.com/GSA-TTS/svelte-ui/issues/new

---

## Additional Resources

- **Release Notes:** [v1.0.0 Release](https://github.com/GSA-TTS/svelte-ui/releases/tag/v1.0.0)
- **Changelog:** [CHANGELOG.md](../CHANGELOG.md)
- **Installation Guide:** [docs/INSTALLATION.md](./INSTALLATION.md)
- **Contributing Guide:** [CONTRIBUTING.md](../CONTRIBUTING.md)

---

## For Package Maintainers

If you're a maintainer of a package that depends on `@jeffkeene-gsa/svelte-ui-uswds`:

1. Update your `package.json` `dependencies` or `peerDependencies`
2. Update documentation and examples
3. Publish a new version with the updated dependency
4. Notify your users of the change

---

**Thank you for using Svelte UI!** 🎉

This migration ensures the long-term health and sustainability of the project under the official GSA-TTS organization.

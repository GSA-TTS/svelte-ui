# Version Management

## Semver Strategy

This library follows [Semantic Versioning 2.0.0](https://semver.org/).

## USWDS Compatibility

| svelte-ui Version | USWDS Version | Svelte Version | Status      |
| ----------------- | ------------- | -------------- | ----------- |
| 0.x               | ^3.13.0       | ^5.56.1        | Development |
| 1.x (planned)     | ^3.13.0       | ^5.56.1        | Stable      |
| 2.x (planned)     | ^4.0.0        | ^5.x or ^6.x   | Future      |

### Version Range Explanation

- `^3.13.0` means: Compatible with 3.13.0, 3.14.0, 3.15.0, etc. (NOT 4.0.0)
- `^5.56.1` means: Compatible with 5.56.1, 5.57.0, 5.58.0, etc. (NOT 6.0.0)
- We allow minor and patch updates within the same major version
- Major version updates (USWDS 4.x or Svelte 6.x) will require a svelte-ui major version bump

## Update Policy

### USWDS Updates

- **Patch updates (3.13.1):** Automatically compatible - install and use
- **Minor updates (3.14.0):** Should be compatible - test before deploying
- **Major updates (4.0.0):** Requires new svelte-ui major version (breaking change)

When USWDS releases a major version, we will:

1. Evaluate compatibility with existing components
2. Create new major version of svelte-ui (e.g., 2.0.0)
3. Update peer dependency requirement
4. Document migration path in CHANGELOG

### Svelte Updates

- **Patch updates (5.56.2):** Automatically compatible - install and use
- **Minor updates (5.57.0):** Should be compatible - test before deploying
- **Major updates (6.0.0):** Requires new svelte-ui major version (breaking change)

## Testing New Versions

Before upgrading USWDS or Svelte in your project:

1. Check the release changelog:
   - [USWDS releases](https://github.com/uswds/uswds/releases)
   - [Svelte releases](https://github.com/sveltejs/svelte/releases)

2. Test in a development environment first

3. Run your application's test suite

4. Verify components render and behave correctly

5. Check for console warnings or errors

## Reporting Compatibility Issues

If you encounter issues with a specific USWDS or Svelte version within the supported range:

1. [Open an issue](https://github.com/gsa/svelte-ui/issues/new) on GitHub
2. Include:
   - svelte-ui version
   - USWDS version
   - Svelte version
   - Description of the issue
   - Steps to reproduce
   - Browser/environment details

## Version Support Policy

We support:

- **Current major version:** Full support with bug fixes and new features
- **Previous major version:** Security fixes only for 6 months after new major release
- **Older versions:** No support - please upgrade

## Upgrading Between Major Versions

When svelte-ui releases a new major version (e.g., 1.x → 2.x):

1. Review the CHANGELOG for breaking changes
2. Check the migration guide (will be provided in release notes)
3. Update peer dependencies as documented
4. Test thoroughly in development
5. Deploy to production after validation

## Pre-release Versions

Pre-release versions follow [Semantic Versioning 2.0.0](https://semver.org/) pre-release format: `<major>.<minor>.<patch>-<identifier>.<number>`

### Pre-release Identifiers

We use three pre-release identifiers in order of stability:

| Identifier | Purpose                          | When to Use                                       |
| ---------- | -------------------------------- | ------------------------------------------------- |
| **alpha**  | Early testing, unstable          | New major features, breaking changes being tested |
| **beta**   | Feature complete, may have bugs  | Ready for broader testing, preparing for release  |
| **rc**     | Release candidate, final testing | Almost ready for stable release, final validation |

### Pre-release Version Format

Examples:

- `1.0.0-alpha.0` - First alpha release
- `1.0.0-alpha.1` - Second alpha release
- `1.0.0-beta.0` - First beta release
- `1.0.0-beta.1` - Second beta release
- `1.0.0-rc.0` - First release candidate
- `1.0.0` - Stable release

### Creating Pre-releases

**Create first alpha release:**

```bash
npm run release:alpha
git push --follow-tags origin main
npm run publish:alpha
```

**Bump existing pre-release:**

```bash
npm run release -- --prerelease
git push --follow-tags origin main
npm run publish:alpha  # Or beta/rc depending on current pre-release
```

**Move to beta:**

```bash
npm run release:beta
git push --follow-tags origin main
npm run publish:beta
```

**Move to release candidate:**

```bash
npm run release:rc
git push --follow-tags origin main
npm run publish:rc
```

**Graduate to stable:**

```bash
npm run release
git push --follow-tags origin main
npm publish  # No --tag flag, becomes "latest"
```

### Installing Pre-releases

Users can install pre-releases explicitly:

```bash
# Install latest stable (default)
npm install svelte-ui

# Install latest alpha
npm install svelte-ui@alpha

# Install specific pre-release version
npm install svelte-ui@1.0.0-alpha.1

# Install latest beta
npm install svelte-ui@beta

# Install latest release candidate
npm install svelte-ui@rc
```

### Pre-release Workflow Example

**Scenario:** Testing a major version before stable release

```bash
# 1. Create first alpha
npm run release:alpha
git push --follow-tags origin main
npm run publish:alpha
# Result: 1.0.0-alpha.0

# 2. Make fixes and bump alpha
npm run release -- --prerelease
git push --follow-tags origin main
npm run publish:alpha
# Result: 1.0.0-alpha.1

# 3. Ready for broader testing
npm run release:beta
git push --follow-tags origin main
npm run publish:beta
# Result: 1.0.0-beta.0

# 4. Final testing before release
npm run release:rc
git push --follow-tags origin main
npm run publish:rc
# Result: 1.0.0-rc.0

# 5. Graduate to stable
npm run release
git push --follow-tags origin main
npm publish
# Result: 1.0.0
```

### Pre-release Best Practices

**For government/GSA projects:**

1. **Alpha** - Internal testing only
   - Use for ATO test environments
   - Breaking changes expected
   - Not recommended for production use

2. **Beta** - Stakeholder review
   - Use for agency testing and feedback
   - Feature complete but may have bugs
   - Suitable for staging environments

3. **RC** - Final validation
   - Use for compliance validation
   - Security team review
   - Final testing before production deployment

### Viewing Available Versions

Check all available versions and tags:

```bash
npm dist-tag ls svelte-ui
```

Output example:

```
latest: 0.1.0
alpha: 1.0.0-alpha.3
beta: 1.0.0-beta.1
rc: 1.0.0-rc.0
```

### Pre-release Support Policy

- **Alpha versions:** No support, use at your own risk
- **Beta versions:** Bug reports accepted, breaking changes possible
- **RC versions:** Bug reports accepted, no breaking changes
- **Stable versions:** Full support per Version Support Policy above

## USWDS Asset Versioning

This library does not bundle USWDS assets (fonts, icons, images). When updating USWDS:

1. Update the CDN URL if using CDN delivery
2. Update local assets if self-hosting
3. Clear browser caches after deployment

See [INSTALLATION.md](./INSTALLATION.md) for asset configuration details.

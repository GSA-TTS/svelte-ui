# Release Troubleshooting Guide

> **Part of:** [Release Process Guide](./RELEASE_PROCESS.md)  
> **Purpose:** Common issues and solutions for release process

---

## Table of Contents

1. [Workflow Failures](#workflow-failures)
2. [Version Conflicts](#version-conflicts)
3. [npm Authentication Issues](#npm-authentication-issues)
4. [Tag Issues](#tag-issues)
5. [CI Check Failures](#ci-check-failures)

---

## Workflow Failures

### Tests Failing in Publish Workflow

**Symptom:** Workflow fails at "Run tests" step

**Causes:**

- Tests pass locally but fail in CI
- Environment differences
- Flaky tests

**Solution:**

```bash
# Run tests locally exactly as CI does
npm ci  # Clean install
npm test

# If tests pass locally:
# 1. Check workflow logs for specific failure
# 2. May be flaky test - re-run workflow
# 3. If persists, fix test and create new release
```

**Prevention:**

- Always run full test suite before creating release PR
- Fix flaky tests immediately

---

### Build Failing in Publish Workflow

**Symptom:** Workflow fails at "Build package" step

**Causes:**

- Build works locally but fails in CI
- Missing dependencies
- TypeScript errors

**Solution:**

```bash
# Clean build locally
rm -rf dist node_modules
npm ci
npm run build

# Check for errors
npm run type-check
npm run check
```

**If build passes locally:**

1. Check workflow logs for specific error
2. May be environment issue
3. Re-run workflow
4. If persists, investigate CI environment

---

### Publish Failing with 403 Forbidden

**Symptom:** Workflow fails at "Publish to npm" with 403 error

**Causes:**

- npm Trusted Publishing not configured correctly
- Workflow file path doesn't match npm configuration
- Package name/scope permissions issue

**Solution:**

**Check 1: Verify npm Trusted Publishing configuration**

1. Go to: https://www.npmjs.com/package/@jeffkeene-gsa/svelte-ui-uswds/access
2. Check "Trusted Publishers" section
3. Verify:
   - Repository: `GSA-TTS/svelte-ui`
   - Workflow: `.github/workflows/publish.yml`
   - Status: Active

**Check 2: Verify workflow file path**

```bash
# Confirm workflow file exists at exact path
ls -la .github/workflows/publish.yml
```

**Check 3: Verify scope permissions**

- Go to: https://www.npmjs.com/settings/@jeffkeene-gsa/packages
- Confirm you have publish access to scope

**If still failing:**

- Check workflow logs for detailed error message
- Verify package name in package.json matches npm configuration

---

### Publish Failing with Version Already Exists

**Symptom:** `npm ERR! 403 You cannot publish over the previously published versions`

**Cause:**

- Version already published to npm
- Forgot to bump version before release
- Tag reused from previous release

**Solution:**

```bash
# Check what versions exist on npm
npm view @jeffkeene-gsa/svelte-ui-uswds versions

# If version exists, you must bump to next version
# Delete the GitHub Release (doesn't delete tag)
# Delete the tag locally and remotely
git tag -d v0.3.0-alpha.0
git push origin :refs/tags/v0.3.0-alpha.0

# Create new release with bumped version
git checkout release/v0.3.0-alpha
npm run release:alpha  # Will bump to 0.3.0-alpha.1
git push origin release/v0.3.0-alpha
git push origin v0.3.0-alpha.1

# Update the release PR
# Merge and create new GitHub Release
```

**Prevention:**

- Always check npm for existing versions before releasing
- Use standard-version to auto-increment prerelease versions

---

## Version Conflicts

### package.json Version Doesn't Match Tag

**Symptom:** Workflow fails at "Verify package.json version matches tag"

**Cause:**

- Manual version edit in package.json
- Tag created manually instead of by standard-version
- Mismatch between git tag and package version

**Solution:**

```bash
# Check current package version
node -p "require('./package.json').version"

# Check git tags
git tag --list | tail -5

# If mismatch, delete tag and recreate
git tag -d vX.Y.Z
npm run release:alpha  # Or appropriate release command
git push origin release/branch-name
git push origin vX.Y.Z
```

**Prevention:**

- Always use `npm run release:*` commands
- Never manually edit version in package.json
- Never manually create version tags

---

### CHANGELOG.md Not Updated

**Symptom:** CHANGELOG.md doesn't have new version section

**Cause:**

- No commits since last release using conventional commits format
- standard-version didn't detect changes
- CHANGELOG was manually edited incorrectly

**Solution:**

```bash
# Check commits since last release
git log v0.2.0-alpha.1..HEAD --oneline

# If commits exist but CHANGELOG not updated:
# Manually run standard-version with debug
npm run release:alpha -- --dry-run

# Check commit message format
# Must follow: type(scope): description
# Examples:
#   feat: add new component
#   fix: correct button styling
#   docs: update readme
```

**Prevention:**

- Use conventional commit format for all commits
- Use commit linter (commitlint) to enforce format

---

## npm Authentication Issues

### OIDC Token Failure

**Symptom:** Workflow fails with "Failed to get OIDC token" or similar

**Cause:**

- GitHub OIDC configuration issue
- Workflow permissions incorrect
- npm Trusted Publishing not properly configured

**Solution:**

**Check 1: Workflow permissions**

```yaml
# In .github/workflows/publish.yml
permissions:
  contents: read
  id-token: write # REQUIRED for OIDC
  issues: write
```

**Check 2: npm Trusted Publishing**

1. Go to npm package settings
2. Verify Trusted Publishing is configured
3. Verify repository and workflow path match exactly

**Check 3: Re-run workflow**

- Sometimes transient OIDC issues resolve on retry

---

## Tag Issues

### Tag Already Exists

**Symptom:** `fatal: tag 'vX.Y.Z' already exists`

**Cause:**

- Previous release attempt with same version
- Tag not cleaned up from failed release

**Solution:**

```bash
# List existing tags
git tag --list | grep vX.Y.Z

# Delete local tag
git tag -d vX.Y.Z

# Delete remote tag (if pushed)
git push origin :refs/tags/vX.Y.Z

# Run release command again
npm run release:alpha
```

**Warning:** Only delete tags that haven't been published to npm. Check npm first:

```bash
npm view @jeffkeene-gsa/svelte-ui-uswds versions
```

---

### Tag Not Found on GitHub

**Symptom:** Tag doesn't appear in "Choose a tag" dropdown when creating release

**Cause:**

- Tag wasn't pushed to remote
- Tag push failed
- GitHub UI not refreshed

**Solution:**

```bash
# Check if tag exists locally
git tag --list | grep vX.Y.Z

# If exists locally but not on remote, push it
git push origin vX.Y.Z

# Refresh GitHub page
# Tag should appear in dropdown
```

---

## CI Check Failures

### Lint Errors in Release PR

**Symptom:** CI fails on lint check

**Solution:**

```bash
# Run lint locally
npm run lint

# Auto-fix what's possible
npm run format

# Commit fixes
git add .
git commit -m "style: fix linting issues"
git push origin release/branch-name
```

---

### Type Check Errors

**Symptom:** CI fails on type-check

**Solution:**

```bash
# Run type check locally
npm run type-check

# Fix errors
# Then commit and push
git add .
git commit -m "fix: resolve type errors"
git push origin release/branch-name
```

---

## Emergency Procedures

### GitHub Actions is Down

**Symptom:** All workflows failing, GitHub status page shows outage

**Workaround:** Wait for GitHub to recover. With current security settings (tokens disallowed), you cannot publish manually without temporarily changing npm settings.

**If absolutely critical:**

1. Go to npm package settings
2. Temporarily change publishing access to allow tokens
3. Create granular token
4. Publish manually: `npm publish --provenance --access public --tag alpha`
5. Revert npm settings to disallow tokens
6. Delete the token

**Better approach:** Wait for GitHub Actions to recover (most outages are < 30 minutes)

---

### Need to Unpublish Version

**Symptom:** Published version has critical bug

**Within 72 hours:**

```bash
npm unpublish @jeffkeene-gsa/svelte-ui-uswds@X.Y.Z
```

**After 72 hours (unpublish blocked):**

```bash
# Deprecate the version
npm deprecate @jeffkeene-gsa/svelte-ui-uswds@X.Y.Z "Critical bug, use X.Y.Z+1 instead"
```

**Then immediately:**

1. Fix the bug
2. Create hotfix release with bumped version
3. Announce the fix

---

## Getting Help

If you encounter an issue not covered here:

1. **Check workflow logs:** Full error details are in Actions logs
2. **Search GitHub Issues:** May be known issue with solution
3. **Check npm status:** https://status.npmjs.org
4. **Check GitHub status:** https://www.githubstatus.com
5. **Contact maintainers:** Open issue with full error details

---

**Related Documentation:**

- [Release Process Guide](./RELEASE_PROCESS.md)
- [Rollback Procedures](./RELEASE_PROCESS.md#rollback-procedures)
- [FAQ](./RELEASE_PROCESS.md#faq)

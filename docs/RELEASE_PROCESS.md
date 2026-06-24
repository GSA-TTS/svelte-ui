# Release Process Guide

> **Audience:** Repository maintainers with publish access  
> **Purpose:** Step-by-step guide for creating and publishing releases  
> **Last Updated:** 2026-06-24

---

## Table of Contents

1. [Overview](#overview)
2. [Prerequisites](#prerequisites)
3. [Release Types](#release-types)
4. [Step-by-Step Process](#step-by-step-process)
5. [GitHub Release Creation](#github-release-creation)
6. [Verification](#verification)
7. [Troubleshooting](#troubleshooting)
8. [Rollback Procedures](#rollback-procedures)
9. [FAQ](#faq)

---

## Overview

This guide documents the automated npm publishing process for `@jeffkeene-gsa/svelte-ui-uswds`.

### Process Summary

```
Create Release Branch → Run standard-version → Create Release PR →
Merge PR → Create GitHub Release → Automation Publishes to npm ✨
```

### Timeline

- **Release PR Creation:** ~10 minutes
- **PR Review & Merge:** ~15-30 minutes (depends on team availability)
- **GitHub Release Creation:** ~2-3 minutes
- **Automated Publishing:** ~5 minutes
- **Total:** ~30-50 minutes per release

### Key Points

- ✅ Publishing is **fully automated** via GitHub Actions
- ✅ Uses **npm Trusted Publishing** (OIDC) - no manual tokens needed
- ✅ **Manual trigger:** Creating a GitHub Release (your control point)
- ✅ **Full CI testing** runs before every publish
- ✅ **npm provenance** attestation generated automatically
- ✅ **Protected branch:** Release PRs require approval

---

## Prerequisites

### Required Access

- [ ] npm account with publish access to `@jeffkeene-gsa` scope
- [ ] GitHub repository maintainer access (can approve PRs)
- [ ] Git configured with GitHub authentication

### Local Environment

- [ ] Node.js 24.x or higher
- [ ] npm 10.x or higher
- [ ] Git command line tools
- [ ] Repository cloned locally

### Verify Setup

```bash
# Check Node version
node --version  # Should be 24.x or higher

# Check npm version
npm --version   # Should be 10.x or higher

# Check you're on main and up to date
git checkout main
git pull origin main
git status      # Should show "working tree clean"
```

---

## Release Types

### Available Commands

| Release Type | Command                 | Example Version | npm Tag  | When to Use                                    |
| ------------ | ----------------------- | --------------- | -------- | ---------------------------------------------- |
| **Alpha**    | `npm run release:alpha` | `0.3.0-alpha.0` | `alpha`  | Early testing, daily releases                  |
| **Beta**     | `npm run release:beta`  | `0.3.0-beta.0`  | `beta`   | Feature complete, needs broader testing        |
| **RC**       | `npm run release:rc`    | `0.3.0-rc.0`    | `rc`     | Release candidate, final testing before stable |
| **Patch**    | `npm run release`       | `0.3.1`         | `latest` | Bug fixes only (backward compatible)           |
| **Minor**    | `npm run release:minor` | `0.4.0`         | `latest` | New features (backward compatible)             |
| **Major**    | `npm run release:major` | `1.0.0`         | `latest` | Breaking changes                               |

### What standard-version Does

When you run `npm run release:alpha` (or any release command):

1. ✅ Analyzes commits since last release
2. ✅ Updates `package.json` version
3. ✅ Updates `CHANGELOG.md` with new entries
4. ✅ Creates git commit: `chore(release): X.Y.Z`
5. ✅ Creates git tag: `vX.Y.Z`

**Note:** This happens locally - nothing is pushed yet.

---

## Step-by-Step Process

### Step 1: Prepare Release Branch (~10 minutes)

#### 1.1 Ensure main is up to date

```bash
# Switch to main branch
git checkout main

# Pull latest changes
git pull origin main

# Verify clean working tree
git status
# Should show: "nothing to commit, working tree clean"
```

#### 1.2 Create release branch

```bash
# Create and switch to release branch
git checkout -b release/v0.3.0-alpha

# Verify you're on the new branch
git branch --show-current
# Should show: release/v0.3.0-alpha
```

**Branch naming convention:**

- Use format: `release/vX.Y.Z-prerelease`
- Examples:
  - `release/v0.3.0-alpha`
  - `release/v0.3.0-beta`
  - `release/v1.0.0-rc`
  - `release/v1.0.0`

#### 1.3 Run standard-version

```bash
# For alpha release
npm run release:alpha

# The command will:
# - Update package.json version
# - Update CHANGELOG.md
# - Create commit and tag
```

**Expected output:**

```
✔ bumping version in package.json from 0.2.0-alpha.1 to 0.3.0-alpha.0
✔ outputting changes to CHANGELOG.md
✔ committing package.json and CHANGELOG.md
✔ tagging release v0.3.0-alpha.0
ℹ Run `git push --follow-tags origin release/v0.3.0-alpha` to publish
```

#### 1.4 Review changes

```bash
# View the release commit
git log -1

# View file changes
git show HEAD

# Review CHANGELOG.md
cat CHANGELOG.md | head -50
```

**Verify:**

- [ ] Version in `package.json` is correct
- [ ] CHANGELOG.md has new section with correct version
- [ ] Commit message follows format: `chore(release): X.Y.Z`
- [ ] Tag was created: `git tag --list | grep v0.3.0`

#### 1.5 Push branch and tag

```bash
# Push the release branch
git push origin release/v0.3.0-alpha

# Push the tag
git push origin v0.3.0-alpha.0
```

**Expected output:**

```
remote: Create a pull request for 'release/v0.3.0-alpha' on GitHub
To https://github.com/GSA-TTS/svelte-ui.git
 * [new branch]      release/v0.3.0-alpha -> release/v0.3.0-alpha
 * [new tag]         v0.3.0-alpha.0 -> v0.3.0-alpha.0
```

---

### Step 2: Create Release PR (~5 minutes)

#### 2.1 Navigate to GitHub

Go to: https://github.com/GSA-TTS/svelte-ui/pulls

#### 2.2 Create Pull Request

Click **"New pull request"** or follow the link from the git push output.

**PR Settings:**

- **Base:** `main`
- **Compare:** `release/v0.3.0-alpha`
- **Title:** `chore(release): 0.3.0-alpha.0`
- **Template:** Select "release" template if prompted

#### 2.3 Fill PR Description

The release PR template provides a checklist. Complete it:

**Pre-Merge Verification:**

- [ ] Version number in `package.json` is correct
- [ ] `CHANGELOG.md` has been updated
- [ ] All CI checks pass
- [ ] No unexpected file changes
- [ ] Git tag has been pushed

**Post-Merge Steps:**

- [ ] Create GitHub Release
- [ ] Monitor automated publishing
- [ ] Verify on npm

#### 2.4 Link Related Issues

If this release closes or fixes issues, add to PR description:

```markdown
Closes #123
Fixes #456
```

#### 2.5 Submit Pull Request

Click **"Create pull request"**

---

### Step 3: Review & Merge PR (~15-30 minutes)

#### 3.1 Wait for CI Checks

The CI workflow will run automatically:

- ✅ Type check
- ✅ Svelte check
- ✅ Lint
- ✅ Tests
- ✅ Build
- ✅ Security scan

**Monitor at:** https://github.com/GSA-TTS/svelte-ui/actions

#### 3.2 Review Changes

Review the PR changes carefully:

- Check `package.json` version bump
- Check `CHANGELOG.md` entries
- Verify no unrelated changes

#### 3.3 Get Approval

Per branch protection rules, release PRs require approval:

- Request review from team member(s)
- Wait for approval
- Address any feedback

#### 3.4 Merge Pull Request

Once approved and CI passes:

1. Click **"Merge pull request"**
2. Confirm merge
3. Delete the release branch (optional but recommended)

**The tag is now on the `main` branch and ready for release.**

---

### Step 4: Create GitHub Release (~2-3 minutes)

**This is your manual trigger for automated npm publishing.**

#### 4.1 Navigate to Releases

Go to: https://github.com/GSA-TTS/svelte-ui/releases

Click **"Draft a new release"**

#### 4.2 Choose Tag

In the **"Choose a tag"** dropdown:

1. Select the tag you just merged: `v0.3.0-alpha.0`
2. Target should auto-select: `main`

#### 4.3 Release Title

Enter the release title (same as tag):

```
v0.3.0-alpha.0
```

#### 4.4 Release Description

**Option A: Auto-generate release notes** (Recommended)

1. Click **"Generate release notes"**
2. GitHub will create a list of commits and contributors
3. Edit as needed to add context or highlights

**Option B: Copy from CHANGELOG.md**

1. Open `CHANGELOG.md` in repository
2. Find the section for this version
3. Copy the content
4. Paste into description field

**Example format:**

```markdown
## Features

- Add Accordion component
- Add Alert component with variants

## Bug Fixes

- Fix Button accessibility issues
- Update USWDS to 3.13.0

## Documentation

- Update installation guide
- Add component usage examples
```

#### 4.5 Set Pre-release Flag

**For alpha, beta, or rc versions:**

- ☑ **Check** "Set as a pre-release"

**For stable versions:**

- ☐ Leave unchecked

**This affects how the release appears on GitHub and npm.**

#### 4.6 Publish Release

Click **"Publish release"** (NOT "Save draft")

**What happens next:**

1. ✅ GitHub Release is published
2. ✅ GitHub Actions workflow triggers automatically
3. ✅ Workflow runs full CI test suite
4. ✅ Workflow publishes to npm with provenance
5. ✅ Workflow posts comment on release with status

---

### Step 5: Monitor Automated Publishing (~5 minutes)

#### 5.1 Watch GitHub Actions

The "Publish to npm" workflow starts automatically.

**Monitor at:** https://github.com/GSA-TTS/svelte-ui/actions

**Jobs to watch:**

1. **validate** - Quick pre-flight checks (~30 seconds)
   - Verifies tag format
   - Extracts version and dist-tag
   - Verifies package.json matches tag

2. **publish** - Build and publish (~4-5 minutes)
   - Runs type-check
   - Runs svelte-check
   - Runs lint
   - Runs tests
   - Builds package
   - Verifies package
   - Publishes to npm

#### 5.2 Check for Success Comment

When publishing succeeds, the workflow posts a comment on your GitHub Release:

```
✅ Published to npm successfully!

📦 Package: @jeffkeene-gsa/svelte-ui-uswds@0.3.0-alpha.0
🏷️ Dist-tag: alpha

Install:
npm install @jeffkeene-gsa/svelte-ui-uswds@alpha

Or specific version:
npm install @jeffkeene-gsa/svelte-ui-uswds@0.3.0-alpha.0

🔒 Provenance: View attestation
```

#### 5.3 If Workflow Fails

If publishing fails, you'll see a failure comment:

```
❌ npm publish failed

The automated publish workflow encountered an error.

Actions run: View logs

Next steps:
1. Check the workflow logs for details
2. Fix any issues
3. Re-run the workflow from the Actions tab
4. See troubleshooting guide for common issues
```

**See [Troubleshooting](#troubleshooting) section below.**

---

## GitHub Release Creation

### Detailed Walkthrough

This section provides additional detail for Step 4 above.

#### UI Layout

When you click "Draft a new release", you'll see:

```
┌─────────────────────────────────────────────────────┐
│ Choose a tag                              [v]       │  ← Dropdown to select tag
│ Target: main                              [v]       │  ← Branch target
│                                                      │
│ Release title                                        │
│ ┌────────────────────────────────────────────┐     │
│ │ v0.3.0-alpha.0                             │     │  ← Enter release title
│ └────────────────────────────────────────────┘     │
│                                                      │
│ Describe this release                                │
│ ┌────────────────────────────────────────────┐     │
│ │                                            │     │
│ │ [Generate release notes]                  │     │  ← Auto-generate button
│ │                                            │     │
│ │ Or type your release notes here...        │     │  ← Manual entry
│ │                                            │     │
│ └────────────────────────────────────────────┘     │
│                                                      │
│ ☐ Set as the latest release                        │
│ ☑ Set as a pre-release                             │  ← Check for alpha/beta/rc
│ ☐ Create a discussion for this release             │
│                                                      │
│ [Publish release]  [Save draft]                     │  ← Click Publish
└─────────────────────────────────────────────────────┘
```

#### Tag Selection

**If tag doesn't appear in dropdown:**

1. Verify tag was pushed: `git push origin v0.3.0-alpha.0`
2. Refresh the page
3. Check tags list: https://github.com/GSA-TTS/svelte-ui/tags

**If you select wrong tag:**

- Click "Choose a tag" again and select correct one
- The tag determines which code is published

#### Pre-release Checkbox Importance

The "Set as a pre-release" checkbox affects:

**When CHECKED (pre-release):**

- ✅ Release marked with "Pre-release" badge on GitHub
- ✅ Does NOT show as "Latest" release on repository
- ✅ Does NOT notify watchers by default
- ✅ Appropriate for alpha, beta, rc versions

**When UNCHECKED (stable release):**

- ✅ Release marked as "Latest" on GitHub
- ✅ Shows prominently on repository page
- ✅ Notifies repository watchers
- ✅ Appropriate for stable versions only

**Rule of thumb:**

```
Version contains "alpha", "beta", or "rc" → CHECK the box
Version is X.Y.Z with no suffix → UNCHECK the box
```

---

## Verification

### After Successful Publish

#### 6.1 Verify on npmjs.com

**Check package page:**
https://www.npmjs.com/package/@jeffkeene-gsa/svelte-ui-uswds

**Verify:**

- [ ] New version appears in version list
- [ ] Correct dist-tag is shown (alpha/beta/rc/latest)
- [ ] "Published X minutes ago" timestamp is recent
- [ ] Provenance attestation badge is visible

**Check version page:**
https://www.npmjs.com/package/@jeffkeene-gsa/svelte-ui-uswds/v/0.3.0-alpha.0

**Verify:**

- [ ] Version number is correct
- [ ] Package contents look correct
- [ ] Dependencies are correct (peer dependencies)
- [ ] Provenance section shows GitHub source

#### 6.2 Test Installation Locally

```bash
# Test alpha tag installation
npm install @jeffkeene-gsa/svelte-ui-uswds@alpha

# Or test specific version
npm install @jeffkeene-gsa/svelte-ui-uswds@0.3.0-alpha.0

# Verify installed version
npm list @jeffkeene-gsa/svelte-ui-uswds
```

#### 6.3 Verify Provenance Attestation

```bash
# View package metadata with provenance
npm view @jeffkeene-gsa/svelte-ui-uswds@0.3.0-alpha.0 --json

# Check for attestations field
npm view @jeffkeene-gsa/svelte-ui-uswds@0.3.0-alpha.0 --json | grep -A 5 attestations
```

**Expected:** Attestations field should link to GitHub repository and workflow.

#### 6.4 Check npm Dist-tags

```bash
# View all dist-tags
npm view @jeffkeene-gsa/svelte-ui-uswds dist-tags

# Expected output:
# {
#   latest: '0.2.0',
#   alpha: '0.3.0-alpha.0',
#   beta: '0.2.0-beta.1',
#   rc: '0.2.0-rc.0'
# }
```

---

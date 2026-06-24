# ADR-0003: Automated npm Publishing with Trusted Publishing

## Status

Accepted

## Context

We need to establish an automated, secure npm publishing process for the Svelte UI component library. The library is in active development with planned daily alpha releases, requiring a streamlined release workflow that:

1. Eliminates manual npm publishing steps
2. Maintains strong security posture
3. Provides full audit trail and provenance
4. Scales with daily release frequency
5. Follows npm and GitHub best practices
6. Minimizes credential management overhead

### Current State

- Manual publishing requires running `npm publish` locally
- Requires npm authentication token management
- No automated provenance attestation
- Release process is time-consuming and error-prone
- Token-based authentication has security risks (long-lived credentials)

### Requirements

- Publish new versions automatically when GitHub Releases are published
- Maintain security controls (no hardcoded secrets)
- Support pre-release tags (alpha, beta, rc) and stable releases
- Run full CI test suite before publishing
- Generate npm provenance attestations
- Provide clear audit trail
- Allow manual emergency publishing if needed

---

## Decision

We will implement automated npm publishing using **GitHub Actions** with **npm Trusted Publishing** (OIDC authentication).

### Chosen Approach: Trusted Publishing with Manual Release Trigger

**Trigger:** Manual GitHub Release creation (maintainer control point)

**Authentication:** npm Trusted Publishing (OpenID Connect)
- No manual tokens required
- Short-lived credentials (minutes)
- Automatic provenance generation
- npm's recommended approach

**Workflow:**
1. Maintainer creates release branch
2. Runs `npm run release:alpha` (standard-version updates version, CHANGELOG, creates tag)
3. Creates release PR to main
4. Gets approval and merges PR (protected branch via ruleset)
5. Manually creates GitHub Release from merged tag
6. GitHub Actions workflow triggers automatically
7. Workflow runs full CI, builds, and publishes to npm with provenance

**Security:**
- npm publishing access requires 2FA
- npm tokens disallowed (forces OIDC or human 2FA)
- GitHub Actions uses OIDC (no secrets in repository)
- Protected branch ensures code review
- Immutable publish (uses exact git tag)

---

## Alternatives Considered

### Alternative 1: Token-based Authentication

**Approach:**
- Store npm access token in GitHub Secrets
- Workflow uses token to authenticate
- Token rotated periodically

**Pros:**
- Simpler initial setup
- Works with older CI/CD systems
- Well-documented pattern

**Cons:**
- Long-lived credentials (security risk)
- Requires token rotation maintenance
- npm explicitly warns against this approach
- Requires GitHub Secrets management
- No automatic provenance

**Decision:** Rejected - npm explicitly recommends Trusted Publishing over tokens

---

### Alternative 2: Fully Manual Publishing

**Approach:**
- Maintainer runs `npm publish` from local machine
- No automation

**Pros:**
- Maximum human control
- No automation complexity
- Simple to understand

**Cons:**
- Time-consuming (~20+ minutes per release)
- Error-prone (easy to forget steps)
- Doesn't scale with daily releases
- No automated provenance
- Inconsistent process

**Decision:** Rejected - Doesn't meet requirement for daily release frequency

---

### Alternative 3: Publish on Every Merge to Main

**Approach:**
- Workflow triggers on push to main
- Every merge automatically publishes
- Fully automated

**Pros:**
- Truly continuous deployment
- No manual steps after merge
- Simple automation

**Cons:**
- Too aggressive (every merge publishes)
- No human review checkpoint before publish
- Harder to batch multiple changes
- May publish incomplete features

**Decision:** Rejected - Too automated, loses control over when releases occur

---

### Alternative 4: Publish on Git Tag Push

**Approach:**
- Workflow triggers when tag is pushed
- No GitHub Release creation needed
- One less manual step

**Pros:**
- Simpler workflow (one less step)
- Direct tag-to-publish flow
- Still have control point (when to push tag)

**Cons:**
- Loses GitHub Release UI benefits
- No centralized release notes
- No pre-release marking in GitHub
- Less discoverable for users
- GitHub Releases are standard practice

**Decision:** Rejected - GitHub Releases provide better UX and discoverability

---

## Consequences

### Positive Consequences

✅ **Faster Releases**
- Publishing takes ~5 minutes (automated) vs ~20+ minutes (manual)
- Enables daily release cadence
- Reduces time from code-complete to published
- Allows rapid iteration on alpha releases

✅ **Better Security**
- No long-lived tokens to manage or rotate
- OIDC provides short-lived, scoped credentials (expire in minutes)
- npm provenance links package to source automatically
- Follows npm's security best practices
- Reduces attack surface (no static credentials to steal)

✅ **Improved Audit Trail**
- GitHub Actions logs every publish attempt
- npm provenance attestations verify source
- GitHub Releases provide clear changelog
- Full transparency of what was published when and by whom
- Immutable record (can't be modified after publish)

✅ **Reduced Human Error**
- Automated dist-tag determination (alpha/beta/rc/latest)
- Automated version verification (tag matches package.json)
- Consistent process every time
- Pre-publish checks catch common mistakes

✅ **Scales with Team**
- Any maintainer can follow documented process
- No special npm token distribution needed
- Clear ownership (provenance shows who triggered release)
- Process documented in RELEASE_PROCESS.md

✅ **npm Provenance**
- Automatic attestation generation
- Links published package to exact GitHub commit
- Verifiable supply chain security
- Builds trust with consumers

---

### Negative Consequences

⚠️ **Initial Setup Complexity**
- Requires npm Trusted Publishing configuration
- Requires GitHub Actions workflow creation
- Maintainers must learn new release process
- More moving parts than simple `npm publish`

**Mitigation:**
- Comprehensive documentation in RELEASE_PROCESS.md
- Troubleshooting guide for common issues
- Release PR template with checklist
- This ADR documents decision rationale

⚠️ **Dependency on GitHub Actions**
- If GitHub is down, automated publishing is blocked
- Cannot publish during GitHub outages
- Emergency manual publish requires temporarily changing npm settings

**Mitigation:**
- Document emergency manual publish procedure
- GitHub Actions has high uptime (99.9%+)
- Most outages are < 30 minutes
- Can wait for recovery in most cases

⚠️ **Two-Step Release Process**
- Must merge PR AND create GitHub Release (two manual steps)
- More steps than direct `npm publish` from local machine
- Additional time overhead (~2-3 minutes for release creation)

**Mitigation:**
- GitHub Release creation is quick (~2-3 minutes)
- Provides review opportunity (last checkpoint)
- Can batch multiple PRs before releasing
- Manual trigger provides control over timing

⚠️ **Learning Curve**
- New maintainers must learn release process
- Different from traditional `npm publish` workflow
- Must understand GitHub Releases

**Mitigation:**
- Step-by-step guide in RELEASE_PROCESS.md
- Release PR template guides through process
- FAQ section addresses common questions
- Troubleshooting guide for issues

---

## Implementation Details

### Files Created

1. **`.github/workflows/publish.yml`**
   - GitHub Actions workflow
   - Triggers on release publication
   - Runs validation, tests, build, publish

2. **`docs/RELEASE_PROCESS.md`**
   - Comprehensive release guide
   - Step-by-step instructions
   - Verification procedures

3. **`docs/RELEASE_TROUBLESHOOTING.md`**
   - Common issues and solutions
   - Emergency procedures
   - Getting help

4. **`.github/PULL_REQUEST_TEMPLATE/release.md`**
   - Release PR checklist
   - Pre-merge and post-merge steps
   - Helps maintainers follow process

5. **`docs/adr/0003-automated-npm-publishing.md`** (this file)
   - Documents decision rationale
   - Alternatives considered
   - Consequences

### Files Modified

1. **`README.md`**
   - Added npm badges
   - Updated installation instructions
   - Added maintainer section

2. **`CONTRIBUTING.md`**
   - Added "For Maintainers" section
   - Links to release process guide
   - Release type table

### Configuration

**npm Configuration:**
- Trusted Publishing: GitHub OIDC
- Repository: `GSA-TTS/svelte-ui`
- Workflow: `.github/workflows/publish.yml`
- Publishing access: 2FA required, tokens disallowed

**GitHub Actions:**
- Permissions: `contents: read`, `id-token: write`, `issues: write`
- Trigger: `release.types.published`
- Runs on: `ubuntu-latest`
- Node version: 24

---

## Success Metrics

After implementation, success is measured by:

### Quantitative Metrics

- **Time to release:** ~30-50 minutes total (vs ~60+ minutes manual)
- **Automated publish time:** ~5 minutes (workflow execution)
- **Release frequency:** Daily alpha releases (target achieved)
- **Error rate:** Reduced from manual errors to automated validation catches

### Qualitative Metrics

- **Security posture:** Improved (no long-lived tokens, automatic provenance)
- **Audit trail:** Complete (GitHub Actions logs + npm provenance)
- **Developer experience:** Improved (consistent, documented process)
- **Consumer trust:** Improved (provenance attestation visible)

---

## Future Considerations

### Potential Enhancements

1. **Automated Release PR Creation**
   - Workflow dispatch to create release PR automatically
   - Reduces manual steps further
   - Requires additional workflow complexity

2. **Release Approval Gates**
   - GitHub Environments for additional approval
   - Adds safety net before publish
   - May slow down daily alpha releases

3. **Automated Rollback**
   - Detect critical issues post-publish
   - Automatically deprecate and publish hotfix
   - Requires monitoring integration

4. **Multiple Release Channels**
   - Separate workflows for alpha vs stable
   - Different approval requirements
   - More complex to maintain

### Migration Path

When changing npm package name from `@jeffkeene-gsa/*` to final name:

1. Update npm Trusted Publishing configuration (new package)
2. Update workflow (package name)
3. Update README and documentation
4. Deprecate old package, point to new one
5. Test with new package before deprecating old

---

## References

- [npm Trusted Publishing](https://docs.npmjs.com/generating-provenance-statements)
- [GitHub OIDC](https://docs.github.com/en/actions/deployment/security-hardening-your-deployments/about-security-hardening-with-openid-connect)
- [npm Provenance](https://github.blog/2023-04-19-introducing-npm-package-provenance/)
- [standard-version](https://github.com/conventional-changelog/standard-version)
- [Conventional Commits](https://www.conventionalcommits.org/)
- [GitHub Actions - Publishing packages](https://docs.github.com/en/actions/publishing-packages/publishing-nodejs-packages)

---

## Review and Approval

- **Author:** AI Agent (OpenCode)
- **Reviewed By:** Jeff Keene
- **Approved Date:** 2026-06-24
- **Status:** Accepted and implemented

---

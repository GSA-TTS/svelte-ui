# Rules for Secure package.json Management

## Purpose

These rules ensure our JavaScript projects maintain secure and reliable dependency management through proper package.json configuration.

## Dependency Version Rules

### Rule 1: Pin Exact Versions

**ALWAYS** use exact version numbers in package.json dependencies.

- ✅ DO: `"express": "4.18.2"`
- ❌ DON'T: `"express": "^4.18.2"` or `"express": "~4.18.2"`
- **Rationale**: Prevents unexpected updates that could introduce vulnerabilities or breaking changes.

### Rule 2: Commit Lockfiles

**ALWAYS** commit package-lock.json or yarn.lock to version control.

- **Rationale**: Ensures consistent installs across environments and team members.

### Rule 3: Minimize Dependencies

**ONLY** include packages that are actively used in the project.

- Review dependencies quarterly
- Remove unused packages immediately
- **Rationale**: Reduces attack surface and maintenance burden.

## Security Audit Rules

### Rule 4: Run Security Audits Before Commits

**ALWAYS** run `npm audit` before committing changes to package.json.

- Address all CRITICAL and HIGH severity vulnerabilities before merging
- Document any accepted risks for MODERATE or LOW vulnerabilities

### Rule 5: Automate Security Checks

**MUST** include security audits in CI/CD pipeline.

- Fail builds on CRITICAL vulnerabilities
- Generate reports for all severity levels

## Package Selection Rules

### Rule 6: Verify Package Before Adding

**BEFORE** adding any new dependency, verify:

- Package has active maintenance (commits within last 6 months)
- Package has significant usage (check npm download stats)
- Package repository is reputable (check GitHub stars, issues, contributors)
- Package has a valid license compatible with project requirements

### Rule 7: Avoid Deprecated Packages

**NEVER** add packages marked as deprecated.

- If existing dependency becomes deprecated, plan replacement within 30 days

## Configuration Rules

### Rule 8: Restrict Package Sources

**ONLY** install packages from official npm registry unless explicitly approved.

- Document any private registry usage
- **Rationale**: Reduces risk of malicious package injection

### Rule 9: Use Scripts Carefully

**REVIEW** all preinstall, postinstall, and other lifecycle scripts.

- Avoid packages with suspicious scripts
- Document why any scripts are necessary

### Rule 10: Specify Engines

**ALWAYS** specify Node.js and npm version requirements.

```json
"engines": {
  "node": ">=24.0.0",
  "npm": ">=11.0.0"
}
```

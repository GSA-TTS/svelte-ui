## Release PR

**Version:** <!-- e.g., 0.3.0-alpha.0 -->  
**Release Type:** [ ] Alpha [ ] Beta [ ] RC [ ] Patch [ ] Minor [ ] Major

---

### Pre-Merge Verification

#### Version & Changelog
- [ ] Version number in `package.json` is correct
- [ ] `CHANGELOG.md` has been updated with all changes since last release
- [ ] CHANGELOG entry is in correct format and location
- [ ] Release commit message follows conventional commits format

#### Code Quality
- [ ] All CI checks pass (type-check, svelte-check, lint, tests, build)
- [ ] No unexpected file changes (check `git diff`)
- [ ] No unrelated changes included

#### Git Tags
- [ ] Git tag has been created: `vX.Y.Z`
- [ ] Tag has been pushed to origin: `git push origin vX.Y.Z`
- [ ] Tag matches version in package.json

---

### Post-Merge Steps

After this PR merges, complete these steps to publish:

- [ ] **Create GitHub Release** from tag `vX.Y.Z`
  - Go to: https://github.com/GSA-TTS/svelte-ui/releases/new
  - Choose tag: `vX.Y.Z`
  - Title: `vX.Y.Z`
  - Description: Copy from CHANGELOG.md section for this version
  - Check "Set as a pre-release" if alpha/beta/rc
  - Click "Publish release"

- [ ] **Monitor automated publishing**
  - Watch GitHub Actions workflow: "Publish to npm"
  - Verify workflow succeeds
  - Check for success comment on release

- [ ] **Verify on npm**
  - Visit: https://www.npmjs.com/package/@jeffkeene-gsa/svelte-ui-uswds
  - Confirm new version appears
  - Check dist-tag is correct (alpha/beta/rc/latest)

- [ ] **Test installation** (optional but recommended)
  ```bash
  npm install @jeffkeene-gsa/svelte-ui-uswds@alpha  # or appropriate tag
  ```

---

### Release Notes

_Add any special notes about this release (breaking changes, migration steps, known issues, etc.)_

---

### Related Issues

Closes #
Fixes #

---

**Documentation:** [Release Process Guide](../docs/RELEASE_PROCESS.md)

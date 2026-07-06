# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

### [1.1.1](https://github.com/GSA-TTS/svelte-ui/compare/v1.0.0...v1.1.1) (2026-07-06)

## [1.1.0](https://github.com/GSA-TTS/svelte-ui/compare/v1.0.0...v1.1.0) (2026-07-06)

## [1.0.1](https://github.com/GSA-TTS/svelte-ui/compare/v1.0.0...v1.0.1) (2026-06-29)

### Bug Fixes

- **types:** correct TypeScript declaration file path ([#26](https://github.com/GSA-TTS/svelte-ui/issues/26))
  - Update `types` path from `./dist/index.d.ts` to `./dist/src/lib/index.d.ts`
  - This matches the actual location where vite-plugin-dts generates types
  - Fixes TypeScript "Cannot find module" errors when consuming the package

## [1.0.0](https://github.com/GSA-TTS/svelte-ui/compare/v0.2.0...v1.0.0) (2026-06-29)

### ⚠️ BREAKING CHANGES

- **package:** Package has migrated to the official GSA-TTS npm organization. The package name has changed from `@jeffkeene-gsa/svelte-ui-uswds` to `@gsa-tts/svelte-ui-uswds`. Users must update their dependencies.

### Package

- **migration:** migrate to @gsa-tts npm organization ([af1257b](https://github.com/GSA-TTS/svelte-ui/commit/af1257b))
  - Update package name from `@jeffkeene-gsa/svelte-ui-uswds` to `@gsa-tts/svelte-ui-uswds`
  - Set version to 1.0.0 to mark official organizational release
  - Add comprehensive migration guide in `docs/MIGRATION_TO_GSA_TTS.md`
  - Update all documentation references to new package name
  - Update CI/CD workflow references

### Migration

See [Migration Guide](./docs/MIGRATION_TO_GSA_TTS.md) for detailed instructions on updating from `@jeffkeene-gsa/svelte-ui-uswds` to `@gsa-tts/svelte-ui-uswds`.

**No code changes required** - only the package name in `package.json` needs updating. All component APIs remain unchanged.

### Notes

- Old package (`@jeffkeene-gsa/svelte-ui-uswds`) will be deprecated with a warning
- All components and APIs remain backward compatible
- No breaking changes to code - only package name changed

## [0.2.0](https://github.com/GSA-TTS/svelte-ui/compare/v0.2.0-alpha.4...v0.2.0) (2026-06-25)

## [0.2.0-alpha.4](https://github.com/GSA-TTS/svelte-ui/compare/v0.2.0-alpha.3...v0.2.0-alpha.4) (2026-06-25)

## [0.2.0-alpha.3](https://github.com/GSA-TTS/svelte-ui/compare/v0.2.0-alpha.1...v0.2.0-alpha.3) (2026-06-24)

## [0.2.0-alpha.2](https://github.com/GSA-TTS/svelte-ui/compare/v0.2.0-alpha.1...v0.2.0-alpha.2) (2026-06-24)

## [0.2.0-alpha.1](https://github.com/GSA-TTS/svelte-ui/compare/v0.1.1-alpha.1...v0.2.0-alpha.1) (2026-06-18)

### ⚠ BREAKING CHANGES

- Package now includes source files. Projects using this
  package should ensure they can process .svelte files.
- Package now includes source files. Projects using this
  package should ensure they can process .svelte files.

### Features

- add SSR support by exposing source files ([8a0832b](https://github.com/GSA-TTS/svelte-ui/commit/8a0832bcdfa064d1ea21079e9f476379dfaedd5f))
- add SSR support by exposing source files ([c79749e](https://github.com/GSA-TTS/svelte-ui/commit/c79749e6ae3b0851938d4e667b10dd7d00cd6a48))

## [0.2.0-alpha.0](https://github.com/GSA-TTS/svelte-ui/compare/v0.1.1-alpha.1...v0.2.0-alpha.0) (2026-06-18)

### ⚠ BREAKING CHANGES

- Package now includes source files. Projects using this
  package should ensure they can process .svelte files.

### Features

- add SSR support by exposing source files ([c79749e](https://github.com/GSA-TTS/svelte-ui/commit/c79749e6ae3b0851938d4e667b10dd7d00cd6a48))

### [0.1.1-alpha.1](https://github.com/GSA-TTS/svelte-ui/compare/v0.1.1-alpha.0...v0.1.1-alpha.1) (2026-06-17)

### 0.1.1-alpha.0 (2026-06-17)

### Bug Fixes

- **deps:** resolve npm audit HIGH vulnerabilities blocking deployment ([7fdf4ea](https://github.com/GSA-TTS/svelte-ui/commit/7fdf4ea76cdd05f8c1b7fee7bcd92c1f0fa94fba))

## [0.1.0] - TBD

### Added

- Initial release
- Button component
- Storybook documentation
- Docker development environment
- CI/CD pipeline
- TypeScript support
- Section 508 accessibility compliance

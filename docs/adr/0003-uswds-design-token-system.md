# ADR-0003: Programmatic USWDS Design Token System with CSS Custom Properties

## Status

Accepted

## Date

2026-06-04

## Authors

- Jeff Keene (Engineer)
- AI Agent (Co-author)

## Context

The Svelte UI component library needs a comprehensive design token system that enables maximum customizability while maintaining USWDS compatibility and design system-agnostic flexibility.

### Problem Statement

We need to:

1. **Map all USWDS design tokens** (~500+ tokens) to CSS custom properties
2. **Provide maximum customizability** through pure CSS overrides (not JavaScript configuration)
3. **Maintain USWDS compatibility** while being design system-agnostic
4. **Support both individual token overrides** and wholesale design system swapping
5. **Enable runtime theme switching** (e.g., dark mode, agency branding)
6. **Ensure WCAG accessibility compliance** with built-in contrast validation
7. **Optimize bundle size** through tree-shakeable imports
8. **Provide type safety** with comprehensive TypeScript definitions

### Current State

- Basic component structure in place (Button, TextInput, Checkbox planned)
- No standardized design token system
- No theming infrastructure
- Manual USWDS reference for styling
- Components hardcode style values

### Requirements Captured

Based on project discussions, the token system must:

| Requirement       | Approach                                                  |
| ----------------- | --------------------------------------------------------- |
| Token Generation  | Programmatic from USWDS source (not manual)               |
| Utility Classes   | Programmatically generated                                |
| Token Coverage    | All USWDS tokens from day one (~500+ tokens)              |
| Bundle Strategy   | Tree-shakeable imports for optimal bundle size            |
| WCAG Compliance   | Computed properties for contrast validation               |
| Naming Convention | Flat structure matching USWDS token names exactly         |
| Customization     | Pure CSS variable overrides (no JavaScript config)        |
| Theme Support     | `:root` global and component-level scoping with dark mode |

### Design Token Categories (from USWDS 3.13.0)

1. **Color Tokens** (~310 total)
   - System colors: 24 color families × 10 grades = 240 tokens
   - Theme colors: ~50 semantic tokens (primary, secondary, accent, base, etc.)
   - State colors: ~20 tokens (error, warning, success, info, disabled)

2. **Spacing Tokens** (~45 total)
   - Pixel units: `1px`, `2px`
   - Numeric: `05`, `1`, `105`, `2`, `205`, `3`-`15`
   - Named: `card`, `mobile`, `tablet`, `desktop`, etc.
   - Negative: `neg-1px`, `neg-05`, `neg-1`, etc.

3. **Typography Tokens** (~100 total)
   - Font families: `sans`, `serif`, `mono`, `ui`, `heading`, `body`, `code`, `alt`
   - Font sizes: `3xs`-`3xl`, `micro`, `1`-`20`
   - Font weights: `thin`-`heavy` (100-900)
   - Line heights: `1`-`6`
   - Letter spacing, measure (line length)

4. **Other Tokens** (~50 total)
   - Shadow: `1`-`5`, `none`
   - Opacity: `0`-`100` (increments of 10)
   - Z-index: `100`-`500`, `top`, `bottom`
   - Flex: `1`-`12`, `auto`, `fill`
   - Order: `first`, `last`, `initial`, `0`-`11`

**Total: ~500+ design tokens**

## Decision

We will implement a **programmatically generated CSS custom property system** that extracts all USWDS design tokens and generates:

1. **CSS custom property files** (`:root` declarations)
2. **Utility class files** (`.text-*`, `.bg-*`, `.padding-*`, etc.)
3. **TypeScript type definitions** (type-safe token references)
4. **WCAG contrast validation matrices** (computed at build time)

### 1. Token Generation Strategy

- **Install `@uswds/uswds@~3.13.0`** as devDependency (source of truth)
- **Create build-time generators** that:
  - Parse USWDS Sass variables/maps
  - Generate CSS custom property files
  - Generate utility classes
  - Generate TypeScript type definitions
  - Generate WCAG contrast validation matrices
- **Run generators as prebuild step** ensuring tokens are always up-to-date

### 2. CSS Variable Naming Convention

**Flat structure matching USWDS exactly:**

```css
/* Color tokens */
--red-5, --red-10, --red-20, ... --red-90
--blue-warm-60v
--primary, --secondary, --accent-warm
--error, --warning, --success, --info

/* Spacing tokens */
--spacing-1px, --spacing-2px
--spacing-05, --spacing-1, --spacing-2, ... --spacing-15
--spacing-card, --spacing-mobile, --spacing-desktop

/* Typography tokens */
--font-sans, --font-serif, --font-mono
--font-size-3xs, --font-size-sm, --font-size-xl
--font-weight-bold, --line-height-3

/* Other tokens */
--shadow-1, --shadow-2, ... --shadow-5
--opacity-0, --opacity-50, --opacity-100
--z-index-100, --z-index-top
```

**Rationale:** Flat naming reduces cognitive overhead, matches USWDS documentation exactly, and simplifies token overrides.

### 3. File Structure

```
src/lib/
├── styles/
│   ├── design-tokens/
│   │   ├── all.css              # Imports all tokens
│   │   ├── color.css            # ~310 color tokens
│   │   ├── spacing.css          # ~45 spacing tokens
│   │   ├── typography.css       # ~100 typography tokens
│   │   ├── shadow.css           # 6 shadow tokens
│   │   ├── opacity.css          # 11 opacity tokens
│   │   ├── z-index.css          # 7 z-index tokens
│   │   ├── flex.css             # 14 flex tokens
│   │   └── order.css            # 14 order tokens
│   ├── utilities/
│   │   ├── all.css              # Imports all utilities
│   │   ├── color.css            # ~930 color utilities
│   │   ├── spacing.css          # ~360 spacing utilities
│   │   └── typography.css       # ~200 typography utilities
│   └── themes/
│       ├── uswds-light.css      # Default USWDS theme
│       └── uswds-dark.css       # Dark mode overrides
├── generators/                   # Build-time generators
│   ├── parse-uswds-tokens.ts    # Extract tokens from USWDS
│   ├── generate-css-tokens.ts   # Generate CSS files
│   ├── generate-utilities.ts    # Generate utility classes
│   ├── generate-types.ts        # Generate TypeScript types
│   ├── generate-contrast-matrix.ts # WCAG validation data
│   └── token-sources/
│       └── uswds-tokens.json    # Extracted token data
├── utils/
│   ├── theme.ts                 # Runtime theme switching
│   └── contrast.ts              # WCAG contrast validation
└── types/
    └── design-tokens.ts         # Generated TypeScript types
```

### 4. Tree-Shakeable Exports

Consumers can import only what they need:

```json
{
  "exports": {
    "./tokens/all": "./dist/tokens/all.css",
    "./tokens/color": "./dist/tokens/color.css",
    "./tokens/spacing": "./dist/tokens/spacing.css",
    "./utilities/all": "./dist/utilities/all.css",
    "./utilities/color": "./dist/utilities/color.css",
    "./themes/light": "./dist/themes/light.css",
    "./themes/dark": "./dist/themes/dark.css",
    "./utils/theme": "./dist/utils/theme.js",
    "./utils/contrast": "./dist/utils/contrast.js"
  }
}
```

**Consumer Usage Examples:**

```typescript
// Option 1: Import only what you need (smallest bundle)
import "svelte-ui/tokens/color";
import "svelte-ui/utilities/spacing";

// Option 2: Import everything (convenience)
import "svelte-ui/tokens/all";
import "svelte-ui/utilities/all";
```

### 5. Component Integration

Components reference CSS variables with fallbacks:

```svelte
<!-- Button.svelte -->
<style>
  .usa-button {
    /* Component-specific variables with fallbacks to tokens */
    background-color: var(--button-bg, var(--primary));
    color: var(--button-text, var(--white));
    padding: var(--button-padding-y, var(--spacing-2))
             var(--button-padding-x, var(--spacing-3));
    border-radius: var(--button-border-radius, var(--spacing-05));
    font-family: var(--button-font, var(--font-ui));
  }
}
</style>
```

**Component Token Convention:** `--{component}-{property}`

### 6. Customization Levels

The system supports three levels of customization:

**Level 1: Individual Token Override**

```css
:root {
  --primary: #007bff;
  --spacing-2: 1.25rem;
}
```

**Level 2: Component-Level Override**

```css
.my-button {
  --button-bg: var(--accent-cool);
  --button-padding-x: var(--spacing-4);
}
```

**Level 3: Wholesale Theme Swap**

```css
[data-theme="my-brand"] {
  --primary: #brand-color;
  --secondary: #brand-secondary;
  /* ... all tokens redefined ... */
}
```

```typescript
import { setTheme } from "svelte-ui/utils/theme";
setTheme("my-brand");
```

### 7. WCAG Contrast Validation

**Runtime Validation:**

```typescript
import { checkTokenContrast } from "svelte-ui/utils/contrast";

const result = checkTokenContrast("primary", "white");
// { ratio: 4.58, level: 'AA', passes: true }
```

**Build-Time Matrix:**
Generated JSON file mapping all token pairs to their contrast ratios:

```json
{
  "primary": {
    "AA": ["white", "base-lightest", ...],
    "AAA": ["white", ...],
    "AA-Large": [...]
  }
}
```

**Storybook Integration:**
Interactive contrast checker in token documentation stories.

## Alternatives Considered

### Alternative 1: Manual Token Definition

**Approach:** Manually write all CSS custom properties
**Pros:** Simple, no build step, full control
**Cons:** Maintenance nightmare (~500 tokens to update manually), error-prone, out of sync with USWDS
**Decision:** ❌ Rejected - Not scalable or maintainable

### Alternative 2: Direct USWDS Sass Import

**Approach:** Import USWDS Sass directly, use their mixins/functions
**Pros:** Automatic USWDS updates, no generators needed
**Cons:** Requires Sass in consumer projects, not tree-shakeable, harder to customize, doesn't support design system swapping
**Decision:** ❌ Rejected - Conflicts with tree-shaking and customization requirements

### Alternative 3: JavaScript Configuration Object

**Approach:** Tokens defined in JS/TS, injected at runtime
**Pros:** Type-safe, can compute values dynamically
**Cons:** Runtime overhead, harder to override, no static CSS, conflicts with pure CSS requirement
**Decision:** ❌ Rejected - User specified pure CSS overrides

### Alternative 4: Tailwind-Style Utility-Only Approach

**Approach:** Skip CSS variables, only provide utility classes
**Pros:** Smaller initial learning curve, familiar pattern
**Cons:** Can't customize via CSS variables, less flexible, conflicts with component-level theming
**Decision:** ❌ Rejected - Doesn't meet customization requirements

### Alternative 5: Hybrid Sass + CSS Variables

**Approach:** Use Sass for generation, output CSS variables + utilities
**Pros:** Leverage Sass ecosystem
**Cons:** Adds Sass dependency to build, more complex than pure TS generators
**Decision:** ⚠️ Considered - Could revisit if TypeScript parsing proves difficult

## Risks and Mitigations

| Risk                                             | Impact | Probability | Mitigation                                                                         |
| ------------------------------------------------ | ------ | ----------- | ---------------------------------------------------------------------------------- |
| USWDS structure change breaks parser             | High   | Medium      | Pin USWDS version (`~3.13.0`), add breaking change tests, document upgrade process |
| Bundle size too large for consumers              | High   | Low         | Tree-shaking + PurgeCSS integration, document optimization strategies              |
| Generator complexity makes maintenance difficult | Medium | Medium      | Comprehensive tests, clear documentation, modular generator design                 |
| CSS variable cascade issues                      | Medium | Low         | Clear naming conventions, scoping guidelines, developer documentation              |
| Performance impact from ~500 CSS variables       | Low    | Very Low    | Benchmark tests, modern browsers handle this well                                  |
| TypeScript type generation errors                | Medium | Low         | Validate types with existing components, add type tests                            |
| Generated files clutter git history              | Low    | High        | Use .gitattributes to mark as generated, consider git-sold separately              |
| USWDS update introduces breaking changes         | Medium | Medium      | Semver for library, test suite catches token structure changes                     |

## Success Metrics

The token system is successful when:

- ✅ All 500+ USWDS tokens available as CSS custom properties
- ✅ Tree-shakeable imports reduce bundle size by 50%+ when using subset
- ✅ 100% test coverage for generators and utilities
- ✅ All color token pairs validated for WCAG compliance
- ✅ Dark mode theme passes visual regression tests
- ✅ Storybook documentation includes interactive token explorer
- ✅ Zero runtime JavaScript overhead for token resolution
- ✅ TypeScript types catch 100% of invalid token usage at compile time
- ✅ Consumer projects can override tokens with 5 lines of CSS
- ✅ Generators run successfully on USWDS updates without manual intervention
- ✅ Documentation clearly explains all three customization levels

## References

- [USWDS Design Tokens Documentation](https://designsystem.digital.gov/design-tokens/)
- [USWDS GitHub Repository](https://github.com/uswds/uswds)
- [CSS Custom Properties (MDN)](https://developer.mozilla.org/en-US/docs/Web/CSS/--*)
- [WCAG 2.1 Contrast Guidelines](https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum.html)
- [ADR-0001: Initial Architecture](./0001-initial-architecture.md)
- [ADR-0002: Consolidate Tests into Stories](./0002-consolidate-tests-into-stories.md)
- [Tree-Shaking CSS Best Practices](https://web.dev/reduce-css-size/)
- [Design Tokens Community Group](https://www.w3.org/community/design-tokens/)

## Related ADRs

- **ADR-0001:** Initial Architecture - Established Svelte 5 + USWDS foundation
- **ADR-0002:** Consolidate Tests into Stories - Testing approach for components

This ADR builds on ADR-0001's decision to use USWDS as the default design system while maintaining design system-agnostic flexibility. It provides the technical infrastructure to achieve that flexibility through programmatically generated design tokens.

## Implementation Plan

The token system will be built in 10 phases over 20-29 days.

### Phase 1: Foundation (Days 1-3)

**Goal:** Extract all USWDS tokens to structured JSON

- Install `@uswds/uswds@~3.13.0` as devDependency
- Install `tsx@4.19.2` for running TypeScript generators
- Install `sass@1.83.4` for parsing Sass (if needed)
- Create generator directory structure
- Investigate USWDS package structure
- Implement token parser (`parse-uswds-tokens.ts`)
- Extract all ~500+ tokens to `token-sources/uswds-tokens.json`
- Write comprehensive tests
- Document token structure

**Deliverable:** `uswds-tokens.json` with all USWDS design tokens

### Phase 2: CSS Token Generation (Days 4-6)

**Goal:** Generate CSS custom property files

- Implement `generate-css-tokens.ts`
- Generate `color.css` (~310 tokens)
- Generate `spacing.css` (~45 tokens)
- Generate `typography.css` (~100 tokens)
- Generate other token files (shadow, opacity, z-index, flex, order)
- Generate `all.css` convenience import
- Write tests for CSS generation
- Validate output format

**Deliverable:** Complete set of CSS token files in `design-tokens/`

### Phase 3: Utility Class Generation (Days 7-9)

**Goal:** Generate utility classes for all tokens

- Implement `generate-utilities.ts`
- Generate color utilities (~930 classes)
  - `.text-{token}` (~310)
  - `.bg-{token}` (~310)
  - `.border-{token}` (~310)
- Generate spacing utilities (~360 classes)
  - `.padding-{token}`, `.padding-x-{token}`, `.padding-y-{token}`
  - `.margin-{token}`, `.margin-x-{token}`, `.margin-y-{token}`
- Generate typography utilities (~200 classes)
  - `.font-{token}`, `.text-{size}`, `.font-weight-{token}`
- Write tests for utility generation
- Validate CSS class naming

**Deliverable:** Complete set of utility CSS files in `utilities/`

### Phase 4: Type Safety (Days 10-11)

**Goal:** Generate comprehensive TypeScript definitions

- Implement `generate-types.ts`
- Generate token type unions (e.g., `ColorToken`, `SpacingToken`)
- Generate CSS variable helper types
- Generate utility class name types
- Write tests for type correctness
- Validate with existing components

**Deliverable:** `design-tokens.ts` with full type definitions

### Phase 5: WCAG Compliance (Days 12-13)

**Goal:** Add contrast validation capabilities

- Implement contrast calculation utilities
- Implement `generate-contrast-matrix.ts`
- Generate contrast validation matrix for all color pairs
- Create runtime validation functions
- Write tests for WCAG calculations
- Document contrast checking API

**Deliverable:** Contrast utilities and validation matrix

### Phase 6: Theme System (Days 14-15)

**Goal:** Create default and dark themes

- Create `uswds-light.css` (default theme)
- Create `uswds-dark.css` (dark mode overrides)
- Implement runtime theme switching (`theme.ts`)
- Add theme persistence (localStorage)
- Add system preference detection
- Write tests for theme switching
- Document theming API

**Deliverable:** Complete theme system with dark mode support

### Phase 7: Build Configuration (Days 16-17)

**Goal:** Integrate generators into build process

- Update `vite.config.ts` for tree-shakeable CSS
- Configure package.json exports for all entry points
- Add prebuild script to run all generators
- Configure rollup for CSS bundling
- Optimize output for production
- Write build integration tests
- Document build process

**Deliverable:** Fully integrated build system

### Phase 8: Testing (Days 18-20)

**Goal:** Achieve comprehensive test coverage

- Unit tests for all generators (100% coverage)
- Unit tests for contrast utilities
- Integration tests for theme switching
- E2E tests with components
- Visual regression tests in Storybook
- Performance benchmarks
- Accessibility testing

**Deliverable:** Complete test suite with 100% coverage

### Phase 9: Documentation (Days 21-23)

**Goal:** Create comprehensive documentation

- Create Storybook stories for all token categories
- Create interactive contrast checker story
- Write usage guide for consumers
- Write customization guide (3 levels)
- Write migration guide
- Document tree-shaking strategies
- Create example projects
- API reference documentation

**Deliverable:** Complete documentation in Storybook and README

### Phase 10: Refinement (Days 24-29)

**Goal:** Optimize and polish

- Performance optimization
- Bundle size analysis and reduction
- Code review and refactoring
- Bug fixes from testing
- Documentation improvements
- Prepare release notes

**Deliverable:** Production-ready token system

## Consequences

### Positive

✅ **Single Source of Truth:** USWDS is authoritative; updates flow automatically
✅ **Type Safety:** Comprehensive TypeScript definitions prevent invalid token usage
✅ **Optimal Bundle Size:** Tree-shaking allows importing only needed tokens
✅ **Maximum Flexibility:** Supports individual overrides, component-level, and wholesale swapping
✅ **WCAG Built-In:** Automated contrast validation ensures accessibility
✅ **Zero Runtime Cost:** CSS variables resolved by browser, no JS overhead
✅ **Developer Experience:** Utility classes + CSS variables provide multiple APIs
✅ **Maintainability:** Programmatic generation means easy updates when USWDS releases new tokens
✅ **Dark Mode Support:** Built-in with minimal overhead
✅ **Documentation:** Storybook provides interactive token explorer
✅ **Future-Proof:** Easy to swap design systems or add new token categories

### Negative

⚠️ **Build Complexity:** Adds generator scripts and prebuild step
⚠️ **Learning Curve:** Developers need to understand token system and customization patterns
⚠️ **Bundle Size (Unoptimized):** ~500 tokens + ~1500 utilities = significant CSS if tree-shaking not used
⚠️ **USWDS Dependency:** Tightly coupled to USWDS structure; major USWDS changes may require generator updates
⚠️ **Generated File Changes:** Large diffs in git when tokens update

### Neutral

ℹ️ **Maintenance:** Generators need updates when USWDS token structure changes
ℹ️ **Performance:** CSS variable cascade has negligible performance impact in modern browsers
ℹ️ **Specificity:** Utility classes must be carefully scoped to avoid conflicts
ℹ️ **Git History:** Generated files may clutter git history (can be mitigated with .gitattributes)

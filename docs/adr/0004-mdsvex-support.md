# ADR-0004: mdsvex Support

## Status

Accepted

## Date

2026-07-15

## Context

Users of the Svelte UI component library need a way to build documentation sites, blogs, and content-heavy applications that leverage USWDS styling. While the library provides UI components, there's a gap for content-focused applications where markdown is the primary authoring format.

**User Needs:**

1. Build documentation sites for the component library itself
2. Create government content websites with markdown authoring
3. Build blogs and content platforms using USWDS design
4. Mix markdown content with interactive Svelte components
5. Maintain USWDS typography and accessibility standards in prose content

**Technical Requirements:**

1. Support markdown files as Svelte components
2. Enable Svelte component usage within markdown
3. Apply USWDS prose styling automatically
4. Support frontmatter for page metadata
5. Maintain type safety with TypeScript
6. Keep the feature optional (not all users need it)

## Decision

We will add **optional mdsvex support** to the component library with the following approach:

### 1. mdsvex as Optional Peer Dependency

- Add `mdsvex ^0.12.3` as an **optional peer dependency**
- Users must explicitly install mdsvex if they want to use this feature
- Does not bloat the main library bundle

```json
{
  "peerDependencies": {
    "@uswds/uswds": "^3.13.0",
    "mdsvex": "^0.12.3",
    "svelte": "^5.56.1"
  },
  "peerDependenciesMeta": {
    "mdsvex": {
      "optional": true
    }
  }
}
```

### 2. Minimal mdsvex Directory Structure

Create a dedicated `src/lib/mdsvex/` directory containing **only mdsvex-specific items**:

```
src/lib/
├── components/              # General-purpose components
│   ├── Button/
│   ├── Link/
│   ├── Tag/
│   └── ...
└── mdsvex/                  # mdsvex-specific only
    ├── layouts/
    │   ├── DocsLayout.svelte        # Layout with frontmatter support
    │   └── custom-elements/
    │       ├── h1.svelte            # USWDS-styled heading wrapper
    │       ├── h2.svelte
    │       ├── h3.svelte
    │       ├── h4.svelte
    │       ├── h5.svelte
    │       ├── h6.svelte
    │       ├── p.svelte             # Paragraph wrapper
    │       └── index.ts
    └── index.ts                     # Exports DocsLayout
```

### 3. DocsLayout Component

A layout component that:

- Wraps `.svx` content in `<article class="usa-prose">`
- Receives frontmatter as props (title, description, author, date)
- Exports custom element replacements via `<script module>`
- Uses existing library components (Link) for element replacement

**Frontmatter Props:**

```typescript
interface DocsLayoutProps {
  title?: string;
  description?: string;
  author?: string;
  date?: string;
}
```

**Custom Element Replacements:**

- `h1-h6` → Custom heading wrappers with USWDS prose styling
- `p` → Custom paragraph wrapper
- `a` → Existing Link component from the library

### 4. Export Strategy

Separate export path for mdsvex components:

```json
{
  "exports": {
    ".": "./src/lib/index.ts",
    "./mdsvex": "./src/lib/mdsvex/index.ts",
    "./mdsvex/layouts/DocsLayout.svelte": "./src/lib/mdsvex/layouts/DocsLayout.svelte"
  }
}
```

**Usage:**

```javascript
// Named import
import { DocsLayout } from "@gsa-tts/svelte-ui-uswds/mdsvex";

// Direct path (for mdsvex config)
mdsvex({
  layout: "@gsa-tts/svelte-ui-uswds/mdsvex/layouts/DocsLayout.svelte",
});
```

### 5. TypeScript Support

Add ambient module declarations for `.svx` and `.md` files:

```typescript
declare module "*.svx" {
  import type { SvelteComponent } from "svelte";
  export default class Comp extends SvelteComponent {}
  export const metadata: Record<string, unknown>;
}
```

### 6. USWDS Prose Styling

Rely on USWDS `.usa-prose` container class for automatic element styling:

- No explicit classes on individual elements
- USWDS automatically styles descendants
- Maintains accessibility standards
- Optimal typography (line height, measure, spacing)

## Consequences

### Positive

1. **Enables content-focused applications** - Users can build documentation sites, blogs, and content platforms
2. **Maintains library focus** - mdsvex is optional, doesn't affect core library users
3. **Leverages existing components** - Reuses Link component, no duplication
4. **USWDS compliance** - Automatic prose styling maintains design system standards
5. **Minimal maintenance** - Small surface area (1 layout, 7 element wrappers)
6. **Separate export path** - Clear separation between core and mdsvex functionality
7. **Type safety** - Full TypeScript support with module declarations
8. **SSG/SSR compatible** - Works with all SvelteKit rendering modes

### Negative

1. **Additional documentation** - Need to document mdsvex usage
2. **Another dependency** - Users must install mdsvex separately
3. **Increased support surface** - May receive mdsvex-related questions
4. **Testing complexity** - Need to test `.svx` file processing
5. **Version compatibility** - Must track mdsvex version compatibility

### Mitigations

- Comprehensive documentation in `docs/mdsvex/USAGE.md`
- Example `.svx` files demonstrating usage
- Clear documentation that mdsvex is optional
- Storybook stories for DocsLayout component
- Version pinning in peer dependencies

## Alternatives Considered

### Alternative 1: Don't Support mdsvex

**Pros:**

- Simpler library
- Smaller maintenance burden
- Fewer dependencies

**Cons:**

- Users must build their own layouts
- Miss opportunity to provide value for content sites
- No standardized way to use library in documentation

**Rejected because:** The value to users outweighs the minimal maintenance cost.

### Alternative 2: Make mdsvex a Direct Dependency

**Pros:**

- Simpler installation
- Always available

**Cons:**

- Increases bundle size for all users
- Not all users need mdsvex
- Violates principle of optional features

**Rejected because:** Should be opt-in, not forced on all users.

### Alternative 3: Create Separate Package

Create `@gsa-tts/svelte-ui-uswds-mdsvex` as a separate package.

**Pros:**

- Complete separation of concerns
- Independent versioning

**Cons:**

- Extra package to maintain
- More complex installation for users
- Duplication of types and configs

**Rejected because:** Overhead not justified for 1 layout component.

### Alternative 4: Create Multiple Layouts

Provide `DocsLayout`, `BlogLayout`, `ArticleLayout` in initial release.

**Pros:**

- More options for users
- Covers more use cases

**Cons:**

- More to maintain
- Not clear what users need yet
- Can add later if needed

**Rejected because:** Start minimal, add layouts based on user feedback.

## Implementation Notes

### Files Created

1. `src/lib/mdsvex/layouts/DocsLayout.svelte`
2. `src/lib/mdsvex/layouts/DocsLayout.types.ts`
3. `src/lib/mdsvex/layouts/DocsLayout.stories.svelte`
4. `src/lib/mdsvex/layouts/custom-elements/h1.svelte`
5. `src/lib/mdsvex/layouts/custom-elements/h2.svelte`
6. `src/lib/mdsvex/layouts/custom-elements/h3.svelte`
7. `src/lib/mdsvex/layouts/custom-elements/h4.svelte`
8. `src/lib/mdsvex/layouts/custom-elements/h5.svelte`
9. `src/lib/mdsvex/layouts/custom-elements/h6.svelte`
10. `src/lib/mdsvex/layouts/custom-elements/p.svelte`
11. `src/lib/mdsvex/layouts/custom-elements/index.ts`
12. `src/lib/mdsvex/index.ts`
13. `docs/mdsvex/USAGE.md`
14. `docs/mdsvex/examples/basic-usage.svx`
15. `docs/mdsvex/examples/with-components.svx`
16. `docs/mdsvex/examples/custom-elements.svx`

### Files Modified

1. `package.json` - Added mdsvex peer dependency and exports
2. `src/lib/ambient.d.ts` - Added `.svx` and `.md` module declarations
3. `README.md` - Added mdsvex section

### Testing

- Storybook stories for DocsLayout (6 stories with interaction tests)
- Example `.svx` files for manual testing
- TypeScript type checking passes

### Future Enhancements

Potential additions based on user feedback:

- `BlogLayout` - Blog-specific layout
- `ArticleLayout` - Long-form article layout
- `TOC` component - Table of contents generation
- `Breadcrumb` integration - For documentation sites
- Custom syntax highlighters - Beyond default Prism

## References

- [mdsvex Documentation](https://mdsvex.pngwn.io/)
- [USWDS Prose Component](https://designsystem.digital.gov/components/prose/)
- [USWDS Typography](https://designsystem.digital.gov/components/typography/)
- [SvelteKit Documentation](https://kit.svelte.dev/)

## Related ADRs

- [ADR-0001: Initial Architecture](./0001-initial-architecture.md)
- [ADR-0002: Consolidate Tests Into Stories](./0002-consolidate-tests-into-stories.md)

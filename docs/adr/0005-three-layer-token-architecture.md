# ADR-0005: Three-Layer Token Architecture with Foundation, Semantic, and Component Layers

## Status

Accepted

## Date

2026-06-05

## Authors

- Jeff Keene (Engineer)
- AI Agent (Co-author)

## Context

Following the implementation of the USWDS token parser (ADR-0003, ADR-0004), we need to define how design tokens are organized and consumed by components.

### Problem Statement

We need an architecture that:

1. **Supports multiple design systems** - Start with USWDS, easily add Material, Bootstrap, Tailwind
2. **Makes components design-system agnostic** - Components work with any design system
3. **Allows easy design system swapping** - Change one import, not component code
4. **Maintains type safety** - TypeScript knows about all tokens
5. **Scales well** - Clear organization as we add more design systems
6. **Follows best practices** - Aligns with design token standards

### Current State

After Phase 1 and Phase 2:

- ✅ 688 USWDS tokens parsed from source
- ✅ CSS custom properties generated
- ❌ No clear separation between design-system-specific and universal tokens
- ❌ Components would need to know which design system they're using

### Requirements

Based on project goals and architecture discussions:

| Requirement                | Approach                                                                   |
| -------------------------- | -------------------------------------------------------------------------- |
| Design System Independence | Components use component-specific token names                              |
| Multiple Design Systems    | Each system has its own foundation layer                                   |
| Easy Swapping              | Change one CSS import, not component code                                  |
| Clear Organization         | Separate foundation (specific) → semantic (universal) → component (scoped) |
| Easy Customization         | Override component tokens without touching component code                  |
| Type Safety                | TypeScript definitions for all token layers                                |
| USWDS Alignment            | File structure matches USWDS token categories                              |
| Minimal Token Layers       | Foundation (688) → Semantic (66) → Component (~60)                         |

## Decision

We will implement a **three-layer token architecture**:

### Layer 1: Foundation (Design System Specific)

The foundation layer contains design-system-specific tokens with their original names.

**Structure (matches USWDS token categories):**

```
src/tokens/foundation/
├── uswds/              # USWDS design tokens
│   ├── color.css       # Color tokens (521 tokens)
│   ├── spacing.css     # Spacing units (41 tokens)
│   ├── typesetting.css # Font families, sizes, weights, etc. (72 tokens)
│   ├── shadow.css      # Shadow tokens (6 tokens)
│   ├── opacity.css     # Opacity tokens (11 tokens)
│   ├── z-index.css     # Z-index tokens (8 tokens)
│   ├── flex.css        # Flex tokens (14 tokens)
│   ├── order.css       # Order tokens (15 tokens)
│   └── all.css         # Import all
├── material/           # Material Design tokens (future)
│   └── all.css
└── bootstrap/          # Bootstrap tokens (future)
    └── all.css
```

**Example - USWDS Foundation:**

```css
/* tokens/foundation/uswds/color.css */
:root {
  /* System Colors - Raw hex values */
  --red-5: #fef2f2;
  --blue-60v: #005ea2;

  /* Theme Colors - References to system */
  --primary: var(--blue-60v);
  --secondary: var(--red-50);

  /* State Colors */
  --error: var(--red-warm-50v);
  --success: var(--green-cool-40v);
}
```

**Token Counts (USWDS):**

- Color: 521 tokens (463 system + 31 theme + 27 state)
- Spacing: 41 tokens
- Typesetting: 72 tokens (families, sizes, weights, line heights, letter spacing, measure)
- Shadow: 6 tokens
- Opacity: 11 tokens
- Z-index: 8 tokens
- Flex: 14 tokens
- Order: 15 tokens
- **Total: 688 foundation tokens**

**File Organization:**

Foundation files are organized to match USWDS design token categories as documented at https://designsystem.digital.gov/design-tokens/. This ensures:

1. Intuitive mapping between USWDS documentation and our token files
2. Easy to find tokens by USWDS category name
3. Clear separation of concerns (color, spacing, typesetting, etc.)
4. Scalable structure as USWDS adds new token categories

### Layer 2: Semantic (Universal/Design System Agnostic)

The semantic layer provides universal token names that map to the current foundation layer.

**Structure (matches Foundation layer):**

```
src/tokens/semantic/
├── color.css           # Color tokens (26 tokens)
├── spacing.css         # Spacing tokens (12 tokens)
├── typesetting.css     # Typography tokens (15 tokens)
├── shadow.css          # Shadow tokens (3 tokens)
├── opacity.css         # Opacity tokens (3 tokens)
├── z-index.css         # Z-index tokens (3 tokens)
├── flex.css            # Flex tokens (2 tokens)
├── order.css           # Order tokens (2 tokens)
└── all.css             # Import all
```

**Example - Semantic Layer:**

```css
/* tokens/semantic/color.css */
:root {
  /* Brand Colors */
  --color-primary: var(--primary);
  --color-secondary: var(--secondary);

  /* UI Colors */
  --color-text: var(--base-darkest);
  --color-bg: var(--white);
  --color-border: var(--base-light);

  /* Interactive States */
  --color-interactive: var(--primary);
  --color-interactive-hover: var(--primary-dark);

  /* Feedback Colors */
  --color-error: var(--error);
  --color-success: var(--success);
}
```

**Token Counts:**

- Color: 26 tokens
- Spacing: 12 tokens
- Typesetting: 15 tokens
- Shadow: 3 tokens
- Opacity: 3 tokens
- Z-index: 3 tokens
- Flex: 2 tokens
- Order: 2 tokens
- **Total: 66 semantic tokens**

**File Organization:**

Semantic files mirror the foundation layer structure exactly. This provides:

1. One-to-one mapping between foundation and semantic categories
2. Predictable file organization across all token layers
3. Easy mental model: same categories at every layer
4. Simplified documentation and imports

### Layer 3: Component (Component-Specific)

The component layer provides component-specific tokens that map to semantic tokens. This layer makes components highly customizable without modifying component code.

**Structure:**

```
src/tokens/components/
├── button.css
├── input.css
├── checkbox.css
└── all.css
```

**Example - Component Layer (Button):**

```css
/* tokens/components/button.css */
:root {
  /* Colors */
  --button-bg: var(--color-interactive);
  --button-bg-hover: var(--color-interactive-hover);
  --button-text: var(--color-text-inverse);
  --button-border: var(--color-interactive);

  /* Spacing */
  --button-padding-y: var(--space-padding-sm);
  --button-padding-x: var(--space-padding-md);

  /* Typography */
  --button-font-family: var(--font-body);
  --button-font-size: var(--text-base);
  --button-font-weight: var(--weight-medium);

  /* Effects */
  --button-border-radius: var(--radius-md);
  --button-transition: var(--transition-fast);
}
```

**Token Counts (MVP):**

- Button: 24 tokens
- Input: 17 tokens
- Checkbox: 16 tokens
- **Total: 57 component tokens**

### Component Integration

**Components ALWAYS use component tokens:**

```svelte
<!-- Button.svelte -->
<button class="button">
  <slot />
</button>

<style>
  .button {
    /* Use component tokens - easily customizable! */
    background-color: var(--button-bg);
    color: var(--button-text);
    padding: var(--button-padding-y) var(--button-padding-x);
    border: 1px solid var(--button-border);
    border-radius: var(--button-border-radius);
    font-family: var(--button-font-family);
    font-size: var(--button-font-size);
    font-weight: var(--button-font-weight);
    transition: var(--button-transition);
  }

  .button:hover {
    background-color: var(--button-bg-hover);
  }
}
</style>
```

### User Integration

**Users import all three layers:**

```css
/* app.css - Using USWDS */
@import "svelte-ui/tokens/foundation/uswds/all.css";
@import "svelte-ui/tokens/semantic/all.css";
@import "svelte-ui/tokens/components/all.css";
```

**Switching to Material Design (future):**

```css
/* app.css - Switch to Material Design */
@import "svelte-ui/tokens/foundation/material/all.css"; /* Change this line */
@import "svelte-ui/tokens/semantic/all.css"; /* Keep this line */
@import "svelte-ui/tokens/components/all.css"; /* Keep this line */
```

Components work unchanged! ✅

**Easy component customization:**

```css
/* Custom theme - just override component tokens */
:root {
  --button-bg: purple;
  --button-border-radius: 999px; /* Pill buttons */
  --input-border-radius: 0; /* Square inputs */
}
```

**Scoped customization:**

```css
/* Customize buttons in sidebar only */
.sidebar {
  --button-bg: var(--color-secondary);
  --button-padding-x: var(--space-lg);
}
```

## Implementation

### Token Generation Pipeline

```
USWDS Package
    ↓
Token Parser (parse-tokens/uswds/index.ts)
    ↓
Token JSON (token-sources/uswds-tokens.json)
    ↓
Foundation Token Generator (generate-foundation-tokens.ts)
    ↓
Foundation Token Files (tokens/foundation/uswds/*.css)
    ↓
Semantic Token Generator (generate-semantic-tokens.ts)
    ↓
Semantic Token Files (tokens/semantic/*.css)
    ↓
Component Token Generator (generate-component-tokens.ts)
    ↓
Component Token Files (tokens/components/*.css)
```

### Semantic Token Mapping

**Defined in:** `src/lib/token-generators/semantic-mappings.ts`

```typescript
export interface SemanticTokenMapping {
  semantic: string; // Universal token name (--color-primary)
  foundation: string; // Foundation token (primary)
  category: "color" | "spacing" | "typography" | "effects" | "layout";
  description: string;
}

export const uswdsSemanticMappings: SemanticTokenMapping[] = [
  {
    semantic: "color-primary",
    foundation: "primary",
    category: "color",
    description: "Primary brand color for buttons, links, and key UI elements",
  },
  // ... 61 more mappings
];
```

### Component Token Mapping

**Defined in:** `src/lib/token-generators/component-mappings.ts`

```typescript
export interface ComponentTokenDefinition {
  token: string; // Component token name (button-bg)
  semantic: string; // Semantic token reference (color-primary)
  category: "color" | "spacing" | "typography" | "effects" | "layout";
  description: string;
}

export const buttonTokens: ComponentTokens = {
  component: "button",
  tokens: [
    {
      token: "button-bg",
      semantic: "color-interactive",
      category: "color",
      description: "Default button background color",
    },
    // ... 23 more button tokens
  ],
};
```

### Generation Commands

```bash
# Generate foundation tokens from USWDS
npm run generate:css

# Generate semantic layer from mappings
npm run generate:semantic

# Generate component tokens from mappings
npm run generate:components

# Generate all layers
npm run generate:all
```

## Alternatives Considered

### Alternative 1: Two Layers Only (Foundation → Semantic)

**Approach:** Components use semantic tokens directly (--color-interactive, --space-padding-sm)

**Pros:**

- Simpler - two layers instead of three
- Fewer files to maintain
- Less indirection

**Cons:**

- ❌ Hard to customize individual components without global changes
- ❌ No component-scoped token overrides
- ❌ Components can't have sensible defaults independent of semantic layer
- ❌ Harder to theme specific components

**Decision:** ❌ Rejected - Component layer provides crucial customization without code changes

### Alternative 2: Single Layer (Design System Specific Only)

**Approach:** Components use foundation tokens directly (--primary, --spacing-2)

**Pros:**

- Simpler - one layer instead of two
- Fewer files to maintain
- Direct mapping, no indirection

**Cons:**

- ❌ Components tied to specific design system
- ❌ Can't swap design systems without rewriting components
- ❌ Token name collisions between design systems
- ❌ No universal component library possible

**Decision:** ❌ Rejected - Conflicts with design system agnostic goal

### Alternative 3: Four Layers (Foundation → Theme → Semantic → Component)

**Approach:** Foundation → Custom Theme Layer → Semantic Layer

**Pros:**

- Maximum flexibility
- Users can define custom themes

**Cons:**

- ❌ Too complex for MVP
- ❌ Adds unnecessary indirection
- ❌ Harder to understand and maintain
- ❌ Users can already override semantic tokens directly

**Decision:** ❌ Rejected - Over-engineered for current needs; semantic + component layers provide sufficient customization

### Alternative 4: JavaScript Config Object

**Approach:** Tokens defined in JS/TS, injected at runtime

**Pros:**

- Type-safe token access
- Can compute values dynamically
- Programmatic token manipulation

**Cons:**

- ❌ Runtime overhead
- ❌ Harder to override with CSS
- ❌ No static CSS analysis
- ❌ Conflicts with pure CSS requirement from ADR-0003

**Decision:** ❌ Rejected - User required pure CSS overrides

## Consequences

### Positive

1. ✅ **Design system agnostic components** - Work with any design system
2. ✅ **Easy design system swapping** - One import change
3. ✅ **Easy component customization** - Override component tokens without code changes
4. ✅ **Scoped customization** - Can customize per-component or per-section
5. ✅ **Clear organization** - Three distinct layers with clear purposes
6. ✅ **Scalable** - Easy to add new design systems and components
7. ✅ **Type safe** - TypeScript knows all token names across all layers
8. ✅ **Minimal token counts** - Foundation (688) → Semantic (66) → Component (~60)
9. ✅ **Self-documenting** - Component tokens show what's customizable
10. ✅ **USWDS alignment** - File structure matches official USWDS categories
11. ✅ **Future-proof** - Architecture supports growth and new USWDS categories

### Negative

1. ⚠️ **Three-layer indirection** - Component → Semantic → Foundation → Value (4 hops)
2. ⚠️ **More files** - Separate foundation, semantic, and component files
3. ⚠️ **Learning curve** - Users must understand three layers
4. ⚠️ **Maintenance** - Must maintain semantic + component mappings per design system

### Neutral

1. 📝 **CSS variable performance** - Modern browsers handle nested vars well (4 hops acceptable)
2. 📝 **Bundle size** - ~60KB total for all tokens (acceptable)
3. 📝 **Token expansion** - All layers will grow as components grow

## Token Category Breakdown

### Foundation Layer (688 tokens)

Organized by USWDS design token categories:

| Category        | Tokens | Description                                                                               |
| --------------- | ------ | ----------------------------------------------------------------------------------------- |
| **Color**       | 521    | System colors (463), theme colors (31), state colors (27)                                 |
| **Spacing**     | 41     | Spacing units from 1px to 15rem                                                           |
| **Typesetting** | 72     | Families (18), sizes (30), weights (7), line heights (6), letter spacing (4), measure (7) |
| **Shadow**      | 6      | Box shadow values (1-5, none)                                                             |
| **Opacity**     | 11     | Opacity values (0-100 in 10% increments)                                                  |
| **Z-index**     | 8      | Layering values (0, 100, 200, 300, 400, 500, bottom, top)                                 |
| **Flex**        | 14     | Flex shorthand values                                                                     |
| **Order**       | 15     | Flexbox order values (first, last, initial, 0-11)                                         |

### Semantic Layer (66 tokens)

Universal tokens that map to foundation layer:

| Category        | Tokens | Description                                                                               |
| --------------- | ------ | ----------------------------------------------------------------------------------------- |
| **Color**       | 26     | Brand (3), text (4), background (4), border (2), interactive (4), feedback (8), focus (1) |
| **Spacing**     | 12     | Scale (7), component spacing (5)                                                          |
| **Typesetting** | 15     | Families (3), sizes (6), weights (3), line heights (3)                                    |
| **Shadow**      | 3      | Small, medium, large                                                                      |
| **Opacity**     | 3      | Disabled, hover, overlay                                                                  |
| **Z-index**     | 3      | Dropdown, modal, tooltip                                                                  |
| **Flex**        | 2      | Auto, fill                                                                                |
| **Order**       | 2      | First, last                                                                               |

### Component Layer (57 tokens)

Component-specific tokens for MVP components:

| Component    | Tokens | Description                          |
| ------------ | ------ | ------------------------------------ |
| **Button**   | 24     | Colors, spacing, typography, effects |
| **Input**    | 17     | Colors, spacing, typography, effects |
| **Checkbox** | 16     | Colors, spacing, typography, effects |

## Adding New Design Systems

To add a new design system (e.g., Material Design):

1. **Create foundation parser:**

   ```typescript
   // src/lib/token-generators/parse-material-tokens.ts
   export function parseMaterialTokens(): ParsedTokens {
     // Parse Material Design tokens
   }
   ```

2. **Create semantic mappings:**

   ```typescript
   // src/lib/token-generators/material-semantic-mappings.ts
   export const materialSemanticMappings: SemanticTokenMapping[] = [
     {
       semantic: "color-primary",
       foundation: "blue-500", // Material Design token
       category: "color",
       description: "Primary brand color",
     },
     // ... map all 62 semantic tokens
   ];
   ```

3. **Create component mappings (if different defaults needed):**

   ```typescript
   // src/lib/token-generators/material-component-mappings.ts
   // Optional - only if Material Design requires different component defaults
   export const materialButtonTokens: ComponentTokens = {
     component: "button",
     tokens: [
       {
         token: "button-border-radius",
         semantic: "radius-sm", // Material uses smaller radius
         category: "effects",
         description: "Button corner radius",
       },
       // ... other customizations
     ],
   };
   ```

4. **Generate foundation CSS:**

   ```bash
   npm run generate:css -- --design-system=material
   ```

5. **Users switch imports:**
   ```css
   @import "svelte-ui/tokens/foundation/material/all.css";
   @import "svelte-ui/tokens/semantic/all.css";
   @import "svelte-ui/tokens/components/all.css";
   ```

Components continue working unchanged! ✅

## File Structure

```
src/
├── lib/
│   └── token-generators/
│       ├── parse-tokens/
│       │   └── uswds/
│       │       └── index.ts                    # Parse USWDS tokens
│       ├── generate-foundation-tokens.ts       # Generate foundation tokens
│       ├── generate-semantic-tokens.ts         # Generate semantic tokens
│       ├── generate-component-tokens.ts        # Generate component tokens
│       ├── semantic-mappings/
│       │   ├── index.ts                        # Re-export mappings
│       │   └── uswds-semantic-mappings.ts      # USWDS → Semantic mappings
│       ├── component-mappings/                 # Semantic → Component mappings
│       │   ├── index.ts                        # Re-export all components
│       │   ├── button-tokens.ts                # Button token mappings
│       │   ├── input-tokens.ts                 # Input token mappings
│       │   └── checkbox-tokens.ts              # Checkbox token mappings
│       └── types.ts                            # Shared types
└── tokens/
    ├── foundation/
    │   ├── uswds/                          # USWDS foundation tokens (688 total)
    │   │   ├── color.css                   # 521 tokens
    │   │   ├── spacing.css                 # 41 tokens
    │   │   ├── typesetting.css             # 72 tokens
    │   │   ├── shadow.css                  # 6 tokens
    │   │   ├── opacity.css                 # 11 tokens
    │   │   ├── z-index.css                 # 8 tokens
    │   │   ├── flex.css                    # 14 tokens
    │   │   ├── order.css                   # 15 tokens
    │   │   └── all.css                     # Import all
    │   └── material/                       # Material Design (future)
    │       └── all.css
    ├── semantic/                           # Universal tokens (66 total)
    │   ├── color.css                       # 26 tokens
    │   ├── spacing.css                     # 12 tokens
    │   ├── typesetting.css                 # 15 tokens
    │   ├── shadow.css                      # 3 tokens
    │   ├── opacity.css                     # 3 tokens
    │   ├── z-index.css                     # 3 tokens
    │   ├── flex.css                        # 2 tokens
    │   ├── order.css                       # 2 tokens
    │   └── all.css                         # Import all
    └── components/                         # Component tokens (57 total)
        ├── button.css                      # 24 tokens
        ├── input.css                       # 17 tokens
        ├── checkbox.css                    # 16 tokens
        └── all.css                         # Import all
```

## Success Metrics

The three-layer architecture is successful when:

- ✅ Components use only component tokens (no semantic or foundation tokens in components)
- ✅ Can swap design systems with one import change
- ✅ Can customize any component by overriding component tokens
- ✅ Can scope customizations to specific sections/contexts
- ✅ Adding new design system takes <1 day
- ✅ Adding new component with tokens takes <1 hour
- ✅ Semantic layer covers 100% of component token mapping needs
- ✅ Component layer covers 100% of component styling needs
- ✅ TypeScript autocomplete works for all token layers
- ✅ No performance degradation from CSS variable indirection (4 hops acceptable)
- ✅ Bundle size remains under 100KB for all tokens
- ✅ File structure aligns with USWDS documentation categories

## References

- [ADR-0003: USWDS Design Token System](./0003-uswds-design-token-system.md)
- [ADR-0004: Hardcoded Token Values](./0004-hardcoded-token-values.md)
- [Design Tokens Community Group](https://www.w3.org/community/design-tokens/)
- [CSS Custom Properties (MDN)](https://developer.mozilla.org/en-US/docs/Web/CSS/--*)
- [USWDS Design Tokens](https://designsystem.digital.gov/design-tokens/)

## Related ADRs

- **ADR-0003:** USWDS Design Token System - Established token generation approach
- **ADR-0004:** Hardcoded Token Values - Decision to hardcode non-color tokens

## Revision History

| Date       | Change                                                                                                                                                   | Author               |
| ---------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------- |
| 2026-06-05 | Initial three-layer architecture decision                                                                                                                | Jeff Keene, AI Agent |
| 2026-06-05 | Implemented component token layer (57 tokens across 3 components)                                                                                        | Jeff Keene, AI Agent |
| 2026-06-08 | Reorganized file structure to match USWDS categories; split foundation into 8 files and semantic into 8 files; updated token counts (66 semantic tokens) | Jeff Keene, AI Agent |

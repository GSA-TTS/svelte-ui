# Design Token Generators

This directory contains build-time generators for the USWDS design token system.

## Overview

The token system is built programmatically by extracting all design tokens from `@uswds/uswds` and generating:

1. **CSS custom property files** (`:root` declarations)
2. **Utility class files** (`.text-*`, `.bg-*`, `.padding-*`, etc.)
3. **TypeScript type definitions** (type-safe token references)
4. **WCAG contrast validation matrices** (computed at build time)

## Architecture

```
USWDS Package (source)
       ↓
Token Parser (Phase 1) ✅
       ↓
uswds-tokens.json (672 tokens)
       ↓
    ┌──┴──────────┬────────────┬─────────────┐
    ↓             ↓            ↓             ↓
CSS Generator  Utility Gen  Type Gen    Contrast Gen
 (Phase 2)     (Phase 3)   (Phase 4)    (Phase 5)
    ↓             ↓            ↓             ↓
design-tokens/ utilities/  types/       contrast-matrix.json
  (CSS vars)   (classes)  (TS types)   (WCAG validation)
```

## Generator Scripts

### Phase 1: Token Parser ✅ COMPLETED

**Script:** `parse-uswds-tokens.ts`

Extracts all design tokens from `@uswds/uswds` and outputs structured JSON.

**Input:** 
- USWDS JSON files: `node_modules/@uswds/uswds/packages/uswds-tokens/colors/*.json`
- Hardcoded tokens: spacing, typography, shadow, opacity, z-index, flex, order

**Output:** `token-sources/uswds-tokens.json` (52KB, 672 tokens)

**Run:**
```bash
npm run generate:tokens
```

**Token Breakdown:**
- System colors: 463 tokens (24 families × ~19 grades/vivids)
- Theme colors: 31 tokens (primary, secondary, accent, base, etc.)
- State colors: 22 tokens (error, warning, success, info, disabled)
- Spacing: 41 tokens (pixel, rem, named, negative)
- Typography: 62 tokens (family, size, weight, line-height, letter-spacing, measure)
- Other: 53 tokens (shadow, opacity, z-index, flex, order)

**Tests:** 50 tests, 100% passing ✅

---

### Phase 2: CSS Token Generator (TODO)

**Script:** `generate-css-tokens.ts` (not yet implemented)

Generates CSS custom property files from `uswds-tokens.json`.

**Input:** `token-sources/uswds-tokens.json`

**Output:**
```
src/lib/styles/design-tokens/
  ├── all.css              # Imports all tokens
  ├── color.css            # --red-5, --blue-60v, --primary, etc.
  ├── spacing.css          # --spacing-1, --spacing-2, etc.
  ├── typography.css       # --font-sans, --font-size-md, etc.
  ├── shadow.css           # --shadow-1, --shadow-2, etc.
  ├── opacity.css          # --opacity-0, --opacity-50, etc.
  ├── z-index.css          # --z-index-100, --z-index-top, etc.
  ├── flex.css             # --flex-1, --flex-auto, etc.
  └── order.css            # --order-first, --order-1, etc.
```

**Run:**
```bash
npm run generate:css
```

---

### Phase 3: Utility Class Generator (TODO)

**Script:** `generate-utilities.ts` (not yet implemented)

Generates utility classes that reference CSS custom properties.

**Input:** `token-sources/uswds-tokens.json`

**Output:**
```
src/lib/styles/utilities/
  ├── all.css              # Imports all utilities
  ├── color.css            # .text-*, .bg-*, .border-* (~930 classes)
  ├── spacing.css          # .padding-*, .margin-* (~360 classes)
  └── typography.css       # .font-*, .text-* (~200 classes)
```

**Run:**
```bash
npm run generate:utilities
```

---

### Phase 4: TypeScript Type Generator (TODO)

**Script:** `generate-types.ts` (not yet implemented)

Generates type-safe TypeScript definitions for all tokens.

**Input:** `token-sources/uswds-tokens.json`

**Output:** `src/lib/types/design-tokens.ts`

**Run:**
```bash
npm run generate:types
```

**Generated Types:**
```typescript
export type ColorToken = 'red-5' | 'blue-60v' | 'primary' | ... ;
export type SpacingToken = '1px' | '05' | '1' | ... ;
export type ColorCSSVar = `--${ColorToken}`;
// ... etc
```

---

### Phase 5: Contrast Matrix Generator (TODO)

**Script:** `generate-contrast-matrix.ts` (not yet implemented)

Calculates WCAG contrast ratios for all color token pairs.

**Input:** `token-sources/uswds-tokens.json` (color tokens only)

**Output:** `src/lib/generated/contrast-matrix.json`

**Run:**
```bash
npm run generate:contrast
```

**Output Format:**
```json
{
  "primary": {
    "AA": ["white", "base-lightest", "gray-5"],
    "AAA": ["white"],
    "AA-Large": ["white", "base-lightest", "gray-5", "gray-10"]
  }
}
```

---

## Running All Generators

```bash
npm run generate:all
```

This runs all generators in sequence:
1. `generate:tokens` (extract from USWDS)
2. `generate:css` (create CSS variables)
3. `generate:utilities` (create utility classes)
4. `generate:types` (create TypeScript types)
5. `generate:contrast` (create WCAG matrix)

---

## File Structure

```
src/lib/generators/
├── __tests__/
│   └── parse-uswds-tokens.test.ts    # 50 tests ✅
├── token-sources/
│   └── uswds-tokens.json              # Generated output (52KB)
├── types.ts                           # TypeScript interfaces
├── parse-colors.ts                    # Color token parser
├── parse-theme-state-colors.ts        # Theme & state color parser
├── parse-spacing.ts                   # Spacing token parser
├── parse-typography.ts                # Typography token parser
├── parse-other-tokens.ts              # Shadow, opacity, z-index, etc.
├── parse-uswds-tokens.ts              # Main entry point ✅
├── generate-css-tokens.ts             # TODO: Phase 2
├── generate-utilities.ts              # TODO: Phase 3
├── generate-types.ts                  # TODO: Phase 4
├── generate-contrast-matrix.ts        # TODO: Phase 5
└── README.md                          # This file
```

---

## Token JSON Structure

See `token-sources/uswds-tokens.json` for the complete structure.

**Example:**
```json
{
  "version": "3.13.0",
  "colors": {
    "system": {
      "red-5": { "value": "#f9eeee", "grade": 5 },
      "blue-60v": { "value": "#0050d8", "grade": 60 }
    },
    "theme": {
      "primary": { "value": "blue-60v", "reference": true }
    },
    "state": {
      "error": { "value": "red-60v", "reference": true }
    }
  },
  "spacing": {
    "1": { "value": "0.5rem", "px": 8, "rem": "0.5rem" }
  },
  "typography": {
    "family": {
      "sans": { "value": ["Source Sans Pro", "Helvetica", ...] }
    },
    "size": {
      "md": { "value": "0.875rem", "px": 14 }
    }
  }
}
```

---

## Development Workflow

### When USWDS Updates

1. Update USWDS version: `npm install @uswds/uswds@~3.x.x`
2. Regenerate tokens: `npm run generate:all`
3. Review diff in `token-sources/uswds-tokens.json`
4. Run tests: `npm test`
5. Verify output in `src/lib/styles/`

### Adding New Token Categories

1. Add parser function in appropriate file (e.g., `parse-typography.ts`)
2. Update `types.ts` with new interfaces
3. Call parser in `parse-uswds-tokens.ts`
4. Add tests in `__tests__/parse-uswds-tokens.test.ts`
5. Update CSS/utility/type generators accordingly

---

## Testing

Run all generator tests:
```bash
npm test -- src/lib/generators/__tests__
```

Run specific test file:
```bash
npm test -- src/lib/generators/__tests__/parse-uswds-tokens.test.ts
```

**Current Test Coverage:** 50/50 tests passing (100%)

---

## Maintenance

### If Token Parsing Fails

1. Check USWDS package is installed: `ls node_modules/@uswds/uswds`
2. Verify JSON files exist: `ls node_modules/@uswds/uswds/packages/uswds-tokens/colors/`
3. Check USWDS version: `npm list @uswds/uswds`
4. Run tests to see specific failures: `npm test`
5. Review USWDS changelog for breaking changes

### If Tests Fail After USWDS Update

1. Check if token counts changed (expected)
2. Check if token structure changed (may require parser updates)
3. Update tests if USWDS added/removed tokens
4. Update parsers if JSON format changed

---

## References

- [USWDS Design Tokens Documentation](https://designsystem.digital.gov/design-tokens/)
- [USWDS GitHub Repository](https://github.com/uswds/uswds)
- [ADR-0003: USWDS Design Token System](../../docs/adr/0003-uswds-design-token-system.md)

---

## Status

**Phase 1 (Token Parser): ✅ COMPLETE**
- 672 tokens extracted
- 50 tests passing
- JSON output validated

**Phase 2-5: 🚧 TODO**
- CSS generation
- Utility generation
- Type generation
- Contrast matrix generation

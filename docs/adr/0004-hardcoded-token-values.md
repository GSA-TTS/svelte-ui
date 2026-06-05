# ADR-0004: Hardcoding Non-Color USWDS Token Values

## Status

Accepted

## Date

2026-06-05

## Authors

- Jeff Keene (Engineer)
- AI Agent (Co-author)

## Context

During implementation of the USWDS token parser (ADR-0003), we discovered that USWDS design tokens are stored in different formats within the `@uswds/uswds` package:

1. **System colors** - Available as JSON files
2. **All other tokens** - Stored as Sass maps, variables, and functions
3. **Some tokens** - Not defined in USWDS at all (standard CSS values)

### Problem Statement

We need to decide: Should we parse all tokens from USWDS source files, or is it acceptable to hardcode some token values?

### Investigation Results

#### ✅ Parseable from JSON (System Colors)

**Location:** `node_modules/@uswds/uswds/packages/uswds-tokens/colors/*.json`

**Example:** `red.json`, `blue.json`, `gray.json`, etc.

**Current Implementation:** Already parsing these directly in `parse-colors.ts`

```typescript
// Can parse directly from JSON
parseUSWDSColorFamily('node_modules/@uswds/uswds/packages/uswds-tokens/colors/red.json')
```

#### ⚠️ Available as Sass (Requires Compilation)

**Location:** `node_modules/@uswds/uswds/packages/uswds-core/src/styles/tokens/**/*.scss`

**Examples:**
- **Spacing:** `tokens/units/spacing.scss` - Uses `spacing-multiple()` function
- **Typography:** `tokens/font/typefaces.scss`, `tokens/font/stacks.scss` - Complex Sass maps
- **Theme/State colors:** `tokens/color/assignments-theme-color.scss` - Sass variables

**Why problematic:**

```scss
// Example from USWDS spacing.scss
$system-spacing: (
  "small": (
    "05": spacing-multiple(0.5),  // ← Function call, not static value
    1: spacing-multiple(1),       // ← Needs Sass execution
  )
);
```

To parse this, we would need to:
1. Parse Sass syntax
2. Execute Sass functions (which call other functions)
3. Compile to CSS
4. Extract computed values
5. Add `sass` as dependency (200KB+ npm package)
6. Wait seconds instead of milliseconds for generation

#### ❌ Not in USWDS Source

**Examples:** Opacity (0-100), Flex shorthand, Order values

**Why:** These are standard CSS values that USWDS utilities use, but USWDS doesn't define them as "tokens" - they're just utility values from the CSS specification.

### Token Source Summary

| Token Category | Source | Format | Parseable? |
|----------------|--------|--------|------------|
| System Colors | JSON files | JSON | ✅ Yes - Already parsing |
| Theme Colors | Sass variables | Sass map | ⚠️ Requires Sass compiler |
| State Colors | Sass variables | Sass map | ⚠️ Requires Sass compiler |
| Spacing | Sass map | Sass function | ⚠️ Requires Sass compiler |
| Typography | Sass maps | Sass map | ⚠️ Requires Sass compiler |
| Shadow | Sass palettes | Sass palette | ⚠️ Requires Sass compiler |
| Opacity | Not in source | N/A | ❌ No - Standard CSS |
| Z-index | Sass settings | Sass map | ⚠️ Requires Sass compiler |
| Flex | Not in source | N/A | ❌ No - CSS spec |
| Order | Not in source | N/A | ❌ No - CSS spec |

### Options Considered

#### Option 1: Full Sass Compilation

Parse and compile all Sass files to extract computed values.

**Approach:**
```typescript
import sass from 'sass';

const result = sass.compile(
  'node_modules/@uswds/uswds/packages/uswds-core/src/styles/tokens/units/spacing.scss'
);
// Parse CSS output to extract token values
```

**Pros:**
- Programmatically extracts all values
- Guaranteed to match USWDS output
- Automatically stays in sync with USWDS releases

**Cons:**
- Requires `sass` dependency (~200KB npm package)
- Significantly slower (seconds vs milliseconds)
- Complex parsing logic to extract values from compiled CSS
- Brittle - breaks if USWDS changes Sass structure
- Need to handle Sass imports, functions, variables

**Performance Impact:**
- Current: ~100-200ms to parse all tokens
- With Sass: ~2-5 seconds to compile and extract

#### Option 2: Sass AST Parsing

Parse Sass files to AST and extract values without compilation.

**Approach:**
```typescript
import { parse } from 'sass-parser';

const ast = parse(sassFile);
// Walk AST to find variables and maps
```

**Pros:**
- Potentially faster than full compilation
- More control over extraction

**Cons:**
- No standard Sass AST parser for JavaScript
- Still requires executing Sass functions for computed values
- Very complex implementation
- Still need to handle function calls like `spacing-multiple()`

#### Option 3: Hardcode with Verification (Selected)

Manually define token values, verify against USWDS documentation, and test with reference validation.

**Approach:**
```typescript
// parse-spacing.ts
export function parseUSWDSSpacingTokens(): Record<string, TokenValue> {
  return {
    '1px': { value: '1px', px: 1 },
    '05': { value: '0.25rem', px: 4, rem: '0.25rem' },
    '1': { value: '0.5rem', px: 8, rem: '0.5rem' },
    // ... verified against USWDS docs
  };
}
```

**Pros:**
- Fast - milliseconds to execute
- Simple - no external dependencies
- Reliable - values are stable (rarely change)
- Type-safe - TypeScript ensures correctness
- Well-tested - comprehensive test suite
- Documented - links to USWDS source documentation

**Cons:**
- Manual updates needed when USWDS releases new tokens
- Requires verification against USWDS documentation

## Decision

We will **hardcode non-color token values** (theme colors, state colors, spacing, typography, shadow, opacity, z-index, flex, order) with the following safeguards:

### Implementation Strategy

1. **Parse what we can** - System colors from JSON files (already implemented)

2. **Hardcode the rest** with comprehensive documentation:
   - Each parser file links to official USWDS documentation
   - Comments note last verified USWDS version
   - Inline comments explain token purposes

3. **Validate referential integrity**:
   ```typescript
   // Test that theme/state colors reference valid system colors
   it('should reference valid system colors', () => {
     Object.entries(tokens.colors.theme).forEach(([key, token]) => {
       if (token.reference) {
         expect(tokens.colors.system).toHaveProperty(token.value);
       }
     });
   });
   ```

4. **Version tracking**:
   ```typescript
   /**
    * Parse USWDS spacing tokens
    * 
    * Based on USWDS documentation:
    * https://designsystem.digital.gov/design-tokens/spacing-units/
    * 
    * Last verified: USWDS v3.13.0 (2024-06-04)
    */
   ```

5. **Comprehensive testing**:
   - Token existence tests
   - Structure validation tests
   - Reference integrity tests
   - Format validation tests

### Mitigation for Manual Updates

To minimize risk of outdated values:

1. **Documentation links** - Every parser references official USWDS docs
2. **Version tracking** - Comments note last verified USWDS version
3. **Test coverage** - 42 tests validate token structure and relationships
4. **Change detection** - Package.json pins USWDS version, updates are explicit

### When to Reconsider

Revisit this decision if:

1. **USWDS provides JSON exports** for all token types (unlikely)
2. **Update frequency increases** - USWDS releases breaking token changes frequently
3. **Multi-version support needed** - We need to support multiple USWDS versions simultaneously
4. **Performance becomes non-critical** - Generation speed no longer matters

## Consequences

### Positive

1. ✅ **Fast generation** - Token parsing completes in ~100-200ms (vs 2-5 seconds with Sass)
2. ✅ **No Sass dependency** - Reduces npm package size and installation time
3. ✅ **Simple codebase** - Easy to understand, maintain, and debug
4. ✅ **Stable values** - USWDS tokens change infrequently (1-2 times per year)
5. ✅ **Type safety** - TypeScript ensures correctness at compile time
6. ✅ **Well tested** - Comprehensive test suite validates all tokens
7. ✅ **Documented** - Clear documentation explains token sources

### Negative

1. ⚠️ **Manual updates** - Need to update hardcoded values when USWDS releases new tokens
2. ⚠️ **Verification burden** - Must manually verify against USWDS documentation
3. ⚠️ **Potential drift** - Risk of values becoming outdated if USWDS updates aren't tracked

### Neutral

1. 📝 **Design system specific** - Approach may differ for other design systems:
   - Material Design: Has JSON token files → Can parse
   - Bootstrap: Uses Sass → Would need similar hardcoding
   - Tailwind: Uses JS config → Can import and parse

## Implementation Details

### Current Token Counts (USWDS v3.13.0)

| Category | Count | Source | Method |
|----------|-------|--------|--------|
| System Colors | 463 | JSON files | Parsed |
| Theme Colors | 31 | Hardcoded | Verified against docs |
| State Colors | 27 | Hardcoded | Verified against docs |
| Spacing | 41 | Hardcoded | Verified against docs |
| Typography | 72 | Hardcoded | Verified against docs |
| Shadow | 6 | Hardcoded | Standard values |
| Opacity | 11 | Hardcoded | Standard values |
| Z-index | 8 | Hardcoded | Verified against docs |
| Flex | 14 | Hardcoded | CSS spec |
| Order | 15 | Hardcoded | CSS spec |
| **Total** | **688** | | |

### Files Modified

- `src/lib/token-generators/parse-colors.ts` - System color parsing (from JSON)
- `src/lib/token-generators/parse-theme-state-colors.ts` - Hardcoded theme/state colors
- `src/lib/token-generators/parse-spacing.ts` - Hardcoded spacing tokens
- `src/lib/token-generators/parse-typography.ts` - Hardcoded typography tokens
- `src/lib/token-generators/parse-other-tokens.ts` - Hardcoded shadow/opacity/z-index/flex/order
- `src/lib/token-generators/__tests__/parse-uswds-tokens.test.ts` - Comprehensive test suite

### Test Coverage

42 tests covering:
- Token existence validation
- Structure validation (hex colors, rem values, etc.)
- Reference integrity (theme/state → system colors)
- Type validation (arrays, numbers, strings)
- JSON output validation

## Alternatives Considered

### Future Automation Option

If manual updates become burdensome:

```bash
# Script to generate parsers from USWDS
npm run generate:parser-from-uswds
```

**Workflow:**
1. Compile USWDS Sass to CSS
2. Extract computed values
3. Generate TypeScript parser functions
4. Run tests to validate

**When to implement:** If USWDS token updates exceed 2-3 times per year or values change significantly.

## References

- [USWDS Design Tokens Documentation](https://designsystem.digital.gov/design-tokens/)
- [USWDS GitHub Repository](https://github.com/uswds/uswds)
- [ADR-0003: USWDS Design Token System](./0003-uswds-design-token-system.md)
- USWDS Package: `@uswds/uswds@3.13.0`

## Revision History

| Date | Change | Author |
|------|--------|--------|
| 2026-06-05 | Initial decision | Jeff Keene, AI Agent |


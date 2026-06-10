# ADR-0002: Consolidate Component Tests into Storybook Stories

## Status

Accepted

## Context

Component libraries face a unique challenge: they need comprehensive testing while also providing interactive documentation. Traditionally, this means maintaining three separate files per component:

1. `Component.svelte` - The component implementation
2. `Component.test.ts` - Unit tests with Vitest
3. `Component.stories.ts` - Storybook stories for documentation

This creates several problems:

- **Duplication:** Tests and stories often cover the same scenarios (rendering with different props, disabled state, variants, etc.)
- **Maintenance burden:** Changes to component APIs require updates in multiple files
- **Fragmentation:** Component behavior is documented in multiple places
- **Developer friction:** Switching between test files and stories disrupts workflow

Modern Storybook supports running Vitest tests directly within stories files, and offers interaction tests via the `play` function. This enables a single-source-of-truth approach where stories serve as both documentation and test specifications.

## Decision

We will **consolidate all component tests into `.stories.ts` files** and eliminate separate `.test.ts` files.

### Testing Approach

**1. Static Rendering Tests (Vitest)**

- Test component rendering with different prop combinations
- Test CSS class application
- Test aria attributes and accessibility
- Co-located with stories in `.stories.ts` files
- Run via `npm test` (Vitest)

**2. Interaction Tests (Storybook)**

- Test user interactions (clicks, input, keyboard navigation)
- Test state changes
- Test callbacks and events
- Defined using story `play` functions
- Run via `npm run test:storybook`

### File Structure

```
src/lib/components/Button/
├── Button.svelte          # Component implementation
└── Button.stories.ts      # Stories + unit tests + interaction tests
```

### Example Implementation

```typescript
// Button.stories.ts
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/svelte";
import { userEvent, within } from "@storybook/test";
import type { Meta, StoryObj } from "@storybook/svelte";
import Button from "./Button.svelte";

const meta = {
  title: "Components/Button",
  component: Button,
  tags: ["autodocs"],
} satisfies Meta<Button>;

export default meta;
type Story = StoryObj<typeof meta>;

// Storybook stories for documentation
export const Primary: Story = {
  args: { variant: "primary", children: "Primary Button" },
};

// Interaction tests using play function
export const Clickable: Story = {
  args: { variant: "primary", children: "Click Me" },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole("button");
    await userEvent.click(button);
    await expect(button).toBeInTheDocument();
  },
};

// Vitest unit tests in the same file
if (import.meta.vitest) {
  const { describe, it, expect } = import.meta.vitest;

  describe("Button rendering", () => {
    it("renders with default props", () => {
      render(Button, { props: { children: "Click me" } });
      expect(screen.getByRole("button")).toBeInTheDocument();
    });

    it("applies variant classes", () => {
      render(Button, { props: { variant: "secondary" } });
      const button = screen.getByRole("button");
      expect(button.className).toContain("bg-gray-600");
    });
  });
}
```

## Configuration

### vite.config.ts

```typescript
export default defineConfig({
  plugins: [svelte(), dts()],
  test: {
    include: ["src/**/*.{test,spec,stories}.{js,ts}"],
    includeSource: ["src/**/*.{js,ts,svelte}"],
    globals: true,
    environment: "jsdom",
  },
});
```

### tsconfig.json

```json
{
  "compilerOptions": {
    "types": ["vite/client", "vitest/globals", "vitest/importMeta"]
  }
}
```

## Consequences

### Positive

- ✅ **Single source of truth:** Component behavior documented in one place
- ✅ **Reduced maintenance:** One file to update when APIs change
- ✅ **Better DX:** Stories are living documentation AND test cases
- ✅ **Fewer files:** Simpler project structure
- ✅ **Better coverage visibility:** Tests and examples in same context
- ✅ **Faster iteration:** Edit story, see visual and test results immediately

### Negative

- ⚠️ **Larger story files:** `.stories.ts` files will contain more code
- ⚠️ **Learning curve:** Developers need to understand both Vitest and Storybook testing patterns
- ⚠️ **Build time:** Vitest may parse stories files even if tests aren't in watch mode

### Neutral

- ℹ️ **Test organization:** Need discipline to keep stories files well-organized
- ℹ️ **Import cost:** Stories files import test utilities even in production (tree-shaking mitigates this)

## Migration Plan

### Phase 1: Update Configuration

1. Update `vite.config.ts` to include `.stories.ts` in test patterns
2. Add `vitest/importMeta` to `tsconfig.json` types
3. Update `.gitignore` if needed

### Phase 2: Migrate Tests

1. Move unit tests from `.test.ts` to `.stories.ts` using `import.meta.vitest`
2. Convert appropriate unit tests to Storybook interaction tests
3. Verify all tests pass with `npm test`
4. Delete `.test.ts` files

### Phase 3: Documentation

1. Update README.md to document new testing approach
2. Create example showing both unit and interaction tests
3. Update ADR-0001 to reflect actual testing architecture

## Alternatives Considered

### Alternative 1: Keep Separate Test Files

**Pros:** Clear separation of concerns, smaller files
**Cons:** Duplication, maintenance burden, fragmentation
**Decision:** Rejected - maintenance burden outweighs benefits

### Alternative 2: Only Use Storybook Interaction Tests

**Pros:** Even simpler, one testing approach
**Cons:** Slower than Vitest, not ideal for all test types, requires running Storybook
**Decision:** Rejected - need fast unit tests that don't require Storybook runtime

### Alternative 3: Only Use Vitest, Skip Storybook Tests

**Pros:** Single test runner, very fast
**Cons:** Loses visual documentation value, no interaction testing in UI
**Decision:** Rejected - Storybook provides too much value for component library

## References

- [Vitest In-Source Testing](https://vitest.dev/guide/in-source.html)
- [Storybook Interaction Testing](https://storybook.js.org/docs/writing-tests/interaction-testing)
- [Storybook Test Runner](https://storybook.js.org/docs/writing-tests/test-runner)
- [Component Story Format (CSF)](https://storybook.js.org/docs/api/csf)

## Date

2026-06-01

## Authors

- Jeff Keene (Engineer)
- AI Agent (Co-author)

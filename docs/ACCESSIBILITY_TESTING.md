# Accessibility Testing

This project includes comprehensive accessibility (a11y) testing to ensure Section 508 compliance and WCAG standards.

## Tools

### 1. Storybook a11y Addon

The `@storybook/addon-a11y` addon provides automated accessibility testing for all stories.

**Features:**

- Automatic accessibility checks powered by axe-core
- Real-time visual feedback in Storybook UI
- Fails tests on violations when configured
- WCAG level configuration
- Integration with Storybook test runner

**Usage:**

```bash
npm run storybook
```

Open any story and check the "Accessibility" tab in the addon panel to see real-time accessibility checks.

### 2. Storybook Test Runner

The test runner executes all Storybook interaction tests and accessibility checks in CI/CD.

**Features:**

- Runs all `play()` functions from stories
- Automatically includes a11y checks from the addon
- CI/CD integration
- Detailed violation reports

## Configuration

Accessibility testing is configured at the story level using parameters:

```typescript
const meta = {
  title: "Components/MyComponent",
  component: MyComponent,
  parameters: {
    a11y: {
      // Fail tests on accessibility violations
      test: "error",
    },
  },
} satisfies Meta<MyComponent>;
```

**Configuration options:**

- `test: 'error'` - Fail tests on violations (recommended)
- `test: 'warn'` - Log warnings but don't fail
- `test: false` - Disable automatic testing (not recommended)

## Writing Tests

All tests are embedded in Storybook story files using `play()` functions.

### Basic Example

```typescript
import type { Meta, StoryObj } from "@storybook/svelte";
import { expect, userEvent, within } from "storybook/test";
import MyComponent from "./MyComponent.svelte";

const meta = {
  title: "Components/MyComponent",
  component: MyComponent,
  parameters: {
    a11y: {
      test: "error", // Fail on violations
    },
  },
} satisfies Meta<MyComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    // your args
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Test interactions - accessibility is tested automatically
    const button = canvas.getByRole("button");
    await expect(button).toBeInTheDocument();
    await userEvent.click(button);
  },
};
```

### Customizing Accessibility Rules

You can configure specific axe rules per story:

```typescript
export const Default: Story = {
  args: {
    // your args
  },
  parameters: {
    a11y: {
      test: "error",
      config: {
        rules: [
          {
            id: "color-contrast",
            enabled: true,
          },
          {
            id: "aria-required-attr",
            enabled: true,
          },
        ],
      },
    },
  },
};
```

### Testing Interactive States

Test both functionality and accessibility of interactive states:

```typescript
export const DisabledButton: Story = {
  args: {
    disabled: true,
    children: "Disabled Button",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Test that disabled state is properly implemented
    const button = canvas.getByRole("button");
    await expect(button).toBeDisabled();

    // Accessibility is checked automatically by the addon
  },
};
```

## Running Tests

### Development (with UI)

```bash
npm run storybook
```

Open the Accessibility tab to see real-time results.

### CI/CD (headless)

```bash
npm run test:storybook
```

Runs all stories with their interaction tests and accessibility checks.

### Vitest (component tests)

```bash
npm test
```

Runs Vitest tests including any story-based tests.

## CI/CD Integration

Accessibility tests run automatically in CI via the Storybook test runner:

```yaml
- name: Run Storybook tests
  run: npm run test:storybook
```

The build will fail if any accessibility violations are detected (when `test: 'error'` is configured).

## How It Works

1. **Addon Integration**: The `@storybook/addon-a11y` addon is configured in `.storybook/main.ts`
2. **Automatic Scanning**: When you navigate to a story, axe-core automatically scans the rendered component
3. **Test Failures**: With `test: 'error'` configured, violations cause test failures
4. **CI Validation**: The test runner executes all stories and reports violations

**No manual axe calls needed** - the addon handles everything automatically!

## Common Accessibility Issues

### 1. Missing or Invalid ARIA Attributes

**Problem:** Elements with ARIA roles missing required attributes
**Solution:** Ensure all ARIA roles have required attributes

```svelte
<!-- ❌ Bad -->
<div role="button">Click me</div>

<!-- ✅ Good -->
<button type="button">Click me</button>
```

### 2. Color Contrast

**Problem:** Insufficient color contrast between text and background
**Solution:** Use USWDS color tokens which meet WCAG AA standards

```css
/* ✅ USWDS tokens ensure proper contrast */
color: var(--usa-button-color);
background-color: var(--usa-button-background-color);
```

### 3. Missing Labels

**Problem:** Form controls without associated labels
**Solution:** Always provide labels for form inputs

```svelte
<!-- ❌ Bad -->
<input type="text" />

<!-- ✅ Good -->
<label for="username">Username</label>
<input id="username" type="text" />
```

### 4. Keyboard Navigation

**Problem:** Interactive elements not keyboard accessible
**Solution:** Use semantic HTML and proper focus management

```svelte
<!-- ✅ Native button is keyboard accessible -->
<button onclick={handleClick}>Click me</button>

<!-- ❌ Div requires extra work for keyboard access -->
<div onclick={handleClick}>Click me</div>
```

## Resources

- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [Section 508 Standards](https://www.section508.gov/)
- [axe-core Rules](https://github.com/dequelabs/axe-core/blob/develop/doc/rule-descriptions.md)
- [USWDS Accessibility](https://designsystem.digital.gov/documentation/accessibility/)
- [Storybook a11y Addon Docs](https://storybook.js.org/addons/@storybook/addon-a11y)
- [Storybook Accessibility Testing](https://storybook.js.org/docs/writing-tests/accessibility-testing)

## Troubleshooting

### Test Fails with Violations

If an accessibility test fails:

1. Run Storybook locally: `npm run storybook`
2. Navigate to the failing story
3. Check the "Accessibility" tab for violation details
4. Fix the violation in the component
5. Re-run tests to verify: `npm run test:storybook`

### Disabling Rules

If you need to disable a specific rule (document why!):

```typescript
parameters: {
  a11y: {
    test: 'error',
    config: {
      rules: [
        {
          id: 'specific-rule-id',
          enabled: false, // Document why this is disabled
        },
      ],
    },
  },
}
```

**Important:** Always document why a rule is disabled and ensure you're still meeting compliance requirements.

### Skipping Tests for a Story

To skip accessibility tests for a specific story:

```typescript
parameters: {
  a11y: {
    test: false, // Document why this story skips a11y tests
  },
}
```

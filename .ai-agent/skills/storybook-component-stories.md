# Storybook Component Stories & Testing Guide

## Overview

This guide documents the patterns and best practices for writing Storybook stories and tests for components in this project.

**Code Display:** All stories automatically display their source code in the "Code" panel in Storybook canvas view, enabled via `.storybook/preview.ts` configuration.

## File Structure

Each component should have three files:

```
src/lib/components/ComponentName/
├── ComponentName.svelte          # Component implementation
├── ComponentName.types.ts        # TypeScript interfaces
└── ComponentName.stories.svelte  # Storybook stories + tests (Svelte CSF)
```

**DO NOT create:**

- ❌ Separate `.test.ts` files
- ❌ `index.ts` barrel files inside component directories
- ❌ The only `index.ts` should be `src/lib/index.ts` (library entry point)
- ❌ `.stories.ts` files (use `.stories.svelte` with Svelte CSF instead)

## Story File Template

### Basic Structure (Svelte CSF)

```svelte
<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import { expect, userEvent, within } from 'storybook/test';
  import ComponentName from './ComponentName.svelte';

  const { Story } = defineMeta({
    title: 'Components/ComponentName',
    component: ComponentName,
    tags: ['autodocs'],
    parameters: {
      a11y: {
        test: 'error', // Fail tests on accessibility violations
      },
    },
    argTypes: {
      // Define controls for props
      propName: {
        control: 'select',
        options: ['option1', 'option2'],
        description: 'Description of what this prop does',
        table: {
          defaultValue: { summary: 'default' },
        },
      },
    },
  });
</script>
```

**Key Points:**

- Use `<script module>` context (required for `defineMeta`)
- Import `defineMeta` from `@storybook/addon-svelte-csf`
- Destructure `Story` component from `defineMeta()` return value
- Story configuration is same as CSF 3 meta object

### Writing Stories

Each story should:

1. Have a descriptive, self-documenting name
2. Include args for the component props
3. Include a `play` prop for interaction tests (where applicable)
4. **NO JSDoc comments** - Story names should be self-explanatory

```svelte
<Story
  name="Default"
  args={{ children: 'Default Text' }}
  play={async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const element = canvas.getByRole('button');
    await expect(element).toBeInTheDocument();
    await expect(element).toHaveTextContent('Default Text');
    await expect(element.className).toContain('usa-component');
  }}
/>
```

**Key Principle:** Stories are self-documenting. The story name (e.g., `Default`, `Secondary`, `Disabled`) clearly indicates what is being demonstrated. JSDoc comments above stories are redundant and should not be used.

## Story Types & Patterns

### 1. Simple Stories (No Snippet Needed)

For components that only need props (no complex composition), just pass args:

```svelte
<Story
  name="Secondary"
  args={{ variant: 'secondary', children: 'Secondary Button' }}
  play={async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const element = canvas.getByRole('button');
    await expect(element.className).toContain('usa-button--secondary');
  }}
/>

<Story
  name="Big Size"
  args={{ size: 'big', children: 'Big Button' }}
  play={async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const element = canvas.getByRole('button');
    await expect(element.className).toContain('usa-button--big');
  }}
/>
```

**Use when:** Component only needs props, no surrounding HTML/composition needed.

### 2. Static Composition Stories (asChild)

For complex layouts that don't need to react to args/controls:

```svelte
<Story
  name="Static Context"
  parameters={{ controls: { disable: true } }}
  asChild
  play={async ({ canvasElement }) => {
    const paragraph = canvasElement.querySelector('p');
    await expect(paragraph?.textContent).toContain('marked as');
    const tag = canvasElement.querySelector('.usa-tag');
    await expect(tag?.textContent).toBe('Featured');
  }}
>
  <p>
    This article is marked as
    <Tag children="Featured" />
    content.
  </p>
</Story>
```

**Use when:** You need complex composition but don't need args/controls to work.

**Important:** `asChild` completely ignores args - even if you add controls, they won't have an effect.

### 3. Dynamic Composition Stories (Snippet)

For complex layouts that need to react to args/controls:

```svelte
<Story
  name="Dynamic Context"
  args={{ children: 'New' }}
  play={async ({ canvasElement }) => {
    const tag = canvasElement.querySelector('.usa-tag');
    await expect(tag?.textContent).toBe('New');

    const paragraph = canvasElement.querySelector('p');
    await expect(paragraph?.textContent).toContain('marked as');
  }}
>
  {#snippet template(args)}
    <p>
      This article is marked as
      <Tag {...args} />
      content.
    </p>
  {/snippet}
</Story>
```

**Use when:** You need complex composition AND want args/controls to work.

### 4. State Stories

Test disabled, active, loading states:

```svelte
<Story
  name="Disabled"
  args={{ disabled: true, children: 'Disabled Button' }}
  play={async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button');
    await expect(button).toBeDisabled();
  }}
/>
```

### 5. Interaction Stories

Test keyboard navigation, clicks, focus:

```svelte
<Story
  name="Keyboard Navigation"
  args={{ href: 'javascript:void(0);', children: 'Keyboard navigable' }}
  play={async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const link = canvas.getByRole('link');

    await userEvent.tab();
    await expect(link).toHaveFocus();

    await userEvent.keyboard('{Enter}');
  }}
/>
```

### 6. Custom Classes Stories

Test USWDS utility class integration:

```svelte
<Story
  name="With Custom Classes"
  args={{ children: 'Custom Styled', class: 'margin-top-2 text-bold' }}
  play={async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const element = canvas.getByRole('button');
    await expect(element.className).toContain('usa-button');
    await expect(element.className).toContain('margin-top-2');
    await expect(element.className).toContain('text-bold');
  }}
/>
```

### 7. Snippet Children Stories

For components that accept complex HTML children, create a snippet example file:

**Step 1:** Create a snippet example file (e.g., `ComponentSnippet.example.svelte`):

```svelte
<script module lang="ts">
  export { componentsnippet };
</script>

{#snippet componentsnippet()}
	<span>Content with <strong>bold</strong> and <em>italic</em></span>
{/snippet}
```

**Step 2:** Import and use in stories:

```svelte
<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import ComponentName from './ComponentName.svelte';
  import { componentsnippet } from './ComponentSnippet.example.svelte';

  const { Story } = defineMeta({
    title: 'Components/ComponentName',
    component: ComponentName,
  });
</script>

<Story name="With Snippet Children" args={{ children: componentsnippet }} />
```

**Key Points:**

- Use `<script module>` to export snippets
- Snippet must be declared with `{#snippet name()}`
- Export the snippet name from module script
- Pass snippet as `children` prop in args
- Component renders with `{@render children()}`

## Testing Patterns

### Accessibility Testing

All stories automatically run a11y tests via `@storybook/addon-a11y`:

```svelte
<script module lang="ts">
  const { Story } = defineMeta({
    parameters: {
      a11y: {
        test: 'error',  // Fail on violations
      },
    },
  });
</script>
```

### Play Functions in Svelte CSF

Tests are defined as `play` props on the `<Story>` component:

```svelte
<Story
  name="Default"
  args={{ children: 'Button' }}
  play={async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button');
    await expect(button).toBeInTheDocument();
  }}
/>
```

### Query Selectors

**Prefer semantic queries:**

```svelte
<Story
  name="Example"
  play={async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // ✅ Good - semantic queries
    const button = canvas.getByRole('button');
    const link = canvas.getByRole('link');
    const label = canvas.getByLabelText('Email');

    // ⚠️ Fallback - class/element queries
    const tag = canvasElement.querySelector('.usa-tag');
  }}
/>
```

### Common Test Patterns

**Rendering tests:**

```svelte
const element = canvas.getByRole('button');
await expect(element).toBeInTheDocument();
```

**Content tests:**

```svelte
await expect(element).toHaveTextContent('Expected Text');
```

**Class tests:**

```svelte
await expect(element.className).toContain('usa-button--secondary');
```

**Attribute tests:**

```svelte
await expect(link).toHaveAttribute('href', 'javascript:void(0);');
await expect(link).toHaveAttribute('rel', 'noreferrer');
```

**Interaction tests:**

```svelte
await userEvent.click(button);
await userEvent.tab();
await userEvent.keyboard('{Enter}');
```

**State tests:**

```svelte
await expect(button).toBeDisabled();
await expect(link).toHaveFocus();
```

## Best Practices

### Story Naming

Stories should have clear, descriptive names:

- `Default` - Basic component usage
- `Secondary` - Variant name (matches prop value)
- `Big Size` - Size variant (use spaces in names)
- `Disabled` - State name
- `With Custom Classes` - Custom styling
- `Keyboard Navigation` - Interaction type
- `With Snippet Children` - Complex children

**Note:** Svelte CSF uses the `name` prop, which supports spaces and special characters.

### Story Pattern Selection

| Scenario                      | Pattern                         | Reason            |
| ----------------------------- | ------------------------------- | ----------------- |
| Just passing props            | Simple `<Story args={{...}} />` | No snippet needed |
| Complex layout, fixed content | `asChild`                       | No args needed    |
| Complex layout + dynamic args | `{#snippet template(args)}`     | Args need to work |

### Story Coverage

Comprehensive component stories should include:

1. **Default story** - Basic usage with minimal props
2. **All variants** - Each variant value gets a story
3. **All sizes** - Each size option (if applicable)
4. **States** - Disabled, active, loading, error states
5. **Interactions** - Keyboard navigation, clicks, focus
6. **Custom classes** - USWDS utility class integration
7. **Snippet children** - Complex HTML children (if applicable)
8. **Edge cases** - Long text, empty states, etc.

### Navigation Prevention in Storybook

For links in stories, prevent navigation using:

```svelte
<Story
  name="Example Link"
  args={{ href: 'javascript:void(0);', children: 'Link text' }}
/>

<!-- ❌ Don't use hash links in Storybook -->
<Story
  name="Bad Example"
  args={{ href: '#', children: 'Link text' }}
  <!-- Will cause unwanted navigation -->
/>
```

### Non-Interactive Components

For non-interactive components (like Tag, Badge), verify they're not focusable:

```svelte
<Story
  name="Default"
  args={{ children: 'Tag' }}
  play={async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const buttons = canvas.queryAllByRole('button');
    await expect(buttons).toHaveLength(0);
  }}
/>
```

## Common Mistakes to Avoid

### ❌ Don't: Use CSF 3 TypeScript format

```typescript
// ❌ Wrong - Old CSF 3 format
import type { Meta, StoryObj } from "@storybook/svelte";

export const Default: Story = {
  args: { children: "Button" },
};
```

Use Svelte CSF instead (see template above).

### ❌ Don't: Use separate test files

```
// ❌ Wrong
ComponentName.test.ts
ComponentName.spec.ts
```

Tests belong in `play` props inside `<Story>` components.

### ❌ Don't: Create barrel files in component directories

```
// ❌ Wrong
src/lib/components/Button/index.ts
```

Only `src/lib/index.ts` should exist as the library entry point.

### ❌ Don't: Forget snippet when using complex composition with args

```svelte
<!-- ❌ Wrong - Can't access args in children -->
<Story name="Bad" args={{ children: 'Text' }}>
  <p>Some text <Tag {...args} /> more text</p>
  <!-- args is not defined! -->
</Story>

<!-- ✅ Correct - Use snippet to access args -->
<Story name="Good" args={{ children: 'Text' }}>
  {#snippet template(args)}
    <p>Some text <Tag {...args} /> more text</p>
  {/snippet}
</Story>

<!-- ✅ Also correct - Use asChild for static content -->
<Story name="Static" asChild>
  <p>Some text <Tag children="Text" /> more text</p>
</Story>
```

## Real-World Examples

### Button Component

See `src/lib/components/Button/Button.stories.svelte` for a complete example with:

- 15 comprehensive stories
- All USWDS variants (default, secondary, accent-cool, accent-warm, base, outline, inverse, unstyled)
- Size variants (default, big)
- State stories (disabled)
- Type stories (button, submit, reset)
- Custom classes story
- Full interaction tests in `play` props

### Link Component

See `src/lib/components/Link/Link.stories.svelte` for examples of:

- External link handling with security attributes
- Email and phone link patterns
- Keyboard navigation testing
- Snippet children with exported snippets
- Navigation prevention in Storybook

### Tag Component

See `src/lib/components/Tag/Tag.stories.svelte` for examples of:

- Non-interactive component testing
- Size variants
- Custom styling with USWDS utilities
- Snippet children
- Verifying components are not focusable

### Tag In Context Component

See `src/lib/components/Tag/TagInContext.stories.svelte` for examples of:

- Simple stories (no snippet)
- Static composition with `asChild`
- Dynamic composition with `{#snippet template(args)}`
- When to use each pattern
- Snippet children
- Verifying components are not focusable

## Running Tests

### Development

```bash
npm run storybook
```

Navigate to a component and check:

1. Visual appearance in Canvas tab
2. Interaction tests in Test tab (shows pass/fail)
3. Accessibility violations in Accessibility tab

### CI/CD

```bash
npm run test:storybook
```

Runs all interaction tests from all stories. Tests fail if:

- Any `play()` function assertion fails
- Any accessibility violations (when `a11y.test: "error"`)

## TypeScript Types

### Svelte CSF Type Safety

The `Story` component from `defineMeta` is fully typed based on your component props:

```svelte
<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import type { ComponentProps } from 'svelte';
  import MyComponent from './MyComponent.svelte';

  const { Story } = defineMeta({
    component: MyComponent,
  });

  // Story args are automatically typed from ComponentProps<MyComponent>
</script>

<Story
  name="Default"
  args={{ children: 'Text' }}  <!-- Fully type-checked -->
/>
```

### Typing Snippet Templates

For custom snippet templates, you can add explicit types:

```svelte
<script module lang="ts">
  import { defineMeta, type StoryContext } from '@storybook/addon-svelte-csf';
  import { type ComponentProps } from 'svelte';
  import MyComponent from './MyComponent.svelte';

  const { Story } = defineMeta({
    component: MyComponent,
  });

  type Args = ComponentProps<MyComponent>;
</script>

{#snippet template(args: Args, context: StoryContext<typeof MyComponent>)}
  <MyComponent {...args} />
{/snippet}

<Story name="With Typed Template" {template} args={{ children: 'Text' }} />
```

### Props Interface

Component props should extend native HTML element attributes:

```typescript
import type { HTMLButtonAttributes } from "svelte/elements";
import type { Snippet } from "svelte";

export interface ButtonProps extends Omit<HTMLButtonAttributes, "children"> {
  variant?: "default" | "secondary";
  size?: "default" | "big";
  children?: Snippet | string;
}
```

## Checklist for New Component Stories

When creating stories for a new component:

- [ ] Create `ComponentName.stories.svelte` file (NOT `.stories.ts`)
- [ ] Add `<script module lang="ts">` block
- [ ] Import `defineMeta` from `@storybook/addon-svelte-csf`
- [ ] Import `expect`, `userEvent`, `within` from `storybook/test`
- [ ] Import component
- [ ] Call `defineMeta()` with title, component, tags, parameters, argTypes
- [ ] Destructure `Story` from `defineMeta()` return value
- [ ] Create Default story with `play` prop
- [ ] Create stories for all variants/sizes
- [ ] Create state stories (disabled, etc.)
- [ ] Create interaction story (if applicable)
- [ ] Create "With Custom Classes" story
- [ ] Create "With Snippet Children" story (if component accepts children)
- [ ] Choose appropriate story pattern:
  - Simple `<Story args={{...}} />` for props only
  - `asChild` for static complex composition
  - `{#snippet template(args)}` for dynamic complex composition
- [ ] Test all stories render in Storybook
- [ ] Verify all `play` props execute and pass
- [ ] Check accessibility tab for violations
- [ ] Run `npm run test:storybook` to verify CI tests pass
- [ ] Verify Code panel displays source correctly

**Note:** Code display is enabled globally in `.storybook/preview.ts` - all stories automatically show their source code in the Code panel.

## Additional Resources

- [Storybook Documentation](https://storybook.js.org/docs)
- [Storybook Svelte CSF Addon](https://github.com/storybookjs/addon-svelte-csf)
- [Storybook Testing](https://storybook.js.org/docs/writing-tests)
- [Testing Library Queries](https://testing-library.com/docs/queries/about)
- [USWDS Components](https://designsystem.digital.gov/components/)
- [Svelte 5 Snippets](https://svelte.dev/docs/svelte/snippet)

# Coding Design Patterns

> **Last Updated:** 2026-07-08 | **Status:** Draft

This document describes coding design patterns and best practices for the Svelte UI component library. These patterns ensure consistency, maintainability, and adherence to project standards.

---

## Table of Contents

- [Image Components](#image-components)
- [Interactive Components](#interactive-components)
- [Form Components](#form-components)
- [Utility Components](#utility-components)

---

## Image Components

### Overview

Image components are visual elements that render SVG graphics, icons, or raster images. This pattern covers how to structure components that primarily serve as visual assets.

### Pattern Structure

Image components should follow this structure:

```
src/lib/components/images/ImageComponentName/
├── ImageComponentName.svelte          # Component implementation
├── ImageComponentName.types.ts        # TypeScript interfaces
└── ImageComponentName.stories.svelte  # Storybook stories + tests
```

**Key Points:**
- All image components MUST be placed in `src/lib/components/images/`
- Each image component gets its own subdirectory
- Follow the standard three-file pattern (component, types, stories)

### Component Implementation

#### TypeScript Interface Pattern

```typescript
import type { HTMLAttributes } from "svelte/elements";

export interface ImageComponentProps extends HTMLAttributes<SVGSVGElement> {
  // Component-specific props (if any)
  size?: number;
  title?: string;
}
```

**Key Principles:**
- Extend `HTMLAttributes<SVGSVGElement>` for SVG components
- Extend `HTMLAttributes<HTMLImageElement>` for `<img>` components
- Only define props that are unique to the component
- Let native HTML attributes pass through via `...restProps`

#### Component Pattern

```svelte
<script lang="ts">
  import type { ImageComponentProps } from './ImageComponentName.types.js';

  let {
    size = 24,
    title = 'Default Title',
    class: className,
    ...restProps
  }: ImageComponentProps = $props();

  const classes = $derived.by(() => {
    const classList: string[] = [];
    
    if (className) {
      classList.push(String(className));
    }
    
    return classList.join(' ');
  });
</script>

<svg
  xmlns="http://www.w3.org/2000/svg"
  viewBox="0 0 24 24"
  width={size}
  height={size}
  class={classes}
  aria-hidden="true"
  focusable="false"
  role="img"
  {...restProps}
>
  {#if title}
    <title>{title}</title>
  {/if}
  <!-- SVG paths here -->
</svg>
```

### Accessibility Requirements

Image components MUST include:

1. **`aria-hidden="true"`** - For purely decorative images
2. **`focusable="false"`** - Prevent keyboard focus on decorative images
3. **`role="img"`** - Semantic role for assistive technologies
4. **`<title>` element** - For meaningful images (conditionally rendered)

**When to use `<title>`:**
- ✅ Image conveys information not available in surrounding text
- ✅ Image is the only content in a button or link
- ❌ Image is purely decorative (flag in banner, background graphics)
- ❌ Adjacent text already describes the image

### Props Pattern

#### Required Props
- `class: className` - Allow custom CSS classes
- `...restProps` - Pass through all native HTML attributes

#### Optional Props
- `size?: number` - Control width/height (for square images)
- `width?: number` - Explicit width control
- `height?: number` - Explicit height control
- `title?: string` - Accessible title for meaningful images

### Storybook Stories Pattern

```svelte
<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import { expect, within } from 'storybook/test';
  import ImageComponent from './ImageComponent.svelte';

  const { Story } = defineMeta({
    title: 'Components/ImageComponent',
    component: ImageComponent,
    tags: ['autodocs'],
    parameters: {
      a11y: {
        test: 'error',
      },
    },
    argTypes: {
      size: {
        control: 'number',
        description: 'Size of the image in pixels',
      },
      title: {
        control: 'text',
        description: 'Accessible title for the image',
      },
    },
  });
</script>

<Story
  name="Default"
  play={async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const image = canvas.getByRole('img');
    await expect(image).toBeInTheDocument();
    await expect(image).toHaveAttribute('aria-hidden', 'true');
  }}
/>

<Story
  name="Custom Size"
  args={{ size: 48 }}
/>

<Story
  name="With Title"
  args={{ title: 'Descriptive title' }}
/>
```

### Common Mistakes to Avoid

❌ **Don't:** Hardcode dimensions
```svelte
<svg width="16" height="11">
```

✅ **Do:** Use props for dimensions
```svelte
<svg width={width} height={height}>
```

---

❌ **Don't:** Omit accessibility attributes
```svelte
<svg xmlns="http://www.w3.org/2000/svg">
```

✅ **Do:** Include full accessibility attributes
```svelte
<svg
  xmlns="http://www.w3.org/2000/svg"
  aria-hidden="true"
  focusable="false"
  role="img"
>
```

---

❌ **Don't:** Redefine native HTML attributes
```typescript
interface ImageProps extends HTMLAttributes<SVGSVGElement> {
  width?: number;   // Already in HTMLAttributes
  height?: number;  // Already in HTMLAttributes
  onclick?: () => void;  // Already in HTMLAttributes
}
```

✅ **Do:** Only define component-specific props
```typescript
interface ImageProps extends HTMLAttributes<SVGSVGElement> {
  size?: number;  // Custom prop not in HTMLAttributes
}
```

---

❌ **Don't:** Use empty class derivation
```svelte
const classes = $derived.by(() => {
  const classList: string[] = [];
  
  if (className) {
    classList.push(String(className));
  }
  
  return classList.join(' ');
});
```

✅ **Do:** Use simpler pattern when no USWDS classes are needed
```svelte
// Just pass className directly if no class composition needed
<svg class={className} />
```

### Best Practices

1. **Inline SVG vs External Files**
   - ✅ Use `<img>` tag with external SVG/PNG files for image components
   - ✅ Store image assets in `src/lib/assets/img/` directory
   - ✅ Reference with `/assets/img/filename.svg` path
   - ✅ External sprite sheets for icon systems (use Icon component)

2. **Naming Conventions**
   - Use descriptive names: `USFlag`, `LockIcon`, `CheckmarkBadge`
   - Avoid generic names: `Image1`, `Graphic`, `Picture`

3. **Asset Organization**
   - **Source assets**: `src/lib/assets/img/` - Shipped with the library
   - **Storybook assets**: `.storybook/public/assets/img/` - For Storybook development
   - **Keep them in sync**: Both directories must contain the same image files
   - **User setup**: Users copy from `node_modules/@gsa-tts/svelte-ui-uswds/src/lib/assets/img/` to their `public/assets/img/` or `static/assets/img/`

4. **Image Component Pattern**
   ```svelte
   <script lang="ts">
     import type { USFlagProps } from './USFlag.types.js';

     let {
       width = 16,
       height = 11,
       class: className,
       ...restProps
     }: USFlagProps = $props();
   </script>

   <img
     src="/assets/img/us_flag.svg"
     alt=""
     {width}
     {height}
     class={className}
     aria-hidden="true"
     {...restProps}
   />
   ```

5. **File Organization**
   - Image components go in `src/lib/components/images/`
   - Each component in its own subdirectory: `src/lib/components/images/USFlag/`
   - Export from `src/lib/index.ts` using the full path: `"./components/images/USFlag/USFlag.svelte"`
   - No barrel files inside component directories

6. **Export Pattern**
   ```typescript
   // src/lib/index.ts
   export { default as USFlag } from "./components/images/USFlag/USFlag.svelte";
   export type { USFlagProps } from "./components/images/USFlag/USFlag.types.js";
   ```

7. **Import Pattern for Other Components**
   ```typescript
   // When using image components in other components
   import USFlag from '../images/USFlag/USFlag.svelte';
   ```

8. **Setup Instructions for Users**
   ```bash
   # SvelteKit
   cp -r node_modules/@gsa-tts/svelte-ui-uswds/src/lib/assets/img static/assets/

   # Vite
   cp -r node_modules/@gsa-tts/svelte-ui-uswds/src/lib/assets/img public/assets/
   ```

---

## Interactive Components

_(To be documented)_

---

## Form Components

_(To be documented)_

---

## Utility Components

_(To be documented)_

---

## Related Documentation

- [CODING_STANDARDS_COMPACT.md](../agentic-coding-playbook/docs/CODING_STANDARDS_COMPACT.md)
- [Storybook Component Stories Guide](.ai-agent/skills/storybook-component-stories.md)
- [AGENTS.md](../AGENTS.md)

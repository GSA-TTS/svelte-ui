# mdsvex Support - Usage Guide

## Overview

`@gsa-tts/svelte-ui-uswds` provides optional mdsvex support for building documentation sites, blogs, and content-heavy applications with USWDS styling.

**What is mdsvex?** mdsvex is a markdown preprocessor for Svelte that allows you to use Svelte components inside markdown files (`.svx`). Think of it as MDX for Svelte.

## Installation

### 1. Install the Component Library

```bash
npm install @gsa-tts/svelte-ui-uswds
```

### 2. Install mdsvex (Optional Peer Dependency)

```bash
npm install -D mdsvex
```

### 3. Install USWDS (Required Peer Dependency)

```bash
npm install @uswds/uswds
```

## Configuration

### SvelteKit Project

Add mdsvex to your `svelte.config.js`:

```javascript
import adapter from "@sveltejs/adapter-auto";
import { vitePreprocess } from "@sveltejs/vite-plugin-svelte";
import { mdsvex } from "mdsvex";

/** @type {import('@sveltejs/kit').Config} */
const config = {
  extensions: [".svelte", ".svx"],

  preprocess: [
    vitePreprocess(),
    mdsvex({
      extensions: [".svx"],
      layout: "@gsa-tts/svelte-ui-uswds/mdsvex/layouts/DocsLayout.svelte",
    }),
  ],

  kit: {
    adapter: adapter(),
  },
};

export default config;
```

### Vite + Svelte Project

```javascript
import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import { mdsvex } from "mdsvex";

export default defineConfig({
  plugins: [
    svelte({
      extensions: [".svelte", ".svx"],
      preprocess: mdsvex({
        extensions: [".svx"],
        layout: "@gsa-tts/svelte-ui-uswds/mdsvex/layouts/DocsLayout.svelte",
      }),
    }),
  ],
});
```

## Using DocsLayout

### Basic Usage

Create a `.svx` file with frontmatter:

```mdsvex
---
title: Getting Started
description: Learn how to use this component library in your project.
author: Jane Doe
date: 2026-06-25
---

# Installation

Run the following command to install the package:

\`\`\`bash
npm install @gsa-tts/svelte-ui-uswds
\`\`\`

## Quick Start

Import components in your Svelte files:

\`\`\`javascript
import { Button, Link } from '@gsa-tts/svelte-ui-uswds';
\`\`\`
```

### Frontmatter Properties

DocsLayout accepts the following frontmatter properties:

| Property      | Type     | Description                                    |
| ------------- | -------- | ---------------------------------------------- |
| `title`       | `string` | Document title (displayed as h1)               |
| `description` | `string` | Intro text (styled with `usa-intro` class)     |
| `author`      | `string` | Author name                                    |
| `date`        | `string` | Publication date (ISO 8601 format recommended) |

### Custom Classes

You can add custom classes via frontmatter:

```mdsvex
---
title: My Document
class: custom-styling
---

Content here...
```

## Using Components in .svx Files

You can import and use any component from the library inside your `.svx` files:

```mdsvex
---
title: Component Examples
---

<script>
  import { Button, Link, Tag } from '@gsa-tts/svelte-ui-uswds';
</script>

# Interactive Components

Here's a button:

<Button variant="primary">Click Me</Button>

And here's a link:

<Link href="https://designsystem.digital.gov" variant="external">
  Visit USWDS Documentation
</Link>

Tags are useful too:

<Tag>Important</Tag>
```

## Custom HTML Element Replacements

DocsLayout automatically replaces standard HTML elements with USWDS-styled versions:

| Markdown Element | Replaced With         | Notes                         |
| ---------------- | --------------------- | ----------------------------- |
| `# Heading`      | Custom `h1` component | USWDS prose styling           |
| `## Heading`     | Custom `h2` component | USWDS prose styling           |
| `### Heading`    | Custom `h3` component | USWDS prose styling           |
| `[link](url)`    | `Link` component      | Your library's Link component |
| `paragraph`      | Custom `p` component  | USWDS prose spacing           |

### Example

This markdown:

```markdown
# Main Heading

This is a paragraph with a [link](https://example.com).

## Section Heading

Another paragraph here.
```

Is automatically rendered as:

```svelte
<h1>Main Heading</h1>
<p>This is a paragraph with a <Link href="https://example.com">link</Link>.</p>
<h2>Section Heading</h2>
<p>Another paragraph here.</p>
```

All wrapped in `<article class="usa-prose">` for proper USWDS typography.

## USWDS Prose Styling

DocsLayout wraps all content in the USWDS `.usa-prose` class, which provides:

- Proper heading hierarchy and sizing
- Optimal line length for readability (measure tokens)
- Appropriate line height for running text
- Consistent spacing between elements
- Responsive typography

### Typography Features

- **Font size:** Body text uses comfortable reading size (16px equivalent)
- **Line height:** 1.5 for running text, tighter for headings
- **Measure:** 45-90 characters per line for optimal readability
- **Whitespace:** Proper spacing between paragraphs, list items, and headings

For more details, see [USWDS Typography](https://designsystem.digital.gov/components/typography/).

## Advanced Configuration

### Multiple Layouts

If you need different layouts for different types of content:

```javascript
mdsvex({
  extensions: [".svx"],
  layout: {
    docs: "@gsa-tts/svelte-ui-uswds/mdsvex/layouts/DocsLayout.svelte",
    // Add more layouts as needed
    _: "@gsa-tts/svelte-ui-uswds/mdsvex/layouts/DocsLayout.svelte", // fallback
  },
});
```

Then specify in frontmatter:

```mdsvex
---
layout: docs
title: My Documentation
---
```

### Syntax Highlighting

mdsvex uses PrismJS by default. Import a Prism theme in your app:

```javascript
// In your main layout or +layout.svelte
import "prismjs/themes/prism-tomorrow.css";
```

Or use a custom highlighter like Shiki:

```javascript
import { mdsvex, escapeSvelte } from "mdsvex";
import { createHighlighter } from "shiki";

const theme = "github-dark";
const highlighter = await createHighlighter({
  themes: [theme],
  langs: ["javascript", "typescript", "svelte", "bash"],
});

mdsvex({
  highlight: {
    highlighter: async (code, lang = "text") => {
      const html = escapeSvelte(highlighter.codeToHtml(code, { lang, theme }));
      return `{@html \`${html}\` }`;
    },
  },
});
```

## TypeScript Support

TypeScript declarations are included for all mdsvex components:

```typescript
import type { DocsLayoutProps } from "@gsa-tts/svelte-ui-uswds/mdsvex";

// .svx and .md files are typed as SvelteComponents
import MyDoc from "./my-doc.svx";
import type { metadata } from "./my-doc.svx";
```

### Module Declarations

The library includes ambient type declarations for `.svx` and `.md` files:

```typescript
declare module "*.svx" {
  import type { SvelteComponent } from "svelte";
  export default class Comp extends SvelteComponent {}
  export const metadata: Record<string, unknown>;
}

declare module "*.md" {
  import type { SvelteComponent } from "svelte";
  export default class Comp extends SvelteComponent {}
  export const metadata: Record<string, unknown>;
}
```

## Examples

### Example 1: Documentation Site

```
my-docs/
├── src/
│   ├── routes/
│   │   ├── docs/
│   │   │   ├── getting-started.svx
│   │   │   ├── installation.svx
│   │   │   └── components/
│   │   │       ├── button.svx
│   │   │       ├── link.svx
│   │   │       └── tag.svx
│   │   └── +layout.svelte
│   └── app.css
└── svelte.config.js
```

### Example 2: Blog

```
my-blog/
├── src/
│   ├── routes/
│   │   ├── blog/
│   │   │   ├── posts/
│   │   │   │   ├── 2026-06-01-first-post.svx
│   │   │   │   └── 2026-06-15-second-post.svx
│   │   │   └── +page.svelte
│   │   └── +layout.svelte
└── svelte.config.js
```

## Best Practices

### 1. Use Semantic Frontmatter

Always include meaningful frontmatter:

```mdsvex
---
title: Clear, Descriptive Title
description: Brief summary of content (1-2 sentences)
author: Your Name
date: 2026-06-25
---
```

### 2. Leverage USWDS Typography

Let USWDS handle typography - don't override spacing unless necessary.

### 3. Keep Content Accessible

- Use proper heading hierarchy (don't skip levels)
- Provide alt text for images
- Use semantic HTML
- Test with screen readers

### 4. Organize Content Logically

- Use headings to structure content
- Keep paragraphs focused and concise
- Use lists for multiple related items
- Use code blocks for code examples

### 5. Static Site Generation

For best performance, use SvelteKit's `prerender` option:

```javascript
// +page.ts
export const prerender = true;
```

## Troubleshooting

### mdsvex not processing .svx files

Make sure:

1. `extensions: ['.svelte', '.svx']` is in your Svelte config
2. mdsvex is in your `preprocess` array
3. Files have the `.svx` extension

### Custom elements not being replaced

Verify that:

1. You're using the correct layout path
2. DocsLayout is being applied to your `.svx` files
3. You're not overriding the layout with `layout: false` in frontmatter

### Styling issues

Ensure:

1. USWDS CSS is imported in your app
2. The `.usa-prose` class is being applied (check browser DevTools)
3. No conflicting CSS is overriding USWDS styles

### TypeScript errors with .svx imports

Check that:

1. Your `tsconfig.json` includes the library's type definitions
2. Type declarations for `.svx` modules are loaded
3. You're using the correct import syntax

## Resources

- [mdsvex Documentation](https://mdsvex.pngwn.io/)
- [USWDS Typography](https://designsystem.digital.gov/components/typography/)
- [USWDS Prose Component](https://designsystem.digital.gov/components/prose/)
- [Svelte Documentation](https://svelte.dev/)
- [SvelteKit Documentation](https://kit.svelte.dev/)

## Support

For issues or questions:

- [GitHub Issues](https://github.com/GSA-TTS/svelte-ui/issues)
- [USWDS Community](https://designsystem.digital.gov/about/community/)

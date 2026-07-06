# Installation Guide

Complete installation instructions for the Svelte UI component library.

## Prerequisites

- **Node.js:** 24.x or higher
- **npm:** 10.x or higher
- **Svelte:** 5.56.1 or higher (peer dependency)
- **USWDS:** 3.13.0 or higher (peer dependency)

## Quick Start

### 1. Install the Package

```bash
npm install @gsa-tts/svelte-ui-uswds @uswds/uswds
```

Using yarn:

```bash
yarn add @gsa-tts/svelte-ui-uswds @uswds/uswds
```

Using pnpm:

```bash
pnpm add @gsa-tts/svelte-ui-uswds @uswds/uswds
```

### 2. Import USWDS Styles

Choose one of these methods:

**Option A: Import from node_modules (Recommended)**

```javascript
// In your app entry point (e.g., +layout.svelte, main.js, or App.svelte)
import "@uswds/uswds/dist/css/uswds.min.css";
```

**Option B: Use CDN**

```html
<!-- In your index.html or app.html -->
<link
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/npm/@uswds/uswds@3.13.0/dist/css/uswds.min.css"
/>
```

### 3. Import and Use Components

```svelte
<script>
  import { Button } from '@gsa-tts/svelte-ui-uswds';
</script>

<Button>Click me</Button>
<Button variant="secondary">Secondary Button</Button>
<Button size="big">Big Button</Button>
```

---

## Framework-Specific Setup

### SvelteKit

1. **Install dependencies:**

   ```bash
   npm install @gsa-tts/svelte-ui-uswds @uswds/uswds
   ```

2. **Import USWDS in your root layout:**

   ```svelte
   <!-- src/routes/+layout.svelte -->
   <script>
     import '@uswds/uswds/dist/css/uswds.min.css';
   </script>

   <slot />
   ```

3. **Use components anywhere:**

   ```svelte
   <!-- src/routes/+page.svelte -->
   <script>
     import { Button } from '@gsa-tts/svelte-ui-uswds';
   </script>

   <h1>Welcome</h1>
   <Button>Get Started</Button>
   ```

**TypeScript users:** No additional configuration needed - types are included.

### Vite + Svelte

1. **Install dependencies:**

   ```bash
   npm install @gsa-tts/svelte-ui-uswds @uswds/uswds
   ```

2. **Import USWDS in your main entry:**

   ```javascript
   // src/main.js
   import "@uswds/uswds/dist/css/uswds.min.css";
   import App from "./App.svelte";

   const app = new App({
     target: document.getElementById("app"),
   });

   export default app;
   ```

3. **Use components in your app:**

   ```svelte
   <!-- src/App.svelte -->
   <script>
     import { Button } from '@gsa-tts/svelte-ui-uswds';
   </script>

   <main>
     <Button>Hello World</Button>
   </main>
   ```

---

## USWDS Assets

### Fonts

USWDS uses specific fonts. We recommend loading them from CDN:

```html
<!-- Add to your HTML <head> -->
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link
  href="https://fonts.googleapis.com/css2?family=Public+Sans:wght@400;700&family=Merriweather:wght@700&family=Roboto+Mono&display=swap"
  rel="stylesheet"
/>
```

### Self-Hosting Assets

For self-hosting fonts, icons, and images:

1. Copy assets from USWDS package:

   ```bash
   cp -r node_modules/@uswds/uswds/dist/fonts public/fonts
   cp -r node_modules/@uswds/uswds/dist/img public/img
   ```

2. Configure asset paths (see [USWDS documentation](https://designsystem.digital.gov/documentation/getting-started/developers/))

### Icons

USWDS icons are included in the USWDS CSS. No additional setup required.

---

## TypeScript Configuration

TypeScript types are included automatically. No additional configuration needed.

For optimal TypeScript support, ensure your `tsconfig.json` includes:

```json
{
  "compilerOptions": {
    "moduleResolution": "bundler",
    "module": "ESNext",
    "target": "ESNext"
  }
}
```

---

## Troubleshooting

### USWDS styles not applying

**Problem:** Components don't have USWDS styling.

**Solution:** Ensure USWDS CSS is imported before components are used:

```javascript
// This must come first
import "@uswds/uswds/dist/css/uswds.min.css";

// Then import components
import { Button } from "@gsa-tts/svelte-ui-uswds";
```

### Peer dependency warnings

**Problem:** npm warns about missing peer dependencies.

**Solution:** Install both @gsa-tts/svelte-ui-uswds and @uswds/uswds:

```bash
npm install @gsa-tts/svelte-ui-uswds @uswds/uswds
```

### TypeScript errors

**Problem:** TypeScript can't find module declarations.

**Solution:** Ensure you have the latest version of @gsa-tts/svelte-ui-uswds. Types are included in the package.

### Build errors with Vite

**Problem:** Build fails with USWDS-related errors.

**Solution:** USWDS is externalized in the build. Ensure it's listed in your project's dependencies (not devDependencies).

### Font not loading

**Problem:** USWDS fonts not displaying.

**Solution:** Add font imports to your HTML head (see USWDS Assets section above).

---

## Version Compatibility

See [VERSIONING.md](./VERSIONING.md) for detailed version compatibility information.

**Supported versions:**

- USWDS: ^3.13.0 (3.13.0 through 3.x.x, not 4.x.x)
- Svelte: ^5.56.1 (5.56.1 through 5.x.x, not 6.x.x)

---

## Next Steps

- Browse [Storybook documentation](https://svelte-ui-library.app.cloud.gov) for component examples
- Review [component API documentation](https://github.com/gsa/svelte-ui#available-components)
- Check out [USWDS design tokens](https://designsystem.digital.gov/design-tokens/)
- Read [accessibility guidelines](./ACCESSIBILITY_TESTING.md)

---

## Getting Help

- **Issues:** [GitHub Issues](https://github.com/gsa/svelte-ui/issues)
- **Documentation:** [README.md](../README.md)
- **USWDS Documentation:** [designsystem.digital.gov](https://designsystem.digital.gov/)

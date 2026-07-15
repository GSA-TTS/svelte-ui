# Svelte UI - Component Library

[![npm version](https://badge.fury.io/js/@gsa-tts%2Fsvelte-ui-uswds.svg)](https://www.npmjs.com/package/@gsa-tts/svelte-ui-uswds)
[![npm downloads](https://img.shields.io/npm/dm/@gsa-tts/svelte-ui-uswds.svg)](https://www.npmjs.com/package/@gsa-tts/svelte-ui-uswds)

A comprehensive, adaptable Svelte component library that leverages the U.S. Web Design System (USWDS) as the default design system.

## Features

- Fully customizable Svelte 5.x components
- USWDS default styling with Section 508 accessibility compliance
- Modular and extensible architecture
- Optimized for performance and accessibility
- Comprehensive testing with Vitest and Storybook
- Interactive documentation with Storybook

## Installation

> **Note:** This library is currently in alpha. Use the `@alpha` tag for the latest features.
> Production-ready stable releases will be announced when available.

### For Alpha Testing (Latest Features)

```bash
npm install @gsa-tts/svelte-ui-uswds@alpha @uswds/uswds
```

### For Stable Releases (When Available)

```bash
npm install @gsa-tts/svelte-ui-uswds @uswds/uswds
```

Check [Releases](https://github.com/GSA-TTS/svelte-ui/releases) for version history.

## Static Assets Setup

This package includes SVG image assets used by certain components. **You must copy these to your application's public directory** for the components to display correctly.

### Quick Setup

Copy all image assets to your project:

**SvelteKit:**

```bash
mkdir -p static/assets/img
cp node_modules/@gsa-tts/svelte-ui-uswds/src/lib/assets/img/*.svg static/assets/img/
```

**Vite:**

```bash
mkdir -p public/assets/img
cp node_modules/@gsa-tts/svelte-ui-uswds/src/lib/assets/img/*.svg public/assets/img/
```

> **Tip:** Only copy the assets for components you're using (see table below).

### Asset Reference

| File               | Size | Used By      | Required When                                        |
| ------------------ | ---- | ------------ | ---------------------------------------------------- |
| `uswds-icons.svg`  | 71KB | `Icon`       | Using the `<Icon>` component                         |
| `icon-dot-gov.svg` | <1KB | `DotGovIcon` | Using `<OfficialGovBanner>`                          |
| `icon-https.svg`   | <1KB | `HttpsIcon`  | Using `<OfficialGovBanner>`                          |
| `us_flag.svg`      | <1KB | `USFlag`     | Using `<OfficialGovBanner>` or standalone `<USFlag>` |

### How It Works

Components reference these assets via absolute paths:

```svelte
<!-- Icon component internally does this: -->
<use href="/assets/img/uswds-icons.svg#add"></use>

<!-- Image components do this: -->
<img src="/assets/img/icon-dot-gov.svg" alt="..." />
```

Your build tool serves files from the public directory at the root path (`/`), making `/assets/img/...` accessible.

### Automated Setup (Optional)

Add a postinstall script to automatically copy assets after `npm install`:

**SvelteKit projects:**

```json
{
  "scripts": {
    "postinstall": "mkdir -p static/assets/img && cp node_modules/@gsa-tts/svelte-ui-uswds/src/lib/assets/img/*.svg static/assets/img/"
  }
}
```

**Vite projects:**

```json
{
  "scripts": {
    "postinstall": "mkdir -p public/assets/img && cp node_modules/@gsa-tts/svelte-ui-uswds/src/lib/assets/img/*.svg public/assets/img/"
  }
}
```

> **Note:** The postinstall script runs after every `npm install`, which may be undesirable in CI/CD environments. Consider using a separate `setup` script instead:
>
> ```json
> "scripts": {
>   "setup:assets": "mkdir -p static/assets/img && cp node_modules/@gsa-tts/svelte-ui-uswds/src/lib/assets/img/*.svg static/assets/img/"
> }
> ```
>
> Then run `npm run setup:assets` once after installation.

### Import USWDS styles

**Option A - From node_modules (Recommended):**

```javascript
// In your app entry point (e.g., +layout.svelte or main.js)
import "@uswds/uswds/dist/css/uswds.min.css";
```

**Option B - From CDN:**

```html
<!-- In your index.html or app.html -->
<link
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/npm/@uswds/uswds@3.13.0/dist/css/uswds.min.css"
/>
```

### Import and use components

```svelte
<script>
  import { Button } from 'svelte-ui';
</script>

<Button>Click me</Button>
<Button variant="secondary">Secondary Button</Button>
<Button size="big">Big Button</Button>
```

### USWDS Assets (Fonts, Icons, Images)

We recommend using the USWDS CDN for assets:

```html
<!-- Add to your HTML head -->
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link
  href="https://fonts.googleapis.com/css2?family=Public+Sans:wght@400;700&family=Merriweather:wght@700&family=Roboto+Mono&display=swap"
  rel="stylesheet"
/>
```

For self-hosting assets, see the [USWDS documentation](https://designsystem.digital.gov/documentation/getting-started/developers/).

For detailed installation instructions, see [docs/INSTALLATION.md](./docs/INSTALLATION.md).

## Peer Dependencies

This library requires:

- **USWDS 3.13.x or higher** (but not 4.x)
- **Svelte 5.56.x or higher** (but not 6.x)

Optional:
- **mdsvex 0.12.x or higher** - For markdown content support (see [mdsvex Support](#mdsvex-support))

See [docs/VERSIONING.md](./docs/VERSIONING.md) for our version compatibility policy.

## Quick Start

> **Note:** This is a **component library**, not a full application. Use **Storybook** for component development and documentation.

### Using Docker Compose (Recommended)

The easiest way to develop with Docker - Storybook starts automatically:

```bash
# Build and start Storybook in the container
docker-compose up -d

# View Storybook at http://localhost:6006
```

The container will:

- ✅ Automatically install dependencies
- ✅ Start Storybook on port 6006
- ✅ Hot reload when you edit components
- ✅ Run in the background (`-d` flag)

**To view logs:**

```bash
docker-compose logs -f
```

**To stop:**

```bash
docker-compose down
```

**To run commands manually:**

```bash
# Enter the container
docker-compose exec dev bash

# Run tests
npm test

# Build the library
npm run build
```

### Local Development (Without Docker)

Requirements:

- Node.js 20+
- npm 10+

```bash
# Install dependencies
npm install

# Start Storybook for component development
npm run storybook

# Build the library
npm run build

# Run tests
npm test
```

## Project Structure

```
svelte-ui/
├── src/
│   ├── lib/
│   │   ├── components/     # Component implementations
│   │   ├── themes/         # Design system themes
│   │   └── utils/          # Utility functions
├── docs/
│   ├── adr/                # Architecture Decision Records
│   └── CODING_PRACTICES.md # Secure coding standards
├── .github/
│   └── workflows/          # CI/CD pipelines
├── Dockerfile              # Development container
├── docker-compose.yml      # Container orchestration
├── AGENTS.md               # AI agent behavioral rules
```

## Available Components

- **Button** - Customizable button component with USWDS styling

  ```svelte
  <Button variant="secondary" size="big">Secondary Button</Button>
  ```

- **Icon** - USWDS icon component with 243 icons

  ```svelte
  <Icon name="add" />
  <Icon name="close" size={5} />
  ```

- **Link** - Accessible link component with USWDS styling
- **Tag** - Badge/tag component for labels and status indicators
- **TextInput** - Form input with validation and accessibility
- **Textarea** - Multi-line text input component
- **Select** - Dropdown select component
- **Checkbox** - Accessible checkbox with label support
- **Radio** - Radio button input component

See [Storybook documentation](https://svelte-ui-library.app.cloud.gov) for interactive examples.

## mdsvex Support (Optional)

This library provides optional mdsvex support for building documentation sites, blogs, and content-heavy applications with USWDS styling.

### What is mdsvex?

mdsvex is a markdown preprocessor for Svelte that allows you to use Svelte components inside markdown files (`.svx`). Think of it as MDX for Svelte.

### Quick Start

**1. Install mdsvex:**

```bash
npm install -D mdsvex
```

**2. Configure in `svelte.config.js`:**

```javascript
import { mdsvex } from 'mdsvex';

export default {
  extensions: ['.svelte', '.svx'],
  preprocess: mdsvex({
    layout: '@gsa-tts/svelte-ui-uswds/mdsvex/layouts/DocsLayout.svelte'
  })
};
```

**3. Create `.svx` files:**

```mdsvex
---
title: Getting Started
description: Learn how to use this component library.
author: Jane Doe
date: 2026-06-25
---

# Installation

Run the following command:

\`\`\`bash
npm install @gsa-tts/svelte-ui-uswds
\`\`\`

<script>
  import { Button } from '@gsa-tts/svelte-ui-uswds';
</script>

<Button>Interactive Button</Button>
```

### Features

- **DocsLayout component** - USWDS-styled layout for markdown content
- **Automatic element replacement** - Links, headings, and paragraphs use USWDS components
- **Component integration** - Use any library component in your `.svx` files
- **Frontmatter support** - Add metadata (title, author, date, description)
- **USWDS prose styling** - Automatic typography with optimal readability

### Documentation

For complete mdsvex usage guide, see [docs/mdsvex/USAGE.md](./docs/mdsvex/USAGE.md).

**Example files:**
- [Basic usage](./docs/mdsvex/examples/basic-usage.svx)
- [With components](./docs/mdsvex/examples/with-components.svx)
- [Custom elements](./docs/mdsvex/examples/custom-elements.svx)

## Testing

Tests are consolidated in `.stories.ts` files.

### Unit Tests

```bash
npm test                 # Run tests
npm run test:coverage    # Coverage report
```

### Interaction Tests

```bash
npm run storybook        # Manual UI testing
npm run test:storybook   # Automated CLI testing
```

Example: `src/lib/components/Button/Button.stories.ts`

## Documentation

Component documentation is available through Storybook:

```bash
npm run storybook
```

Visit `http://localhost:6006` to view the interactive component documentation.

## Contributing

Please read [CONTRIBUTING.md](./CONTRIBUTING.md) and [AGENTS.md](./AGENTS.md) for details on our code of conduct and the process for submitting pull requests.

## Deployment

This Storybook is automatically deployed to cloud.gov when changes are pushed to the `main` branch (after CI tests pass).

**Live Site:** https://svelte-ui-library.app.cloud.gov

### Quick Deploy

```bash
# Automated (via GitHub Actions)
git push origin main

# Manual (requires CF CLI + cloud.gov login)
npm run deploy
```

For detailed deployment instructions, see [docs/DEPLOYMENT.md](./docs/DEPLOYMENT.md).

### Deployment Requirements

- Cloud.gov access to `sandbox-gsa` organization
- Service account credentials configured in GitHub Secrets
- All CI tests must pass before deployment

## For Maintainers

### Creating Releases

See [Release Process Guide](./docs/RELEASE_PROCESS.md) for step-by-step instructions on creating and publishing releases.

**Quick reference:**

```bash
npm run release:alpha  # Alpha release
npm run release:beta   # Beta release
npm run release        # Patch release
npm run release:minor  # Minor release
npm run release:major  # Major release
```

After merging the release PR, create a GitHub Release to trigger automated publishing to npm.

## License

This project is in the public domain within the United States.

## Security

For security concerns, please see [SECURITY.md](./SECURITY.md).

## Compliance

- **Impact Level:** FIPS Low
- **Data Classification:** Public data only
- **Accessibility:** Section 508 compliant
- **ATO Status:** Pre-ATO development

## Project Team

- **Project Owner:** Jeff Keene - Engineer
- **Agency:** GSA-TTS

## Resources

- [Svelte Documentation](https://svelte.dev/)
- [USWDS Design System](https://designsystem.digital.gov/)
- [Section 508 Standards](https://www.section508.gov/)
- [Architecture Decisions](./docs/adr/)

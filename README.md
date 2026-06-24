# Svelte UI - Component Library

[![npm version](https://badge.fury.io/js/@jeffkeene-gsa%2Fsvelte-ui-uswds.svg)](https://www.npmjs.com/package/@jeffkeene-gsa/svelte-ui-uswds)
[![npm downloads](https://img.shields.io/npm/dm/@jeffkeene-gsa/svelte-ui-uswds.svg)](https://www.npmjs.com/package/@jeffkeene-gsa/svelte-ui-uswds)

A comprehensive, adaptable Svelte component library that leverages the U.S. Web Design System (USWDS) as the default design system while maintaining design system-agnostic flexibility.

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
npm install @jeffkeene-gsa/svelte-ui-uswds@alpha @uswds/uswds
```

### For Stable Releases (When Available)

```bash
npm install @jeffkeene-gsa/svelte-ui-uswds @uswds/uswds
```

Check [Releases](https://github.com/GSA-TTS/svelte-ui/releases) for version history.

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

- **TextInput** - Form input with validation and accessibility (planned)
- **Checkbox** - Accessible checkbox with label support (planned)

See [Storybook documentation](https://svelte-ui-library.app.cloud.gov) for interactive examples.

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

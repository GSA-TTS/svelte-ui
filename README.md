# Svelte UI - Component Library

A comprehensive, adaptable Svelte component library that leverages the U.S. Web Design System (USWDS) as the default design system while maintaining design system-agnostic flexibility.

## Features

- Fully customizable Svelte 5.x components
- USWDS default styling with Section 508 accessibility compliance
- Framework-agnostic design system support
- Modular and extensible architecture
- Optimized for performance and accessibility
- Comprehensive testing with Vitest and Storybook
- Interactive documentation with Storybook

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
- **TextInput** - Form input with validation and accessibility
- **Checkbox** - Accessible checkbox with label support

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
- [Project Plan](./PROJECT_PLAN.md)
- [Architecture Decisions](./docs/adr/)

# Contributing to Svelte UI

Thank you for your interest in contributing to Svelte UI! This component library provides government-ready Svelte components built on the U.S. Web Design System (USWDS).

## Getting Help

- **Questions:** [Open a GitHub issue](https://github.com/gsa/svelte-ui/issues/new)
- **Bugs:** [Report an issue](https://github.com/gsa/svelte-ui/issues/new) with reproduction steps
- **Security issues:** See [SECURITY.md](./SECURITY.md)

## Quick Links

- [Installation Guide](./docs/INSTALLATION.md)
- [Version Compatibility](./docs/VERSIONING.md)
- [Coding Standards](../agentic-coding-playbook/docs/CODING_STANDARDS_COMPACT.md)
- [Architecture Decisions](./docs/adr/)
- [Live Storybook](https://svelte-ui-library.app.cloud.gov)

## Development Setup

### Prerequisites

- **Node.js:** 24.x or higher
- **npm:** 10.x or higher
- **Git:** For version control

### First-Time Setup

1. **Clone the repository:**

   ```bash
   git clone https://github.com/gsa/svelte-ui.git
   cd svelte-ui
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Start Storybook:**

   ```bash
   npm run storybook
   ```

   Visit `http://localhost:6006` to view components.

### Development Dependencies

This project uses peer dependencies for USWDS and Svelte:

- **For development:** USWDS and Svelte are in `devDependencies` with exact versions (`3.13.0`, `5.56.1`)
- **For consumers:** USWDS and Svelte are in `peerDependencies` with caret ranges (`^3.13.0`, `^5.56.1`)

**What this means:**

- We test against exact USWDS 3.13.0 and Svelte 5.56.1 during development
- Consumers can use compatible versions (3.13.x-3.x.x, 5.56.x-5.x.x)
- Contributors install normally: `npm install` gets exact versions

## How to Contribute

We welcome contributions! Here's how to get started:

### Types of Contributions

- **Bug fixes** - Fix issues in existing components
- **New components** - Add USWDS components to the library
- **Documentation** - Improve guides, examples, or Storybook stories
- **Tests** - Add or improve test coverage
- **Accessibility** - Enhance Section 508 compliance

### Contribution Workflow

1. **Open an issue first** (for major changes)
   - Describe the problem or feature
   - Discuss the approach
   - Get feedback before starting work

2. **Fork and create a branch:**

   ```bash
   git checkout -b feat/my-new-component
   ```

3. **Make your changes:**
   - Follow coding standards (see below)
   - Write or update tests
   - Update documentation

4. **Test your changes:**

   ```bash
   npm run lint           # Check code style
   npm run type-check     # TypeScript validation
   npm test               # Run unit tests
   npm run storybook      # Visual testing
   ```

5. **Commit using conventional commits:**

   ```bash
   git commit -m "feat: add TextInput component"
   ```

6. **Push and create a Pull Request:**
   ```bash
   git push origin feat/my-new-component
   ```

### Adding a New Component

When adding a new USWDS component:

1. **Create component directory:**

   ```
   src/lib/components/ComponentName/
   ├── ComponentName.svelte
   ├── ComponentName.types.ts
   └── ComponentName.stories.ts
   ```

2. **Component structure:**
   - Use Svelte 5 runes (`$props`, `$derived`, `$state`)
   - Use USWDS utility classes
   - Support Section 508 accessibility
   - Include TypeScript types

3. **Add Storybook story with tests:**
   - Create stories for all variants
   - Add `play()` functions for interaction tests
   - Document props in story

4. **Export from library:**
   ```typescript
   // src/lib/index.ts
   export { default as ComponentName } from "./components/ComponentName/ComponentName.svelte";
   export type { ComponentProps } from "./components/ComponentName/ComponentName.types.js";
   ```

## Coding Standards

This project follows strict coding standards to ensure quality and consistency.

### Key Standards

- **Svelte 5 only** - Use runes API, no legacy syntax
- **TypeScript** - All components must be typed
- **USWDS classes** - Use USWDS utility classes for styling
- **Accessibility** - Section 508 compliance required
- **Testing** - Tests in `*.stories.ts` files using `play()` functions
- **No barrel files** - Only `src/lib/index.ts` exports components

### Component Guidelines

- Maximum function length: 50 lines
- Use `$props()` instead of `export let`
- Use `onclick={}` instead of `on:click={}`
- Use `{#snippet}` and `{@render}` instead of `<slot>`
- Define only component-specific props, use `...restProps` for HTML attributes
- Avoid unnecessary comments - code should be self-documenting

For complete coding standards, see [CODING_STANDARDS_COMPACT.md](../agentic-coding-playbook/docs/CODING_STANDARDS_COMPACT.md).

## Testing Requirements

All components must include tests. Tests are embedded in Storybook stories.

### Test Strategy

- **Unit tests:** Embedded in `*.stories.ts` files using `play()` functions
- **Interaction tests:** Use `@storybook/test` for user interactions
- **Visual tests:** Storybook provides visual regression capability
- **Accessibility tests:** Automated with `@storybook/addon-a11y`

### Running Tests

```bash
# Run unit tests
npm test

# Run with coverage
npm run test:coverage

# Run Storybook interaction tests
npm run test:storybook

# Visual testing (manual)
npm run storybook
```

### Writing Tests

Tests go in the `play()` function of your story:

```typescript
export const Primary: Story = {
  args: {
    children: "Click me",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole("button");

    // Test interaction
    await userEvent.click(button);

    // Assert result
    await expect(button).toBeInTheDocument();
  },
};
```

### Test Coverage Requirements

- All interactive components must have interaction tests
- All props/variants must be tested
- Accessibility tests must pass (no violations)
- Aim for 80%+ code coverage

## Commit Message Format

We follow [Conventional Commits 1.0.0](https://www.conventionalcommits.org/) for automated changelog generation.

### Format

```
<type>(<scope>): <description>

[optional body]

[optional footer]
```

### Types

| Type       | Description             | Example                              |
| ---------- | ----------------------- | ------------------------------------ |
| `feat`     | New feature             | `feat: add TextInput component`      |
| `fix`      | Bug fix                 | `fix: correct button aria-label`     |
| `docs`     | Documentation           | `docs: update installation guide`    |
| `style`    | Code style (formatting) | `style: fix indentation`             |
| `refactor` | Code refactoring        | `refactor: simplify Button logic`    |
| `test`     | Add/update tests        | `test: add Button interaction tests` |
| `chore`    | Maintenance             | `chore: update dependencies`         |

### Examples

✅ **Good:**

```
feat(components): add Checkbox component

Implements USWDS checkbox with full accessibility support
including keyboard navigation and screen reader labels.

Closes #42
```

```
fix(button): correct disabled state styling

The disabled button was not showing the correct USWDS
disabled styling due to incorrect class application.
```

❌ **Bad:**

```
update stuff
```

```
fixed bug
```

### AI Agent Attribution

When AI agents contribute, add co-author:

```
feat: add new component

Co-authored-by: AI Agent <ai-agent@gsa.gov>
```

## Release Process

Releases use `standard-version` for automated changelog and version management.

### Release Commands

```bash
# Stable releases
npm run release          # Patch (0.1.0 → 0.1.1)
npm run release:minor    # Minor (0.1.0 → 0.2.0)
npm run release:major    # Major (0.1.0 → 1.0.0)

# Pre-releases
npm run release:alpha    # Alpha (0.1.0 → 1.0.0-alpha.0)
npm run release:beta     # Beta (0.1.0 → 1.0.0-beta.0)
npm run release:rc       # RC (0.1.0 → 1.0.0-rc.0)

# Bump existing pre-release
npm run release -- --prerelease
```

### Publishing to npm

```bash
# Stable release
npm publish

# Pre-releases
npm run publish:alpha
npm run publish:beta
npm run publish:rc
```

### Full Release Workflow

1. **Ensure all tests pass:**

   ```bash
   npm run lint && npm run type-check && npm test
   ```

2. **Create release:**

   ```bash
   npm run release
   ```

3. **Review generated CHANGELOG.md**

4. **Push with tags:**

   ```bash
   git push --follow-tags origin main
   ```

5. **Publish to npm:**
   ```bash
   npm publish
   ```

### Pre-release Workflow

Use pre-releases for testing before stable:

```bash
# Create alpha
npm run release:alpha
git push --follow-tags origin main
npm run publish:alpha

# Bump alpha after fixes
npm run release -- --prerelease
git push --follow-tags origin main
npm run publish:alpha

# Graduate to stable
npm run release
git push --follow-tags origin main
npm publish
```

See [docs/VERSIONING.md](./docs/VERSIONING.md) for detailed pre-release guidelines.

## Pull Request Process

1. **Update documentation** if adding features or changing APIs
2. **Add/update tests** for all code changes
3. **Ensure all checks pass:**
   - Linting (`npm run lint`)
   - Type checking (`npm run type-check`)
   - Tests (`npm test`)
   - Build (`npm run build`)
4. **Request review** from maintainers
5. **Address feedback** promptly

### PR Checklist

- [ ] Tests added/updated and passing
- [ ] Documentation updated
- [ ] Storybook story created/updated
- [ ] Accessibility verified (no a11y violations)
- [ ] USWDS styling correct
- [ ] Conventional commit format used
- [ ] CHANGELOG.md will be auto-generated (don't edit manually)

## Code of Conduct

### Our Standards

- Be respectful and professional
- Focus on what's best for the project and community
- Accept constructive criticism gracefully
- Show empathy toward other contributors

### Unacceptable Behavior

- Harassment, discrimination, or personal attacks
- Trolling or insulting/derogatory comments
- Publishing others' private information
- Unprofessional conduct

## Project Team

- **Project Owner:** Jeff Keene - Engineer
- **Agency:** GSA-TTS

## License

By contributing, you agree that your contributions will be licensed under the CC0-1.0 License (public domain).

## Questions?

- Open an issue on GitHub
- Check existing issues and documentation first
- Be specific and provide context

Thank you for contributing to Svelte UI! 🎉

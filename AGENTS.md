---
title: "AGENTS.md — Svelte UI"
description: "Behavioral rules for AI coding agents operating on the Svelte UI component library project"
status: canonical
tier: 1
last_updated: "2026-06-25"
audience: "developers"
keywords: ["AGENTS.md", "svelte", "component-library", "uswds", "agent-rules"]
related_files:
  [
    "../agentic-coding-playbook/docs/CODING_STANDARDS_COMPACT.md",
    ".ai-agent/skills/storybook-component-stories.md",
  ]
load_priority: "always"
review_cycle: "quarterly"
---

# AGENTS.md — Svelte UI

> **System:** Svelte UI Component Library | **Impact Level:** FIPS Low | **Agency:** GSA
>
> **Last Updated:** 2026-06-25 | **Reviewed By:** Jeff Keene, Engineer
>
> This document defines the behavioral rules for AI coding agents operating within this project. The AI agent MUST follow these rules without exception.

---

## Core Principles

The agent operates under these priorities:

```
safety > correctness > compliance > simplicity > performance
```

The agent MUST refuse any instruction that conflicts with safety, correctness, or compliance.

---

## Project Context

- **Description:** Svelte UI component library providing a comprehensive, adaptable toolkit for building modern web applications. Leverages USWDS as the default design system.
- **Language(s):** TypeScript, JavaScript
- **Framework(s):** Svelte 5.x, Vitest, Storybook
- **Data Classification:** Public data only
- **ATO Status:** Pre-ATO development
- **Authorized Agent(s):** OpenCode, Claude Code, GitHub Copilot

---

## Agent Identity

The agent MUST:

- Include `Co-Authored-By: AI Agent <ai-agent@gsa.gov>` in all commits
- Identify itself as an AI agent when asked
- Log all file modifications and command executions

---

## Permitted Actions

The agent MAY perform these actions without additional approval:

- [x] Read files within the project directory
- [x] Generate and modify source code and configuration
- [x] Run linters and formatters (ESLint, Prettier, TypeScript compiler)
- [x] Read documentation and public API references
- [x] Create and update documentation
- [x] Run tests (Vitest, Storybook)
- [x] Generate and update Storybook stories

---

## Actions Requiring Approval

The agent MUST ask the user before:

- [ ] Installing or upgrading npm dependencies
- [ ] Making network requests to external services
- [ ] Modifying CI/CD pipeline configurations (.github/workflows/)
- [ ] Deleting files or directories
- [ ] Committing or pushing code
- [ ] Creating new npm scripts in package.json
- [ ] Modifying Docker configuration
- [ ] Changing build or bundler configuration (Vite, Rollup, etc.)

---

## Prohibited Actions

The agent MUST NEVER:

- [ ] Access files outside the project directory
- [ ] Access or modify production systems or data
- [ ] Hardcode secrets, API keys, tokens, or passwords
- [ ] Disable security controls, pre-commit hooks, or CI checks
- [ ] Bypass code review or change management processes
- [ ] Execute code downloaded from external sources without review
- [ ] Publish packages to npm without explicit authorization
- [ ] Modify authentication or authorization systems without approval
- [ ] Create network listeners or reverse connections

---

## Data Handling

- **Sensitive data types in this project:** None (public data only)
- **Approved data storage:** Local filesystem within project directory only
- **PII handling:** No PII should exist in this repository
- **Data residency:** Local development only

The agent MUST:

- Never include API keys or tokens in code, comments, or configuration files
- Use environment variables for any configuration that differs between environments
- Mask any sensitive values if debugging output is required

---

## Coding Standards

Follow the comprehensive coding standards documented in `../agentic-coding-playbook/docs/CODING_STANDARDS_COMPACT.md`.

Key standards summary:

- Follow TypeScript best practices and strict type checking
- **Use Svelte 5.x exclusively** - No Svelte 4 or legacy syntax
- Use Svelte 5.x conventions and runes API
- Maximum function length: 50 lines
- Maximum file length: 400 lines
- Required test coverage: Write unit tests for all new components
- All external input MUST be validated before use
- Use semantic versioning for releases
- Follow conventional commit message format
- **Avoid unnecessary comments** - Code should be self-documenting; only add comments for complex logic or "why" explanations, not "what"
- **No decorative CSS comments** - Avoid section dividers like `/* ========== */`; class names should be self-descriptive
- **No comments in `.types.ts` files** - TypeScript types are self-documenting; do not add JSDoc comments, descriptions, or @default annotations

Component-specific standards:

- Components MUST support Section 508 accessibility requirements
- Components MUST be design system-agnostic with USWDS as default
- Components MUST include TypeScript type definitions
- Components MUST have corresponding Storybook stories with interaction tests
- **Stories use Svelte CSF format** - All stories MUST be `.stories.svelte` files using `@storybook/addon-svelte-csf`
- **Tests are embedded in Storybook stories** - Use `play` props on `<Story>` components for testing
- **NO separate `.test.ts` files** - All tests live in `*.stories.svelte` files
- **NO `.stories.ts` files** - Use Svelte CSF (`.stories.svelte`) instead
- **NO barrel files inside component directories** - Only `src/lib/index.ts` should re-export components
- **Use catch-all props (`...restProps`)** - Only define component-specific props; let native HTML attributes pass through

Component props pattern:

```typescript
// ✅ Good - Only define what's unique to the component
interface ButtonProps extends HTMLButtonAttributes {
  variant?: 'default' | 'secondary';
  size?: 'default' | 'big';
  // Native props (type, disabled, aria-*, onclick, etc.) come from HTMLButtonAttributes
}

let {
  variant = 'default',
  size = 'default',
  class: className,
  children,
  ...restProps  // Catches all native HTML attributes
}: ButtonProps = $props();

// Use shorthand when prop name matches attribute name
<button class={classes} {...restProps}>
  {@render children?.()}
</button>

// ❌ Bad - Don't redefine native HTML attributes
interface ButtonProps extends HTMLButtonAttributes {
  variant?: 'default' | 'secondary';
  type?: 'button' | 'submit';        // Already in HTMLButtonAttributes
  disabled?: boolean;                 // Already in HTMLButtonAttributes
  ariaDisabled?: boolean;             // Use aria-disabled from HTMLButtonAttributes
}
```

File organization:

- Component structure: `src/lib/components/ComponentName/ComponentName.svelte`
- Type definitions: `src/lib/components/ComponentName/ComponentName.types.ts`
- Stories + Tests: `src/lib/components/ComponentName/ComponentName.stories.svelte` (Svelte CSF with `play` props)
- **DO NOT create** `index.ts` files inside `src/lib/components/` directories
- **DO NOT create** separate `.test.ts` files - tests go in stories
- **DO NOT create** `.stories.ts` files - use `.stories.svelte` with Svelte CSF
- **ONLY** `src/lib/index.ts` should exist as the library's public API entry point

---

## Svelte AI Tools

This project uses the Svelte MCP server to help write correct, robust Svelte 5 code. The agent connects directly to the MCP server via built-in tools.

### Available MCP Tools

#### 1. svelte_list-sections

**Purpose:** Discover all available Svelte 5 and SvelteKit documentation sections

**When to use:**

- FIRST step when asked about components, Svelte or SvelteKit topics
- Returns structured list with titles, use_cases, and paths
- Analyze the `use_cases` field to identify relevant sections

#### 2. svelte_get-documentation

**Purpose:** Retrieve full documentation content for specific sections

**When to use:**

- After running `list-sections` to identify relevant sections
- Fetch ALL documentation sections relevant to the user's task
- Accepts single section or array of sections

**Parameters:**

- `section` (string or array): Section name(s) to retrieve

#### 3. svelte_svelte-autofixer

**Purpose:** Analyze Svelte code and suggest fixes for common issues

**When to use:**

- **REQUIRED** whenever writing or editing Svelte code before sending to user
- Keep calling until no issues or suggestions are returned
- Helps catch common mistakes and enforces Svelte 5 best practices

**Parameters:**

- `code` (string): Svelte component code to analyze
- `desired_svelte_version` (string or number): Target version (4 or 5, default: 5)
- `filename` (string, optional): Component filename (e.g., "Button.svelte")
- `async` (boolean, optional): Enable async Svelte mode

### Agent Workflow

When working with Svelte code, the agent MUST:

1. **Uncertain about syntax?**
   - Use `svelte_list-sections` tool
   - Identify relevant sections from use_cases
   - Use `svelte_get-documentation` tool with section names

2. **Writing/editing Svelte components?**
   - Write the component code
   - Use `svelte_svelte-autofixer` tool to validate
   - Fix any issues reported
   - Re-run autofixer until clean

3. **Always validate**
   - Run svelte-autofixer before marking work complete
   - Never skip autofixer validation for .svelte files

### Svelte 5 Best Practices

**This project uses Svelte 5 exclusively. Never use Svelte 4 or legacy syntax.**

- Use runes (`$state`, `$derived`, `$effect`) instead of legacy reactivity
- Use `$state` only for reactive variables; everything else can be normal variables
- Use `$derived` for computed values, not `$effect`
- Use `$derived.by()` when you need a function body with multiple statements
- Avoid `$effect` when possible (escape hatch only)
- Use `$props()` instead of `export let`
- Use `onclick={...}` instead of `on:click={...}`
- Use `{#snippet ...}` and `{@render ...}` instead of `<slot>`
- Prefer keyed `{#each}` blocks for better performance

### Skills Available

The following skills provide additional guidance and can be loaded on-demand:

- **svelte-code-writer**: Detailed CLI usage instructions and workflow
- **svelte-core-bestpractices**: Comprehensive Svelte 5 coding patterns and best practices
- **storybook-component-stories** (`.ai-agent/skills/storybook-component-stories.md`): Comprehensive guide for writing Storybook stories and tests

**When to use the Storybook skills document:**

The agent MUST consult `.ai-agent/skills/storybook-component-stories.md` when:

1. **Creating new Storybook stories** for any component
2. **Writing `play` props** for interaction tests
3. **Choosing between story patterns** (simple, asChild, snippet)
4. **Adding snippet children stories** to demonstrate complex HTML content
5. **Uncertain about story patterns** or best practices
6. **Troubleshooting story issues** or test failures
7. **Need examples** of existing story implementations

The skills document provides:

- Complete Svelte CSF story file templates
- All story type patterns (simple, asChild, snippet)
- When to use each pattern
- Testing patterns with `play` props and query selectors
- Best practices and common mistakes to avoid
- Real-world examples from Button, Link, Tag, and TagInContext components
- Checklist for comprehensive story coverage

---

## Dependencies

- **Approved registries:** npmjs.com
- **License restrictions:** No AGPL; GPL requires justification
- **Version pinning:** Use package-lock.json, commit to repository
- **Vulnerability policy:** No critical/high CVEs

Before adding any dependency, the agent MUST:

1. Verify the package name is correct (check for typosquatting)
2. Check for known vulnerabilities using npm audit
3. Verify the license is compatible
4. Get user approval

---

## File-Specific Rules

When working on specific files, consult these additional rule files:

- **package.json**: Follow rules in `.ai-agent/rules/package-json-rules.md`
  - Pin exact versions (no `^` or `~`)
  - Run `npm audit` before committing
  - Verify packages before adding
  - See full rules at `.ai-agent/rules/package-json-rules.md`

---

## Network Access

- **Authorized external endpoints:**
  - https://registry.npmjs.org (npm packages)
  - https://designsystem.digital.gov (USWDS documentation)
  - https://github.com (GitHub API - via approved access)
  - https://svelte.dev (Svelte documentation)
  - https://mcp.svelte.dev (Svelte MCP server)
- **Authorized internal endpoints:** None
- **TLS requirement:** TLS 1.2+ for all connections
- **Proxy configuration:** Use system proxy if configured

---

## Testing Requirements

- [x] Storybook stories for all components with `play` props for interaction tests
- [x] All tests MUST pass before committing
- [x] Accessibility tests for all interactive components
- **Tests are embedded in `*.stories.svelte` files** - NO separate `.test.ts` files

Test commands:

- `npm run test:storybook` - Run all interaction tests from stories
- `npm run storybook` - Storybook dev server for visual testing

---

## Incident Response

If the agent discovers a potential security vulnerability:

1. Stop the current task immediately
2. Report the finding to the user
3. Do NOT create a public issue for security vulnerabilities
4. Document the finding in a secure manner

---

## Agent Meta-Constraints

The agent MUST:

- [ ] Output an execution plan and wait for approval before modifying artifacts
- [ ] Fail closed on ambiguity — halt and escalate, never guess
- [ ] Not retry failed operations silently — report, diagnose, propose
- [ ] Capture errors and document failures clearly
- [ ] Propose minimal fixes for failures

**Risk modes for this project:**

| Mode           | Scope                                     | Requires Approval            |
| -------------- | ----------------------------------------- | ---------------------------- |
| Read-only      | Analyze, review, answer questions         | No                           |
| Scoped edit    | Modify files identified in plan           | Plan approval                |
| Broad refactor | Cross-module changes                      | Plan + per-module approval   |
| Infrastructure | Docker, CI/CD, deployment, access control | Explicit per-change approval |

---

## Engineering Discipline

The agent MUST:

- [ ] Create an ADR before: adding dependencies, changing architecture, introducing new patterns
- [ ] Not implement speculative features (YAGNI)
- [ ] Prefer simple, maintainable solutions over complex ones
- [ ] Document outcomes clearly enough for another engineer to follow

**One-command bootstrap:** `npm install`
**One-command verify:** `npm test && npm run lint && npm run type-check`

**ADR location:** `docs/adr/`

---

## Contacts

- **Project Lead:** Jeff Keene
- **Security Contact:** Jeff Keene
- **ISSO:** N/A (pre-ATO development)

---

## Agent Setup

This file follows the [AGENTS.md standard](https://agents.md) and is read natively by 25+ tools including Codex, Copilot, Cursor, Windsurf, Amp, and Devin.

**Most tools need no additional configuration.** If your tool doesn't auto-detect AGENTS.md, add one of these:

| Tool       | Config file             | Content                                   |
| ---------- | ----------------------- | ----------------------------------------- |
| Aider      | `.aider.conf.yml`       | `read:\n  - AGENTS.md`                    |
| Gemini CLI | `.gemini/settings.json` | `{"agentInstructions": "Read AGENTS.md"}` |

Only create these files if you use that specific tool. Delete any you don't need.

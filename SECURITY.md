# Security Policy

## Scope

This repository contains the **Svelte UI component library** — a public open source project providing Svelte 5.x components with USWDS styling. It includes:

- **Svelte components** designed for government and public use
- **Interactive documentation** via Storybook
- **Build and deployment tooling**

This is a public component library. Security concerns here relate to:

- Component vulnerabilities (XSS, injection, etc.)
- Dependency vulnerabilities in npm packages
- Build and deployment pipeline security
- Accessibility and Section 508 compliance issues
- Improper handling of user input in components

> **Note:** This is a component library for building user interfaces. Applications using this library are responsible for their own security controls, data handling, and compliance requirements.

## Reporting Security Issues

This is a **public open source repository**. If you discover a security vulnerability, please report it responsibly.

### For Security Vulnerabilities

**DO NOT** create a public GitHub issue for security vulnerabilities.

Instead, please report security issues via one of these methods:

1. **GitHub Security Advisories** (Preferred)
   - Navigate to the repository's Security tab
   - Click "Report a vulnerability"
   - Provide detailed information about the vulnerability

2. **Email**
   - Contact the project maintainers directly (see [CONTRIBUTING.md](./CONTRIBUTING.md))
   - Include detailed information about the vulnerability
   - Allow reasonable time for a fix before public disclosure

Please include:

- Description of the vulnerability
- Steps to reproduce the issue
- Potential impact and severity
- Suggested fix (if you have one)
- Your contact information for follow-up

We will acknowledge your report within 72 hours and provide a more detailed response within 7 days indicating the next steps.

### For Non-Security Issues

For bugs, feature requests, and other issues that are not security-related:

1. **Check existing issues** to see if it's already been reported
2. **Create a GitHub issue** with detailed information
3. **Submit a Pull Request** if you have a fix

### For Accessibility Issues

Section 508 compliance is a priority for this project. If you discover an accessibility issue:

1. **Create a GitHub issue** labeled `accessibility`
2. Include WCAG criteria reference (if applicable)
3. Describe the assistive technology affected (screen readers, keyboard navigation, etc.)
4. Suggest a fix if possible

## Dependency Security

This project uses automated dependency scanning and follows strict security practices:

### Automated Scanning

- **npm audit** runs on every CI build
- **Dependabot** automatically creates PRs for security updates
- **GitHub Security Advisories** notify maintainers of vulnerabilities

### Version Pinning

- All dependencies use exact versions (no `^` or `~`)
- `package-lock.json` is committed to the repository
- Updates are reviewed and tested before merging

### Vulnerability Response

When a vulnerability is detected:

1. **Critical/High severity:** Patch within 7 days
2. **Medium severity:** Patch within 30 days
3. **Low severity:** Patch in next regular release

Run security audits locally:

```bash
npm audit                    # View all vulnerabilities
npm audit --audit-level=high # Show only high/critical
npm audit fix                # Auto-fix compatible updates
```

### Supply Chain Security

- All dependencies are verified before adding
- Packages are checked for typosquatting
- License compatibility is verified
- Maintainer reputation is considered

## Security Best Practices

When using this component library:

### For Library Users

1. **Keep dependencies updated** — Regularly update `svelte-ui` and its peer dependencies
2. **Review release notes** — Check [CHANGELOG.md](./CHANGELOG.md) for security fixes
3. **Validate user input** — This library does NOT sanitize user input; applications must validate all data
4. **Follow USWDS guidance** — See [USWDS security documentation](https://designsystem.digital.gov/)
5. **Test accessibility** — Use automated tools (axe, WAVE) and manual testing

### For Contributors

1. **Never commit secrets** — No API keys, tokens, or credentials in code
2. **Follow secure coding practices** — See [docs/CODING_PRACTICES.md](./docs/CODING_PRACTICES.md)
3. **Write tests** — All components must have interaction tests in Storybook
4. **Review agent-generated code** — AI-assisted development requires human review
5. **Follow [AGENTS.md](./AGENTS.md)** — Behavioral contract for AI agents

### Component Security

Components in this library:

- ✅ Escape all user-provided content by default (Svelte's built-in behavior)
- ✅ Support ARIA attributes for accessibility
- ✅ Use semantic HTML elements
- ❌ Do NOT sanitize HTML (applications must do this)
- ❌ Do NOT validate business logic (applications must do this)

## Supported Versions

We provide security updates for the following versions:

| Version | Supported          | Status             |
| ------- | ------------------ | ------------------ |
| 0.1.x   | :white_check_mark: | Active development |
| < 0.1   | :x:                | Not released       |

Security updates are applied to the current release line. Check the [CHANGELOG](./CHANGELOG.md) for version history.

### Version Support Policy

- **Current major version:** Receives all security updates
- **Previous major version:** Receives critical security updates for 6 months after new major release
- **Older versions:** No longer supported

We follow [Semantic Versioning 2.0.0](https://semver.org/):

- **Major (X.0.0):** Breaking changes
- **Minor (0.X.0):** New features (backward-compatible)
- **Patch (0.0.X):** Bug fixes and security patches

## Disclosure Policy

When a security vulnerability is reported and fixed:

1. **Develop fix** — Create and test the patch
2. **Create security advisory** — Document the issue (GitHub Security Advisories)
3. **Release patch** — Publish new version with fix
4. **Public disclosure** — Announce after patch is available (typically within 7 days of report)
5. **Credit reporter** — Acknowledge security researchers (with permission)

We aim to:

- Acknowledge reports within 72 hours
- Provide initial assessment within 7 days
- Release patches for critical issues within 14 days
- Coordinate disclosure timing with reporter

## Known Security Considerations

### Component Library Boundaries

This library provides UI components but does not:

- Sanitize HTML content (use DOMPurify or similar in your app)
- Validate business logic (implement in your application)
- Handle authentication/authorization (application responsibility)
- Encrypt data (handled by transport layer and application)

### Input Handling

Components accept props and pass through HTML attributes:

```svelte
<!-- ❌ Unsafe - Don't pass unsanitized HTML -->
<Button onclick={() => eval(userInput)}>Click me</Button>

<!-- ✅ Safe - Use Svelte's built-in escaping -->
<Button>{userContent}</Button>

<!-- ✅ Safe - Validate in your app before passing -->
<TextInput value={sanitizedUserInput} />
```

### Client-Side Security

This is a client-side component library. Applications using it must:

- Validate all user input on the server
- Implement Content Security Policy (CSP)
- Use HTTPS for all production deployments
- Follow OWASP security guidelines

## Security Resources

- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [Svelte Security Best Practices](https://svelte.dev/docs/introduction)
- [USWDS Security](https://designsystem.digital.gov/)
- [Section 508 Standards](https://www.section508.gov/)
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)

---

**Last Updated:** 2026-06-16

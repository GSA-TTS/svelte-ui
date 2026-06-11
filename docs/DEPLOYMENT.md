# Deploying Svelte UI Storybook to cloud.gov

This document describes how to deploy the Svelte UI Storybook to cloud.gov using both automated (GitHub Actions) and manual methods.

## Overview

- **App Name:** `svelte-ui-library`
- **URL:** https://svelte-ui-library.app.cloud.gov
- **Platform:** cloud.gov (Cloud Foundry)
- **Cloud.gov Org:** `sandbox-gsa`
- **Cloud.gov Space:** `jk-sandbox`
- **Environment:** Production
- **Access:** Public

## Prerequisites

### For Manual Deployment

1. **Cloud.gov account** with access to `sandbox-gsa` organization and `jk-sandbox` space
2. **CF CLI v8** installed:

   ```bash
   # macOS
   brew install cloudfoundry/tap/cf-cli@8

   # Linux/Windows - see https://docs.cloudfoundry.org/cf-cli/install-go-cli.html
   ```

3. **Node.js 24+** and **npm 10+**

### For Automated Deployment (GitHub Actions)

1. **Service account** credentials (see [Setup Service Account](#setup-service-account))
2. **GitHub Secrets** configured in repository settings

---

## Setup Service Account

Follow cloud.gov's service account guide to create deployment credentials:

### Step 1: Login to cloud.gov

```bash
cf login -a https://api.fr.cloud.gov --sso
```

Follow the prompts to authenticate via your browser.

### Step 2: Target your space

```bash
cf target -o sandbox-gsa -s jk-sandbox
```

### Step 3: Create a deployer service account

```bash
cf create-service cloud-gov-service-account space-deployer svelte-ui-deployer
```

This creates a service account with permission to deploy applications to the `jk-sandbox` space only (least privilege).

### Step 4: Create a service key

```bash
cf create-service-key svelte-ui-deployer deployer-key
```

### Step 5: View credentials

```bash
cf service-key svelte-ui-deployer deployer-key
```

**Output example:**

```json
{
  "username": "some-guid-here",
  "password": "long-secure-password-here"
}
```

**Save these credentials** - you'll need them for GitHub Secrets.

### Step 6: Configure GitHub Secrets

Navigate to your repository settings:

```
https://github.com/<your-org>/svelte-ui/settings/secrets/actions
```

Add the following secrets (New repository secret):

| Secret Name   | Value                     | Source        |
| ------------- | ------------------------- | ------------- |
| `CF_USERNAME` | Username from service key | Step 5 output |
| `CF_PASSWORD` | Password from service key | Step 5 output |

**Note:** The organization (`sandbox-gsa`) and space (`jk-sandbox`) are hardcoded in the workflow file, so you only need to add these 2 secrets.

---

## Automated Deployment (GitHub Actions)

Deployment happens automatically when code is pushed to the `main` branch, **after CI tests pass**.

### Workflow

1. **Push to main branch:**

   ```bash
   git push origin main
   ```

2. **GitHub Actions will:**
   - ✅ Wait for CI workflow to complete (test, build, security)
   - ✅ Build Storybook
   - ✅ Create Staticfile
   - ✅ Install CF CLI
   - ✅ Deploy to cloud.gov
   - ✅ Verify deployment

3. **Monitor progress:**
   - Go to **Actions** tab in GitHub repository
   - Check "Deploy to cloud.gov" workflow
   - View logs for detailed deployment information

### Manual Trigger

You can trigger deployment manually without pushing code:

1. Go to **Actions** tab in GitHub
2. Select "Deploy to cloud.gov" workflow from the left sidebar
3. Click **Run workflow** button (top right)
4. Select `main` branch
5. Click **Run workflow**

This is useful for:

- Redeploying after cloud.gov maintenance
- Testing deployment workflow changes
- Recovering from failed deployments

### Deployment Timeline

| Phase               | Duration       | Notes                 |
| ------------------- | -------------- | --------------------- |
| Wait for CI         | ~5-7 min       | CI must pass first    |
| Build Storybook     | ~1-2 min       | npm ci + build        |
| CF CLI Install      | ~30 sec        | Download + extract    |
| Deploy to cloud.gov | ~2-3 min       | Upload + health check |
| Verify              | ~5 sec         | App status check      |
| **Total**           | **~10-13 min** | From push to live     |

---

## Manual Deployment

### First-Time Setup

1. **Install CF CLI** (if not already installed):

   ```bash
   # macOS
   brew install cloudfoundry/tap/cf-cli@8

   # Verify installation
   cf --version
   ```

2. **Login to cloud.gov:**

   ```bash
   cf login -a https://api.fr.cloud.gov --sso
   ```

   Follow the prompts to authenticate via browser.

3. **Target your organization and space:**

   ```bash
   cf target -o sandbox-gsa -s jk-sandbox
   ```

   Verify with:

   ```bash
   cf target
   ```

### Deploy Commands

#### Option 1: Full deployment (recommended)

```bash
npm run deploy
```

This runs:

1. `npm run build-storybook` - Builds Storybook
2. `npm run deploy:prepare` - Creates Staticfile
3. `cf push` - Deploys to cloud.gov

#### Option 2: Step-by-step deployment

```bash
# Step 1: Build Storybook and prepare for deployment
npm run deploy:build

# Step 2: Verify build output
ls -la storybook-static/
cat storybook-static/Staticfile

# Step 3: Push to cloud.gov
npm run deploy:push
```

#### Option 3: Using CF CLI directly

```bash
# Build Storybook
npm run build-storybook

# Create Staticfile
echo "root: ." > storybook-static/Staticfile

# Login and target
cf login -a https://api.fr.cloud.gov --sso
cf target -o sandbox-gsa -s jk-sandbox

# Deploy
cf push
```

---

## Verify Deployment

### Check app status

```bash
cf apps
```

**Expected output:**

```
name                requested state   instances   memory   disk   urls
svelte-ui-library   started           1/1         128M     1G     svelte-ui-library.app.cloud.gov
```

### View app details

```bash
cf app svelte-ui-library
```

### View recent logs

```bash
cf logs svelte-ui-library --recent
```

### Stream live logs

```bash
cf logs svelte-ui-library
```

Press `Ctrl+C` to stop streaming.

### Test the live site

```bash
curl -I https://svelte-ui-library.app.cloud.gov
```

Or visit in browser: https://svelte-ui-library.app.cloud.gov

---

## Troubleshooting

### Build Fails

**Issue:** `npm run build-storybook` fails

**Solution:**

```bash
# Clean and rebuild
rm -rf node_modules storybook-static
npm install
npm run build-storybook
```

### Deployment Fails - Authentication Error

**Issue:** `Authentication failed` or `Invalid credentials`

**Solution:**

```bash
# Re-login with SSO
cf logout
cf login -a https://api.fr.cloud.gov --sso

# Verify you're targeting the correct space
cf target
```

### App Crashes After Deployment

**Issue:** App shows as "crashed" in `cf apps`

**Solution:**

```bash
# Check logs for errors
cf logs svelte-ui-library --recent

# Common issue: Missing Staticfile
# Ensure it's created in storybook-static/ before pushing
npm run deploy:build

# Verify Staticfile exists
cat storybook-static/Staticfile

# Redeploy
cf push
```

### Staticfile Not Found

**Issue:** `Error: No Staticfile found in app directory`

**Solution:**

```bash
# Ensure build script creates Staticfile
npm run deploy:build

# Verify Staticfile exists
ls -la storybook-static/Staticfile

# If missing, create manually:
echo "root: ." > storybook-static/Staticfile
cf push
```

### GitHub Actions Fails - Missing Secrets

**Issue:** GitHub Actions deployment fails with authentication error

**Solution:**

1. Verify GitHub Secrets are configured:
   - Repository → Settings → Secrets and variables → Actions
   - Check `CF_USERNAME` and `CF_PASSWORD` exist
2. If missing, follow [Setup Service Account](#setup-service-account) section
3. Re-run the workflow from GitHub Actions tab

### CF CLI Not Found

**Issue:** `cf: command not found`

**Solution:**

```bash
# macOS
brew install cloudfoundry/tap/cf-cli@8

# Linux
wget 'https://packages.cloudfoundry.org/stable?release=linux64-binary&version=8.8.0&source=github-rel' -O /tmp/cf8.tar.gz
sudo tar -xzf /tmp/cf8.tar.gz -C /usr/local/bin
cf --version

# Windows
# Download from: https://docs.cloudfoundry.org/cf-cli/install-go-cli.html
```

---

## Updating the Deployment

### Change App Configuration

Edit `manifest.yml` to change:

- Memory allocation
- Number of instances
- Routes/domains
- Environment variables

Then redeploy:

```bash
npm run deploy
```

### Scale App

#### Increase instances (horizontal scaling)

```bash
# Scale to 2 instances for high availability
cf scale svelte-ui-library -i 2

# Scale back to 1 instance
cf scale svelte-ui-library -i 1
```

#### Increase memory (vertical scaling)

```bash
# Increase to 256MB
cf scale svelte-ui-library -m 256M

# Decrease to 128MB (default)
cf scale svelte-ui-library -m 128M
```

**Note:** Cloud.gov bills based on memory × instances × time. Monitor usage to control costs.

### Update Environment Variables

```bash
# Set environment variable
cf set-env svelte-ui-library VARIABLE_NAME value

# View all environment variables
cf env svelte-ui-library

# Restart app to apply changes
cf restart svelte-ui-library
```

### Restart App

```bash
# Restart (preserves environment)
cf restart svelte-ui-library

# Restage (rebuilds with latest buildpack)
cf restage svelte-ui-library
```

### View App Events

```bash
cf events svelte-ui-library
```

Shows recent app lifecycle events (starts, stops, crashes, deploys).

---

## Common Operations

### Stop App

```bash
cf stop svelte-ui-library
```

The app URL will return a 404 error until restarted.

### Start App

```bash
cf start svelte-ui-library
```

### Delete App

**Warning:** This permanently deletes the app and its route.

```bash
cf delete svelte-ui-library
```

To redeploy after deletion:

```bash
npm run deploy
```

### SSH into App Container

```bash
# Enable SSH (if not already enabled)
cf enable-ssh svelte-ui-library

# SSH into the app container
cf ssh svelte-ui-library

# Once inside, you can explore the filesystem
ls -la
cat app/Staticfile
exit
```

**Note:** This is primarily for debugging. Static sites typically don't require SSH access.

### View Routes

```bash
cf routes
```

Shows all routes in the current space.

### Map Additional Route

```bash
# Map a custom route (if you have a custom domain)
cf map-route svelte-ui-library apps.internal --hostname svelte-ui-library
```

### Check App Health

```bash
cf app svelte-ui-library
```

Look for:

- **state:** `started` (should not be `crashed` or `stopped`)
- **instances:** `1/1` (all instances running)

---

## CI/CD Integration

### How It Works

The deployment workflow (`.github/workflows/cd.yml`) integrates with the CI workflow (`.github/workflows/ci.yml`):

1. **Code pushed to `main` branch**
2. **CI workflow runs** (`ci.yml`):
   - Type checking
   - Svelte checks
   - Linting
   - Unit tests
   - Storybook tests
   - Package build
   - Security scan
3. **CD workflow starts** (`cd.yml`):
   - Waits for CI to complete successfully
   - If CI fails, deployment is skipped
   - If CI passes, proceeds with deployment
4. **Deployment executes**:
   - Builds Storybook
   - Deploys to cloud.gov
   - Verifies deployment

### Deployment Dependencies

The CD workflow requires **all CI jobs to pass**:

- `Test` job
- `Build` job
- `Security` job

If any CI job fails, the deployment is automatically cancelled.

### Workflow Files

| File                       | Purpose                                          | Trigger                          |
| -------------------------- | ------------------------------------------------ | -------------------------------- |
| `.github/workflows/ci.yml` | Continuous Integration (tests, builds, security) | Push to `main`, PRs to `main`    |
| `.github/workflows/cd.yml` | Continuous Deployment (deploy to cloud.gov)      | Push to `main` (after CI passes) |
| `manifest.yml`             | Cloud.gov app configuration                      | Used by `cf push`                |
| `.cfignore`                | Files to exclude from deployment                 | Used by `cf push`                |

### Skipping Deployment

To push to `main` without triggering deployment, you cannot skip it directly. Instead:

**Option 1:** Use feature branches and PRs (recommended)

```bash
git checkout -b feature/my-changes
git push origin feature/my-changes
# Create PR, merge after review
```

**Option 2:** Temporarily disable workflow

- Go to repository → Settings → Actions → Disable "Deploy to cloud.gov"
- Push changes
- Re-enable workflow

---

## Security Best Practices

### Service Account

- ✅ **DO** use a service account for automated deployments
- ✅ **DO** limit service account to `space-deployer` role (least privilege)
- ✅ **DO** rotate credentials periodically
- ❌ **DON'T** use personal credentials in GitHub Actions
- ❌ **DON'T** commit credentials to the repository

### GitHub Secrets

- ✅ **DO** store credentials as GitHub Secrets
- ✅ **DO** limit repository access to authorized team members
- ✅ **DO** use environment protection rules for production
- ❌ **DON'T** print secrets in logs or outputs
- ❌ **DON'T** share secrets via chat or email

### Deployment Verification

Always verify deployments:

```bash
# Check app is running
cf app svelte-ui-library

# Test the live site
curl -I https://svelte-ui-library.app.cloud.gov

# Check recent logs for errors
cf logs svelte-ui-library --recent
```

### Monitoring

Set up monitoring for:

- App uptime and availability
- Response times
- Error rates
- Resource usage (memory, CPU)

Cloud.gov provides basic monitoring in the web dashboard: https://dashboard.fr.cloud.gov

---

## Resources

### Cloud.gov Documentation

- [Cloud.gov Homepage](https://cloud.gov)
- [Cloud.gov Documentation](https://docs.cloud.gov)
- [Deploying Static Sites](https://docs.cloud.gov/platform/deployment/static/)
- [Service Accounts](https://docs.cloud.gov/platform/services/cloud-gov-service-account/)
- [Continuous Deployment](https://docs.cloud.gov/platform/management/continuous-deployment/)
- [Troubleshooting](https://docs.cloud.gov/platform/deployment/troubleshooting/)

### Cloud Foundry Documentation

- [CF CLI Reference](https://cli.cloudfoundry.org/en-US/v8/)
- [CF CLI Installation](https://docs.cloudfoundry.org/cf-cli/install-go-cli.html)
- [Staticfile Buildpack](https://docs.cloudfoundry.org/buildpacks/staticfile/)
- [App Manifests](https://docs.cloudfoundry.org/devguide/deploy-apps/manifest.html)

### GitHub Actions

- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Managing Secrets](https://docs.github.com/en/actions/security-guides/encrypted-secrets)
- [Workflow Syntax](https://docs.github.com/en/actions/using-workflows/workflow-syntax-for-github-actions)

### Project Resources

- [Project README](../README.md)
- [Contributing Guide](../CONTRIBUTING.md)
- [Security Policy](../SECURITY.md)

---

## Support

### Cloud.gov Support

For cloud.gov platform issues:

- **Email:** [support@cloud.gov](mailto:support@cloud.gov)
- **Documentation:** https://docs.cloud.gov
- **Status Page:** https://cloudgov.statuspage.io

### Project Support

For project-specific deployment issues:

1. Check this documentation
2. Review [GitHub Actions logs](https://github.com/your-org/svelte-ui/actions)
3. Check cloud.gov app logs: `cf logs svelte-ui-library --recent`
4. Open a GitHub issue in this repository

---

## Appendix: Quick Reference

### Essential Commands

```bash
# Login
cf login -a https://api.fr.cloud.gov --sso

# Target space
cf target -o sandbox-gsa -s jk-sandbox

# Deploy
npm run deploy

# Check status
cf app svelte-ui-library

# View logs
cf logs svelte-ui-library --recent

# Restart app
cf restart svelte-ui-library

# Scale app
cf scale svelte-ui-library -i 2 -m 256M
```

### Useful Aliases

Add to your `~/.bashrc` or `~/.zshrc`:

```bash
# Cloud.gov aliases
alias cfl="cf login -a https://api.fr.cloud.gov --sso"
alias cft="cf target -o sandbox-gsa -s jk-sandbox"
alias cfa="cf apps"
alias cfapp="cf app svelte-ui-library"
alias cflogs="cf logs svelte-ui-library"
```

---

**Last Updated:** 2026-06-11  
**Maintained By:** Jeff Keene, Engineer

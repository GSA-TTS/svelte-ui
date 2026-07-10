<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import { expect, userEvent, within, waitFor } from 'storybook/test';
  import Header from './Header.svelte';
  import HeaderNavBar from './HeaderNavBar.svelte';
  import HeaderLogo from './HeaderLogo.svelte';
  import HeaderNavMenu from './HeaderNavMenu.svelte';
  import HeaderNav from './HeaderNav.svelte';
  import HeaderNavPrimary from './HeaderNavPrimary.svelte';
  import HeaderNavItem from './HeaderNavItem.svelte';
  import HeaderSearchPlaceholder from './HeaderSearchPlaceholder.svelte';

  const { Story } = defineMeta({
    title: 'Components/Header',
    component: Header,
    tags: ['autodocs'],
    parameters: {
      a11y: {
        test: 'error',
      },
    },
  });
</script>

<Story
  name="Basic Header - Simple Links"
  args={{}}
  play={async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const header = canvasElement.querySelector('.usa-header--basic');
    await expect(header).toBeInTheDocument();

    const logo = canvas.getByText('Project Title');
    await expect(logo).toBeInTheDocument();

  }}
>
  {#snippet children()}
    <HeaderNavBar>
      <HeaderLogo href="/" title="Project Title" />
      <HeaderNavMenu variant="menu" />
    </HeaderNavBar>
    <HeaderNav>
      <HeaderNavPrimary>
        <HeaderNavItem label="Home" href="javascript:void(0);" />
        <HeaderNavItem label="About" href="javascript:void(0);" />
        <HeaderNavItem label="Contact" href="javascript:void(0);" />
      </HeaderNavPrimary>
    </HeaderNav>
  {/snippet}
</Story>

<Story
  name="Basic Header - With Dropdowns"
  args={{}}
  play={async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const dropdownBtn = canvas.getByRole('button', { name: 'Current Section' });
    await expect(dropdownBtn).toBeInTheDocument();
    await expect(dropdownBtn).toHaveAttribute('aria-expanded', 'false');

    await userEvent.click(dropdownBtn);
    await expect(dropdownBtn).toHaveAttribute('aria-expanded', 'true');

    const submenu = canvasElement.querySelector('#nav-submenu-current-section');
    await expect(submenu).toBeVisible();

    const submenuLink = canvas.getByText('Navigation Link 1');
    await expect(submenuLink).toBeInTheDocument();
  }}
>
  {#snippet children()}
    <HeaderNavBar>
      <HeaderLogo href="/" title="Project Title" />
      <HeaderNavMenu variant="menu" />
    </HeaderNavBar>
    <HeaderNav>
      <HeaderNavPrimary>
        <HeaderNavItem
          label="Current Section"
          itemChildren={[
            { label: 'Navigation Link 1', href: 'javascript:void(0);' },
            { label: 'Navigation Link 2', href: 'javascript:void(0);' },
            { label: 'Navigation Link 3', href: 'javascript:void(0);' },
          ]}
        />
        <HeaderNavItem
          label="Section"
          itemChildren={[
            { label: 'Link A', href: 'javascript:void(0);' },
            { label: 'Link B', href: 'javascript:void(0);' },
          ]}
        />
        <HeaderNavItem label="Simple Link" href="javascript:void(0);" />
      </HeaderNavPrimary>
    </HeaderNav>
  {/snippet}
</Story>

<Story
  name="Basic Header - With Search"
  args={{}}
  play={async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const searchInput = canvas.getByRole('searchbox');
    await expect(searchInput).toBeInTheDocument();

    const searchButton = canvas.getByRole('button', { name: 'Search' });
    await expect(searchButton).toBeInTheDocument();
  }}
>
  {#snippet children()}
    <HeaderNavBar>
      <HeaderLogo href="/" title="Project Title" />
      <HeaderNavMenu variant="menu" />
    </HeaderNavBar>
    <HeaderNav>
      <HeaderNavPrimary>
        <HeaderNavItem label="Home" href="javascript:void(0);" />
        <HeaderNavItem label="About" href="javascript:void(0);" />
      </HeaderNavPrimary>
      <HeaderSearchPlaceholder />
    </HeaderNav>
  {/snippet}
</Story>

<Story
  name="Mobile Menu Toggle"
  globals={{
    viewport: {
      value: 'mobile1',
      isRotated: true
    }
  }}
  args={{}}
  play={async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await waitFor(() => {
      expect(
        canvas.getByRole('button', { name: 'Menu' })
      ).toBeVisible();
    });

    const menuBtn = canvas.getByRole('button', { name: 'Menu' });
    await expect(menuBtn).toBeInTheDocument();

    const overlay = canvasElement.querySelector('.usa-overlay');
    await expect(overlay).toBeInTheDocument();
    await expect(overlay?.className).not.toContain('is-visible');

    await userEvent.click(menuBtn);

    await expect(overlay?.className).toContain('is-visible');

    const nav = canvasElement.querySelector('.usa-nav');
    await expect(nav?.className).toContain('is-visible');

    const closeBtn = canvas.getByRole('button', { name: 'Close' });
    await expect(closeBtn).toBeInTheDocument();

    await userEvent.click(closeBtn);

    await expect(overlay?.className).not.toContain('is-visible');
    await expect(nav?.className).not.toContain('is-visible');
  }}
>
  {#snippet children()}
    <HeaderNavBar>
      <HeaderLogo href="/" title="Project Title" />
      <HeaderNavMenu variant="menu" />
    </HeaderNavBar>
    <HeaderNav>
      <HeaderNavPrimary>
        <HeaderNavItem label="Home" href="javascript:void(0);" />
        <HeaderNavItem label="About" href="javascript:void(0);" />
      </HeaderNavPrimary>
    </HeaderNav>
  {/snippet}
</Story>

<Story
  name="Props-Based Navigation"
  args={{}}
  play={async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const serviceLink = canvas.getByText('Services');
    await expect(serviceLink).toBeInTheDocument();
    await waitFor(() => {
      expect(
        canvas.getByRole('button', { name: 'Products' })
      ).toBeVisible();
    });
    const productsBtn = canvas.getByRole('button', { name: 'Products' });
    await expect(productsBtn).toBeInTheDocument();

    await userEvent.click(productsBtn);

    const productLink = canvas.getByText('Product A');
    await expect(productLink).toBeInTheDocument();
  }}
>
  {#snippet children()}
    <HeaderNavBar>
      <HeaderLogo href="/" title="Project Title" />
      <HeaderNavMenu variant="menu" />
    </HeaderNavBar>
    <HeaderNav>
      <HeaderNavPrimary
        items={[
          { label: 'Home', href: 'javascript:void(0);', current: true },
          {
            label: 'Products',
            children: [
              { label: 'Product A', href: 'javascript:void(0);' },
              { label: 'Product B', href: 'javascript:void(0);' },
            ]
          },
          { label: 'Services', href: 'javascript:void(0);' },
        ]}
      />
    </HeaderNav>
  {/snippet}
</Story>

<Story
  name="Keyboard Navigation - Escape Key"
  args={{}}
  play={async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const dropdownBtn = canvas.getByRole('button', { name: 'Products' });

    await userEvent.click(dropdownBtn);
    await expect(dropdownBtn).toHaveAttribute('aria-expanded', 'true');

    await userEvent.keyboard('{Escape}');
    await expect(dropdownBtn).toHaveAttribute('aria-expanded', 'false');
    await expect(dropdownBtn).toHaveFocus();
  }}
>
  {#snippet children()}
    <HeaderNavBar>
      <HeaderLogo href="/" title="Project Title" />
      <HeaderNavMenu variant="menu" />
    </HeaderNavBar>
    <HeaderNav>
      <HeaderNavPrimary>
        <HeaderNavItem
          label="Products"
          itemChildren={[
            { label: 'Product A', href: 'javascript:void(0);' },
            { label: 'Product B', href: 'javascript:void(0);' },
          ]}
        />
      </HeaderNavPrimary>
    </HeaderNav>
  {/snippet}
</Story>

<Story
  name="Current Section Highlighting"
  args={{}}
  play={async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const currentBtn = canvas.getByRole('button', { name: 'Current Section' });
    await expect(currentBtn?.className).toContain('usa-current');
  }}
>
  {#snippet children()}
    <HeaderNavBar>
      <HeaderLogo href="/" title="Project Title" />
      <HeaderNavMenu variant="menu" />
    </HeaderNavBar>
    <HeaderNav>
      <HeaderNavPrimary>
        <HeaderNavItem
          label="Current Section"
          current
          itemChildren={[
            { label: 'Link 1', href: 'javascript:void(0);' },
            { label: 'Link 2', href: 'javascript:void(0);' },
          ]}
        />
        <HeaderNavItem label="Other Section" href="javascript:void(0);" />
      </HeaderNavPrimary>
    </HeaderNav>
  {/snippet}
</Story>

<Story
  name="Overlay Click Closes Menu"
  globals={{
    viewport: {
      value: 'mobile1',
      isRotated: true
    }
  }}
  args={{}}
  play={async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await waitFor(() => {
      expect(
        canvas.getByRole('button', { name: 'Menu' })
      ).toBeVisible();
    });
    const menuBtn = canvas.getByRole('button', { name: 'Menu' });
    await userEvent.click(menuBtn);

    const overlay = canvasElement.querySelector('.usa-overlay');
    await expect(overlay?.className).toContain('is-visible');

    const nav = canvasElement.querySelector('.usa-nav');
    await expect(nav?.className).toContain('is-visible');

    if (overlay) {
      await userEvent.click(overlay as HTMLElement);
    }

    await expect(overlay?.className).not.toContain('is-visible');
    await expect(nav?.className).not.toContain('is-visible');
  }}
>
  {#snippet children()}
    <HeaderNavBar>
      <HeaderLogo href="/" title="Project Title" />
      <HeaderNavMenu variant="menu" />
    </HeaderNavBar>
    <HeaderNav>
      <HeaderNavPrimary>
        <HeaderNavItem label="Home" href="javascript:void(0);" />
      </HeaderNavPrimary>
    </HeaderNav>
  {/snippet}
</Story>

<Story
  name="Custom Logo with Snippet"
  args={{}}
  play={async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const customLogo = canvas.getByText('My Custom Logo');
    await expect(customLogo).toBeInTheDocument();
  }}
>
  {#snippet children()}
    <HeaderNavBar>
      <HeaderLogo href="/" title="Custom Logo">
        {#snippet children()}
          <strong>My Custom Logo</strong>
        {/snippet}
      </HeaderLogo>
      <HeaderNavMenu variant="menu" />
    </HeaderNavBar>
    <HeaderNav>
      <HeaderNavPrimary>
        <HeaderNavItem label="Home" href="javascript:void(0);" />
      </HeaderNavPrimary>
    </HeaderNav>
  {/snippet}
</Story>

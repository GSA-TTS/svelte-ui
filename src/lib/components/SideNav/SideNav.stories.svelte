<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import { expect } from 'storybook/test';
  import SideNav from './SideNav.svelte';
  import SideNavItem from './SideNavItem.svelte';

  const { Story } = defineMeta({
    title: 'Components/SideNav',
    component: SideNav,
    tags: ['autodocs'],
    parameters: {
      a11y: {
        test: 'error',
      },
    },
    argTypes: {
      ariaLabel: {
        control: 'text',
        description: 'Accessibility label for the navigation',
        table: {
          defaultValue: { summary: 'Side navigation' },
        },
      },
      currentUrl: {
        control: false,
        description: 'Current URL for automatic active state matching',
      },
      children: {
        control: false,
        description: 'Nested content',
      }
    },
  });
</script>

<style>
  :global(.custom-sidenav .usa-sidenav__item a) {
    background-color: #e7f6f8;
  }
  :global(.custom-sidenav .usa-sidenav__item a:hover) {
    background-color: #99deea;
  }
  :global(.custom-sidenav .usa-sidenav__item a.usa-current) {
    background-color: #00bde3;
    color: white;
  }
</style>

<Story
  name="Simple Navigation"
  asChild
  play={async ({ canvasElement }) => {
    const nav = canvasElement.querySelector('nav');
    await expect(nav).toBeInTheDocument();
    await expect(nav).toHaveAttribute('aria-label', 'Side navigation');

    const list = canvasElement.querySelector('.usa-sidenav');
    await expect(list).toBeInTheDocument();

    const current = canvasElement.querySelector('.usa-current');
    await expect(current).toBeInTheDocument();
    await expect(current).toHaveAttribute('aria-current', 'page');
    await expect(current).toHaveTextContent('Current page');

    const items = canvasElement.querySelectorAll('.usa-sidenav__item');
    await expect(items).toHaveLength(3);
  }}
>
  <SideNav>
    <SideNavItem href="javascript:void(0);" label="Current page" current />
    <SideNavItem href="javascript:void(0);" label="Parent link" />
    <SideNavItem href="javascript:void(0);" label="Parent link" />
  </SideNav>
</Story>

<Story
  name="With Children"
  asChild
  play={async ({ canvasElement }) => {
    const sublist = canvasElement.querySelector('.usa-sidenav__sublist');
    await expect(sublist).toBeInTheDocument();

    const subitems = sublist?.querySelectorAll('.usa-sidenav__item');
    await expect(subitems).toHaveLength(3);

    const currentItems = canvasElement.querySelectorAll('.usa-current');
    await expect(currentItems).toHaveLength(2);
  }}
>
  <SideNav>
    <SideNavItem href="javascript:void(0);" label="Parent link" />
    <SideNavItem href="javascript:void(0);" label="Current page" current>
      <SideNavItem href="javascript:void(0);" label="Child link" />
      <SideNavItem href="javascript:void(0);" label="Child link" current />
      <SideNavItem href="javascript:void(0);" label="Child link" />
    </SideNavItem>
    <SideNavItem href="javascript:void(0);" label="Parent link" />
  </SideNav>
</Story>

<Story
  name="Deep Nesting"
  asChild
  play={async ({ canvasElement }) => {
    const sublists = canvasElement.querySelectorAll('.usa-sidenav__sublist');
    await expect(sublists.length).toBeGreaterThanOrEqual(2);

    const currentItems = canvasElement.querySelectorAll('.usa-current');
    await expect(currentItems.length).toBeGreaterThan(0);

    const allItems = canvasElement.querySelectorAll('.usa-sidenav__item');
    await expect(allItems.length).toBeGreaterThan(5);
  }}
>
  <SideNav>
    <SideNavItem href="javascript:void(0);" label="Parent link" />
    <SideNavItem href="javascript:void(0);" label="Current page" current>
      <SideNavItem href="javascript:void(0);" label="Child link" />
      <SideNavItem href="javascript:void(0);" label="Child link">
        <SideNavItem href="javascript:void(0);" label="Grandchild link" />
        <SideNavItem
          href="javascript:void(0);"
          label="Grandchild link"
          current
        />
        <SideNavItem href="javascript:void(0);" label="Grandchild link" />
      </SideNavItem>
      <SideNavItem href="javascript:void(0);" label="Child link" />
    </SideNavItem>
    <SideNavItem href="javascript:void(0);" label="Parent link" />
  </SideNav>
</Story>

<Story
  name="Automatic Active State"
  args={{ currentUrl: '/docs/intro' }}
  argTypes={{
    currentUrl: {
      control: 'select',
      options: ['/docs/intro', '/docs/components', '/docs/utilities'],
      description: 'Current URL for automatic active state matching',
      table: { disable: false },
    },
  }}
  play={async ({ canvasElement }) => {
    const current = canvasElement.querySelector('.usa-current');
    await expect(current).toBeInTheDocument();
    await expect(current).toHaveTextContent('Introduction');
    await expect(current).toHaveAttribute('href', '/docs/intro');
  }}
>
  {#snippet template(args)}
    <SideNav currentUrl={args.currentUrl}>
      <SideNavItem href="/docs/intro" label="Introduction" />
      <SideNavItem href="/docs/components" label="Components" />
      <SideNavItem href="/docs/utilities" label="Utilities" />
    </SideNav>
  {/snippet}
</Story>

<Story
  name="Manual Override Automatic"
  asChild
  play={async ({ canvasElement }) => {
    const currentItems = canvasElement.querySelectorAll('.usa-current');
    await expect(currentItems).toHaveLength(1);

    const manualCurrent = canvasElement.querySelector(
      '[href="/docs/utilities"]'
    );
    await expect(manualCurrent?.className).toContain('usa-current');
  }}
>
  <SideNav currentUrl="/docs/intro">
    <SideNavItem href="/docs/intro" label="Introduction" />
    <SideNavItem href="/docs/components" label="Components" />
    <SideNavItem href="/docs/utilities" label="Utilities" current />
  </SideNav>
</Story>

<Story
  name="With Custom Classes"
  asChild
  parameters={{
    docs: {
      description: {
        story: `
This example demonstrates how to customize side navigation styles using CSS.
The \`.custom-sidenav\` class is defined in the story file and targets the navigation links:

\`\`\`css
:global(.custom-sidenav .usa-sidenav__item a) {
  background-color: #e7f6f8;
}
:global(.custom-sidenav .usa-sidenav__item a:hover) {
  background-color: #99deea;
}
:global(.custom-sidenav .usa-sidenav__item a.usa-current) {
  background-color: #00bde3;
  color: white;
}
\`\`\`

Apply the custom class to the SideNav component:

\`\`\`svelte
<SideNav class="custom-sidenav">
  <SideNavItem href="..." label="..." current />
  <SideNavItem href="..." label="..." />
</SideNav>
\`\`\`
        `,
      },
    },
  }}
  play={async ({ canvasElement }) => {
    const nav = canvasElement.querySelector('nav');
    await expect(nav?.className).toContain('custom-sidenav');

    const current = canvasElement.querySelector('.usa-current');
    await expect(current).toBeInTheDocument();
  }}
>
  <SideNav class="custom-sidenav">
    <SideNavItem
      href="javascript:void(0);"
      label="Custom styled item"
      current
    />
    <SideNavItem href="javascript:void(0);" label="Parent link" />
    <SideNavItem href="javascript:void(0);" label="Another link" />
  </SideNav>
</Story>

<Story
  name="Long Labels"
  asChild
>
  <SideNav>
    <SideNavItem
      href="javascript:void(0);"
      label="This is a very long navigation label that demonstrates how text wrapping works in the side navigation component"
      current
    />
    <SideNavItem
      href="javascript:void(0);"
      label="Another extremely long label with lots of text to show wrapping behavior"
    />
    <SideNavItem href="javascript:void(0);" label="Short label" />
  </SideNav>
</Story>



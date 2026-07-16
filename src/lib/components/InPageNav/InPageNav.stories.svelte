<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import { expect } from 'storybook/test';
  import InPageNav from './InPageNav.svelte';

  const { Story } = defineMeta({
    title: 'Components/InPageNav',
    component: InPageNav,
    tags: ['autodocs'],
    parameters: {
      a11y: {
        test: 'error',
      },
      docs: {
        description: {
          component:
            'In-page navigation automatically builds a table of contents from heading elements in the content area. Provides smooth scrolling and scroll-spy functionality to track the current section.',
        },
      },
    },
    argTypes: {
      contentSelector: {
        control: 'text',
        description: 'CSS selector for the content area to scan for headings',
        table: {
          defaultValue: { summary: '.usa-prose' },
        },
      },
      headingLevels: {
        control: 'object',
        description: 'Array of heading tag names to include in navigation',
        table: {
          defaultValue: { summary: "['h2', 'h3']" },
        },
      },
      title: {
        control: 'text',
        description: 'Title text displayed at the top of the navigation',
        table: {
          defaultValue: { summary: 'On this page' },
        },
      },
      scrollOffset: {
        control: 'number',
        description: 'Vertical offset in pixels for scroll positioning',
        table: {
          defaultValue: { summary: '0' },
        },
      },
      class: {
        control: 'text',
        description: 'Additional CSS classes to apply to the nav element',
      },
    },
  });
</script>

<Story
  name="Default"
  play={async ({ canvasElement }) => {
    await new Promise((resolve) => setTimeout(resolve, 100));

    const nav = canvasElement.querySelector('.usa-in-page-nav');
    await expect(nav).toBeInTheDocument();

    const heading = canvasElement.querySelector('.usa-in-page-nav__heading');
    await expect(heading?.textContent).toBe('On this page');

    const listItems = canvasElement.querySelectorAll('.usa-in-page-nav__item');
    await expect(listItems.length).toBeGreaterThan(0);

    const links = canvasElement.querySelectorAll('.usa-in-page-nav__link');
    await expect(links.length).toBeGreaterThan(0);
  }}
  asChild
>
  <div style="display: grid; grid-template-columns: 250px 1fr; gap: 2rem;">
    <InPageNav />
    <div class="usa-prose">
      <h2>Section 1</h2>
      <p>This is the first section with some content. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
      <p>More content here to make the page scrollable. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.</p>

      <h3>Subsection 1.1</h3>
      <p>This is a subsection under section 1. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
      <p>Additional paragraph to add height. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>

      <h3>Subsection 1.2</h3>
      <p>Another subsection with content. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.</p>
      <p>More text to create scrollable content. Totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.</p>

      <h2>Section 2</h2>
      <p>The second major section. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.</p>
      <p>Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit.</p>

      <h3>Subsection 2.1</h3>
      <p>Subsection under section 2. Sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.</p>
      <p>Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur.</p>

      <h2>Section 3</h2>
      <p>The third major section with content. Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur.</p>
      <p>Vel illum qui dolorem eum fugiat quo voluptas nulla pariatur. At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores.</p>

      <h3>Subsection 3.1</h3>
      <p>Final subsection. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus.</p>
      <p>Omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae.</p>
    </div>
  </div>
</Story>

<Story
  name="Custom Title"
  args={{ title: 'Table of Contents' }}
  play={async ({ canvasElement }) => {
    await new Promise((resolve) => setTimeout(resolve, 100));

    const heading = canvasElement.querySelector('.usa-in-page-nav__heading');
    await expect(heading?.textContent).toBe('Table of Contents');
  }}
>
  {#snippet template(args)}
    <div style="display: grid; grid-template-columns: 250px 1fr; gap: 2rem;">
      <InPageNav {...args} />
      <div class="usa-prose">
        <h2>Introduction</h2>
        <p>Welcome to our documentation. This page demonstrates custom navigation titles.</p>
        <h2>Getting Started</h2>
        <p>Follow these steps to begin using the component.</p>
        <h2>Configuration</h2>
        <p>Learn how to configure the component for your needs.</p>
      </div>
    </div>
  {/snippet}
</Story>

<Story
  name="H2 Only"
  args={{ headingLevels: ['h2'] }}
  play={async ({ canvasElement }) => {
    await new Promise((resolve) => setTimeout(resolve, 100));

    const listItems = canvasElement.querySelectorAll('.usa-in-page-nav__item');
    const subItems = canvasElement.querySelectorAll('.usa-in-page-nav__item--sub');

    await expect(subItems.length).toBe(0);
    await expect(listItems.length).toBeGreaterThan(0);
  }}
>
  {#snippet template(args)}
    <div style="display: grid; grid-template-columns: 250px 1fr; gap: 2rem;">
      <InPageNav {...args} />
      <div class="usa-prose">
        <h2>Main Section 1</h2>
        <p>Content for the first main section.</p>
        <h3>This subsection is ignored</h3>
        <p>Subsections won't appear in navigation.</p>
        <h2>Main Section 2</h2>
        <p>Content for the second main section.</p>
        <h3>Also ignored</h3>
        <p>Only h2 elements are shown.</p>
        <h2>Main Section 3</h2>
        <p>Content for the third main section.</p>
      </div>
    </div>
  {/snippet}
</Story>

<Story
  name="All Heading Levels"
  args={{ headingLevels: ['h2', 'h3', 'h4'] }}
  play={async ({ canvasElement }) => {
    await new Promise((resolve) => setTimeout(resolve, 100));

    const listItems = canvasElement.querySelectorAll('.usa-in-page-nav__item');
    await expect(listItems.length).toBe(3);
  }}
>
  {#snippet template(args)}
    <div style="display: grid; grid-template-columns: 250px 1fr; gap: 2rem;">
      <InPageNav {...args} />
      <div class="usa-prose">
        <h2>Main Section</h2>
        <p>Content here.</p>
        <h3>Subsection</h3>
        <p>More content.</p>
        <h4>Sub-subsection</h4>
        <p>Even more content.</p>
      </div>
    </div>
  {/snippet}
</Story>

<Story
  name="Custom Content Selector"
  args={{ contentSelector: '#custom-content-area' }}
  play={async ({ canvasElement }) => {
    await new Promise((resolve) => setTimeout(resolve, 100));

    const listItems = canvasElement.querySelectorAll('.usa-in-page-nav__item');
    await expect(listItems.length).toBeGreaterThan(0);

    const firstLink = canvasElement.querySelector('.usa-in-page-nav__link');
    await expect(firstLink?.textContent).toBe('Section A');
  }}
  asChild
>
  <div style="display: grid; grid-template-columns: 250px 1fr; gap: 2rem;">
    <InPageNav contentSelector="#custom-content-area" />
    <div id="custom-content-area">
      <h2>Section A</h2>
      <p>Content in custom selector area.</p>
      <h3>Subsection A.1</h3>
      <p>More content here.</p>
    </div>
  </div>
</Story>

<Story
  name="With Custom Classes"
  args={{ class: 'margin-top-2 border-left-2px border-base-lighter padding-left-2' }}
  play={async ({ canvasElement }) => {
    await new Promise((resolve) => setTimeout(resolve, 100));

    const nav = canvasElement.querySelector('.usa-in-page-nav');
    await expect(nav?.className).toContain('usa-in-page-nav');
    await expect(nav?.className).toContain('margin-top-2');
    await expect(nav?.className).toContain('border-left-2px');
    await expect(nav?.className).toContain('border-base-lighter');
    await expect(nav?.className).toContain('padding-left-2');
  }}
>
  {#snippet template(args)}
    <div style="display: grid; grid-template-columns: 250px 1fr; gap: 2rem;">
      <InPageNav {...args} />
      <div class="usa-prose">
        <h2>Styled Navigation</h2>
        <p>This navigation has custom USWDS utility classes applied.</p>
        <h2>Visual Customization</h2>
        <p>Notice the custom margin, border, and padding styles.</p>
      </div>
    </div>
  {/snippet}
</Story>

<Story
  name="Empty Content"
  play={async ({ canvasElement }) => {
    await new Promise((resolve) => setTimeout(resolve, 100));

    const nav = canvasElement.querySelector('.usa-in-page-nav');
    await expect(nav).not.toBeInTheDocument();
  }}
  asChild
>
  <div style="display: grid; grid-template-columns: 250px 1fr; gap: 2rem;">
    <InPageNav />
    <div class="usa-prose">
      <p>No headings here, just a paragraph. The navigation should not render.</p>
    </div>
  </div>
</Story>

<Story
  name="Headings Without IDs"
  play={async ({ canvasElement }) => {
    await new Promise((resolve) => setTimeout(resolve, 100));

    const listItems = canvasElement.querySelectorAll('.usa-in-page-nav__item');
    await expect(listItems.length).toBe(2);

    const prose = canvasElement.querySelector('.usa-prose');
    const h2 = prose?.querySelector('h2');
    const h3 = prose?.querySelector('h3');

    await expect(h2?.id).toBeTruthy();
    await expect(h3?.id).toBeTruthy();
  }}
  asChild
>
  <div style="display: grid; grid-template-columns: 250px 1fr; gap: 2rem;">
    <InPageNav />
    <div class="usa-prose">
      <h2>Section Without ID</h2>
      <p>Content here. The component auto-generates IDs.</p>
      <h3>Subsection Without ID</h3>
      <p>More content. IDs are automatically created.</p>
    </div>
  </div>
</Story>

<Story
  name="Link Navigation"
  play={async ({ canvasElement }) => {
    await new Promise((resolve) => setTimeout(resolve, 100));

    const links = canvasElement.querySelectorAll('.usa-in-page-nav__link');
    await expect(links.length).toBeGreaterThan(0);

    const firstLink = links[0] as HTMLAnchorElement;
    await expect(firstLink).toHaveAttribute('href');
    await expect(firstLink.getAttribute('href')).toMatch(/^#/);
  }}
  asChild
>
  <div style="display: grid; grid-template-columns: 250px 1fr; gap: 2rem;">
    <InPageNav />
    <div class="usa-prose">
      <h2>Navigation Links</h2>
      <p>Each heading becomes a clickable navigation link.</p>
      <h2>Smooth Scrolling</h2>
      <p>Clicking links smoothly scrolls to the section.</p>
      <h2>Active Tracking</h2>
      <p>The active section is highlighted as you scroll.</p>
    </div>
  </div>
</Story>

<Story
  name="Accessibility"
  play={async ({ canvasElement }) => {
    await new Promise((resolve) => setTimeout(resolve, 100));

    const aside = canvasElement.querySelector('aside');
    await expect(aside).toHaveAttribute('aria-label', 'In-page navigation');

    const heading = canvasElement.querySelector('.usa-in-page-nav__heading');
    await expect(heading?.tagName).toBe('H4');

    const list = canvasElement.querySelector('.usa-in-page-nav__list');
    await expect(list?.tagName).toBe('UL');

    const listItems = canvasElement.querySelectorAll('.usa-in-page-nav__item');
    listItems.forEach((item) => {
      expect(item.tagName).toBe('LI');
    });
  }}
  asChild
>
  <div style="display: grid; grid-template-columns: 250px 1fr; gap: 2rem;">
    <InPageNav />
    <div class="usa-prose">
      <h2>Semantic HTML</h2>
      <p>Uses proper ARIA labels and semantic elements.</p>
      <h2>Screen Reader Friendly</h2>
      <p>Navigation is announced correctly to assistive technologies.</p>
      <h2>Keyboard Accessible</h2>
      <p>All links are keyboard navigable.</p>
    </div>
  </div>
</Story>

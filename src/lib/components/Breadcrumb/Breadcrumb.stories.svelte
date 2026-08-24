<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import { expect, within } from 'storybook/test';
  import Breadcrumb from './Breadcrumb.svelte';
  import type { BreadcrumbItem } from './Breadcrumb.types.js';

  const { Story } = defineMeta({
    title: 'Components/Breadcrumb',
    component: Breadcrumb,
    tags: ['autodocs'],
    parameters: {
      a11y: {
        test: 'error',
      },
    },
    argTypes: {
      items: {
        control: 'object',
        description: 'Array of breadcrumb items with label and optional href',
        table: {
          type: { summary: 'BreadcrumbItem[]' },
        },
      },
      truncate: {
        control: 'boolean',
        description: 'Truncate breadcrumb to single line with ellipsis',
        table: {
          defaultValue: { summary: 'false' },
        },
      },
      ariaLabel: {
        control: 'text',
        description: 'ARIA label for navigation element',
        table: {
          defaultValue: { summary: 'Breadcrumbs' },
        },
      },
      withRDFa: {
        control: 'boolean',
        description: 'Include RDFa metadata for SEO (schema.org)',
        table: {
          defaultValue: { summary: 'false' },
        },
      },
    },
  });

  const defaultItems: BreadcrumbItem[] = [
    { label: 'Home', href: 'javascript:void(0);' },
    { label: 'Federal Contracting', href: 'javascript:void(0);' },
    { label: 'Contracting assistance programs', href: 'javascript:void(0);' },
    { label: 'Women-owned small business federal contracting program' },
  ];

  const longItems: BreadcrumbItem[] = [
    { label: 'Home', href: 'javascript:void(0);' },
    { label: 'Federal Contracting', href: 'javascript:void(0);' },
    { label: 'Contracting assistance programs', href: 'javascript:void(0);' },
    { label: 'Economically disadvantaged women-owned small business federal contracting program' },
  ];
</script>

<style>
  :global(.custom-breadcrumb) {
    background-color: #f0f0f0;
    padding: 1rem;
    border-radius: 0.25rem;
  }
  :global(.custom-breadcrumb .usa-breadcrumb__link) {
    color: #005ea2;
    text-decoration: underline;
  }
  :global(.custom-breadcrumb .usa-breadcrumb__link:hover) {
    color: #1a4480;
  }
  :global(.custom-breadcrumb .usa-current) {
    font-weight: bold;
    color: #1b1b1b;
  }
</style>

<Story
  name="Default"
  args={{ items: defaultItems }}
  play={async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const nav = canvasElement.querySelector('nav');
    await expect(nav).toBeInTheDocument();
    await expect(nav?.className).toContain('usa-breadcrumb');
    await expect(nav).toHaveAttribute('aria-label', 'Breadcrumbs');

    const list = canvasElement.querySelector('.usa-breadcrumb__list');
    await expect(list?.tagName).toBe('OL');

    const items = canvasElement.querySelectorAll('.usa-breadcrumb__list-item');
    await expect(items).toHaveLength(4);

    const links = canvasElement.querySelectorAll('.usa-breadcrumb__link');
    await expect(links).toHaveLength(3);

    const currentItem = canvasElement.querySelector('.usa-current');
    await expect(currentItem).toBeInTheDocument();
    await expect(currentItem).toHaveAttribute('aria-current', 'page');
    await expect(currentItem?.textContent).toContain('Women-owned small business federal contracting program');
  }}
/>

<Story
  name="Truncated"
  args={{ items: longItems, truncate: true }}
  play={async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const nav = canvasElement.querySelector('nav');
    await expect(nav?.className).toContain('usa-breadcrumb--truncate');
  }}
/>

<Story
  name="With RDFa Metadata"
  args={{ items: defaultItems, withRDFa: true }}
  play={async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const list = canvasElement.querySelector('.usa-breadcrumb__list');
    await expect(list).toHaveAttribute('vocab', 'http://schema.org/');
    await expect(list).toHaveAttribute('typeof', 'BreadcrumbList');

    const listItems = canvasElement.querySelectorAll('.usa-breadcrumb__list-item');
    await expect(listItems[0]).toHaveAttribute('property', 'itemListElement');
    await expect(listItems[0]).toHaveAttribute('typeof', 'ListItem');

    const links = canvasElement.querySelectorAll('.usa-breadcrumb__link');
    await expect(links[0]).toHaveAttribute('property', 'item');
    await expect(links[0]).toHaveAttribute('typeof', 'WebPage');

    const nameSpans = canvasElement.querySelectorAll('span[property="name"]');
    await expect(nameSpans.length).toBeGreaterThan(0);

    const positions = canvasElement.querySelectorAll('meta[property="position"]');
    await expect(positions).toHaveLength(4);
    await expect(positions[0]).toHaveAttribute('content', '1');
    await expect(positions[3]).toHaveAttribute('content', '4');
  }}
/>

<Story
  name="Short Breadcrumb Trail"
  args={{
    items: [
      { label: 'Home', href: 'javascript:void(0);' },
      { label: 'Documentation' },
    ],
  }}
  play={async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const items = canvasElement.querySelectorAll('.usa-breadcrumb__list-item');
    await expect(items).toHaveLength(2);

    const links = canvasElement.querySelectorAll('.usa-breadcrumb__link');
    await expect(links).toHaveLength(1);
  }}
/>

<Story
  name="Long Breadcrumb Trail"
  args={{ items: longItems }}
  play={async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const currentItem = canvasElement.querySelector('.usa-current');
    await expect(currentItem?.textContent).toContain('Economically disadvantaged');
  }}
/>

<Story
  name="With Custom Classes"
  asChild
  parameters={{
    docs: {
      description: {
        story: `
This example demonstrates how to customize breadcrumb styles using CSS.
The \`.custom-breadcrumb\` class is defined in the story file and targets the breadcrumb elements:

\`\`\`css
:global(.custom-breadcrumb) {
  background-color: #f0f0f0;
  padding: 1rem;
  border-radius: 0.25rem;
}
:global(.custom-breadcrumb .usa-breadcrumb__link) {
  color: #005ea2;
  text-decoration: underline;
}
:global(.custom-breadcrumb .usa-breadcrumb__link:hover) {
  color: #1a4480;
}
:global(.custom-breadcrumb .usa-current) {
  font-weight: bold;
  color: #1b1b1b;
}
\`\`\`

Apply the custom class to the Breadcrumb component:

\`\`\`svelte
<Breadcrumb items={defaultItems} class="custom-breadcrumb" />
\`\`\`
        `,
      },
    },
  }}
  play={async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const nav = canvasElement.querySelector('nav');
    await expect(nav?.className).toContain('usa-breadcrumb');
    await expect(nav?.className).toContain('custom-breadcrumb');
  }}
>
  <Breadcrumb items={defaultItems} class="custom-breadcrumb" />
</Story>

<Story
  name="Custom ARIA Label"
  args={{
    items: defaultItems,
    ariaLabel: 'Page navigation breadcrumbs',
  }}
  play={async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const nav = canvasElement.querySelector('nav');
    await expect(nav).toHaveAttribute('aria-label', 'Page navigation breadcrumbs');
  }}
/>

<Story
  name="Only Current Page"
  args={{
    items: [{ label: 'Current Page' }],
  }}
  play={async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const items = canvasElement.querySelectorAll('.usa-breadcrumb__list-item');
    await expect(items).toHaveLength(1);

    const links = canvasElement.querySelectorAll('.usa-breadcrumb__link');
    await expect(links).toHaveLength(0);

    const currentItem = canvasElement.querySelector('.usa-current');
    await expect(currentItem).toHaveAttribute('aria-current', 'page');
  }}
/>

<Story
  name="Multiple Levels"
  args={{
    items: [
      { label: 'Home', href: 'javascript:void(0);' },
      { label: 'Level 1', href: 'javascript:void(0);' },
      { label: 'Level 2', href: 'javascript:void(0);' },
      { label: 'Level 3', href: 'javascript:void(0);' },
      { label: 'Level 4', href: 'javascript:void(0);' },
      { label: 'Current Page' },
    ],
  }}
  play={async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const items = canvasElement.querySelectorAll('.usa-breadcrumb__list-item');
    await expect(items).toHaveLength(6);

    const links = canvasElement.querySelectorAll('.usa-breadcrumb__link');
    await expect(links).toHaveLength(5);
  }}
/>

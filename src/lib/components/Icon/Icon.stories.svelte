<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import { expect } from 'storybook/test';
  import Icon from './Icon.svelte';

  const { Story } = defineMeta({
    title: 'Components/Icon',
    component: Icon,
    tags: ['autodocs'],
    parameters: {
      a11y: {
        test: 'error',
      },
      docs: {
        description: {
          component:
            'Icon component using USWDS icon sprite. ' +
            'For a complete list of all 243 available icons, see the ' +
            '<a href="https://designsystem.digital.gov/components/icon/" target="_blank" rel="noopener noreferrer">USWDS Icon List</a>.',
        },
      },
    },
    argTypes: {
      name: {
        control: 'text',
        description: 'USWDS icon name',
      },
      size: {
        control: 'select',
        options: [3, 4, 5, 6, 7, 8, 9],
        description: 'Icon size (maps to USWDS icon size scale 3-9)',
      },
    },
  });
</script>

<Story
  name="Default"
  args={{ name: 'add' }}
  play={async ({ canvasElement }) => {
    const svg = canvasElement.querySelector('svg');
    await expect(svg).toBeInTheDocument();
    await expect(svg?.classList.contains('usa-icon')).toBe(true);

    await expect(svg?.getAttribute('aria-hidden')).toBe('true');
    await expect(svg?.getAttribute('focusable')).toBe('false');
    await expect(svg?.getAttribute('role')).toBe('img');
  }}
/>

<Story
  name="Size 3"
  args={{ name: 'add', size: 3 }}
  play={async ({ canvasElement }) => {
    const svg = canvasElement.querySelector('svg');
    await expect(svg?.classList.contains('usa-icon--size-3')).toBe(true);
  }}
/>

<Story
  name="Size 4"
  args={{ name: 'add', size: 4 }}
  play={async ({ canvasElement }) => {
    const svg = canvasElement.querySelector('svg');
    await expect(svg?.classList.contains('usa-icon--size-4')).toBe(true);
  }}
/>

<Story
  name="Size 5"
  args={{ name: 'add', size: 5 }}
  play={async ({ canvasElement }) => {
    const svg = canvasElement.querySelector('svg');
    await expect(svg?.classList.contains('usa-icon--size-5')).toBe(true);
  }}
/>

<Story
  name="Size 6"
  args={{ name: 'add', size: 6 }}
  play={async ({ canvasElement }) => {
    const svg = canvasElement.querySelector('svg');
    await expect(svg?.classList.contains('usa-icon--size-6')).toBe(true);
  }}
/>

<Story
  name="Size 7"
  args={{ name: 'add', size: 7 }}
  play={async ({ canvasElement }) => {
    const svg = canvasElement.querySelector('svg');
    await expect(svg?.classList.contains('usa-icon--size-7')).toBe(true);
  }}
/>

<Story
  name="Size 8"
  args={{ name: 'add', size: 8 }}
  play={async ({ canvasElement }) => {
    const svg = canvasElement.querySelector('svg');
    await expect(svg?.classList.contains('usa-icon--size-8')).toBe(true);
  }}
/>

<Story
  name="Size 9"
  args={{ name: 'add', size: 9 }}
  play={async ({ canvasElement }) => {
    const svg = canvasElement.querySelector('svg');
    await expect(svg?.classList.contains('usa-icon--size-9')).toBe(true);
  }}
/>

<Story
  name="With Custom Class"
  args={{ name: 'add', class: 'text-primary' }}
  play={async ({ canvasElement }) => {
    const svg = canvasElement.querySelector('svg');
    await expect(svg?.classList.contains('text-primary')).toBe(true);
    await expect(svg?.classList.contains('usa-icon')).toBe(true);
  }}
/>

<Story
  name="With Aria Label"
  args={{
    name: 'search',
    'aria-label': 'Search icon',
    'aria-hidden': 'false'
  }}
  play={async ({ canvasElement }) => {
    const svg = canvasElement.querySelector('svg');
    await expect(svg?.getAttribute('aria-label')).toBe('Search icon');
    await expect(svg?.getAttribute('aria-hidden')).toBe('false');
  }}
/>

<Story name="Close Icon" args={{ name: 'close', size: 5 }} />

<Story name="Search Icon" args={{ name: 'search', size: 5 }} />

<Story name="Check Icon" args={{ name: 'check', size: 5 }} />

<Story name="Error Icon" args={{ name: 'error', size: 5 }} />

<Story name="Warning Icon" args={{ name: 'warning', size: 5 }} />

<Story name="Info Icon" args={{ name: 'info', size: 5 }} />

<Story name="Home Icon" args={{ name: 'home', size: 5 }} />

<Story name="Menu Icon" args={{ name: 'menu', size: 5 }} />

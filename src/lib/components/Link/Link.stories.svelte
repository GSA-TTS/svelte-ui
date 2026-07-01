<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import { expect, userEvent, within, fn } from 'storybook/test';
  import Link from './Link.svelte';
  import { linksnippet } from './LinkSnippet.example.svelte';

  const { Story } = defineMeta({
    title: 'Components/Link',
    component: Link,
    tags: ['autodocs'],
    parameters: {
      a11y: {
        test: 'error',
      },
    },
    args :{
      onclick: fn(),
    },
    argTypes: {
      variant: {
        control: 'select',
        options: ['default', 'external'],
        description: 'Link style variant (maps to USWDS link modifiers)',
        table: {
          defaultValue: { summary: 'default' },
        },
      },
      href: {
        control: 'text',
        description: 'Link destination URL',
      },
      target: {
        control: 'select',
        options: ['_self', '_blank', '_parent', '_top'],
        description: 'Link target attribute',
        table: {
          defaultValue: { summary: '_self' },
        },
      },
    },
  });
</script>

<Story
  name="Default"
  args={{ href: 'javascript:void(0);', children: 'This is a text link' }}
  play={async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const link = canvas.getByRole('link');
    await expect(link).toBeInTheDocument();
    await expect(link).toHaveTextContent('This is a text link');
    await expect(link).toHaveAttribute('href', 'javascript:void(0);');
    await expect(link.className).toContain('usa-link');

    await userEvent.click(link);
  }}
/>

<Story
  name="External"
  args={{
    variant: 'external',
    href: 'https://designsystem.digital.gov',
    children: 'USWDS Documentation',
  }}
  play={async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const link = canvas.getByRole('link');
    await expect(link.className).toContain('usa-link--external');
    await expect(link).toHaveAttribute('rel', 'noreferrer');
  }}
/>

<Story
  name="External New Tab"
  args={{
    variant: 'external',
    href: 'https://designsystem.digital.gov',
    target: '_blank',
    children: 'USWDS Documentation (New Tab)',
  }}
  play={async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const link = canvas.getByRole('link');
    await expect(link.className).toContain('usa-link--external');
    await expect(link).toHaveAttribute('target', '_blank');
    await expect(link).toHaveAttribute('rel', 'noreferrer noopener');
  }}
/>

<Story
  name="External With Custom Rel"
  args={{
    variant: 'external',
    href: 'https://example.com',
    rel: 'nofollow noopener',
    children: 'External link with custom rel',
  }}
  play={async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const link = canvas.getByRole('link');
    await expect(link).toHaveAttribute('rel', 'nofollow noopener');
  }}
/>

<Story
  name="Email Link"
  args={{ href: 'mailto:uswds@gsa.gov', children: 'uswds@gsa.gov' }}
  play={async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const link = canvas.getByRole('link');
    await expect(link).toHaveAttribute('href', 'mailto:uswds@gsa.gov');
    await expect(link).toHaveTextContent('uswds@gsa.gov');
  }}
/>

<Story
  name="Phone Link"
  args={{ href: 'tel:1-800-555-1234', children: '1-800-555-1234' }}
  play={async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const link = canvas.getByRole('link');
    await expect(link).toHaveAttribute('href', 'tel:1-800-555-1234');
    await expect(link).toHaveTextContent('1-800-555-1234');
  }}
/>

<Story
  name="With Custom Classes"
  args={{
    href: 'javascript:void(0);',
    children: 'Link with custom styling',
    class: 'margin-top-2 text-bold',
  }}
  play={async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const link = canvas.getByRole('link');
    await expect(link.className).toContain('usa-link');
    await expect(link.className).toContain('margin-top-2');
    await expect(link.className).toContain('text-bold');
  }}
/>

<Story
  name="Keyboard Navigation"
  args={{ href: 'javascript:void(0);', children: 'Keyboard navigable link' }}
  play={async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const link = canvas.getByRole('link');

    await userEvent.tab();
    await expect(link).toHaveFocus();

    await userEvent.keyboard('{Enter}');
  }}
/>

<Story
  name="Long Link Text"
  args={{
    variant: 'external',
    href: 'https://designsystem.digital.gov/components/link/',
    children:
      'This is a much longer link text that demonstrates how the external link icon aligns properly even when the text wraps to multiple lines',
  }}
/>

<Story
  name="With Snippet Children"
  args={{ href: 'javascript:void(0);', children: linksnippet }}
/>

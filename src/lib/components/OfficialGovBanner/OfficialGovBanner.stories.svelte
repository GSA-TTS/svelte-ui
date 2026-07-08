<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import { expect, userEvent, within } from 'storybook/test';
  import OfficialGovBanner from './OfficialGovBanner.svelte';

  const { Story } = defineMeta({
    title: 'Components/OfficialGovBanner',
    component: OfficialGovBanner,
    tags: ['autodocs'],
    parameters: {
      a11y: {
        test: 'error',
      },
    },
    argTypes: {
      variant: {
        control: 'select',
        options: ['gov', 'mil', 'gov-es', 'mil-es'],
        description: 'Banner variant (domain type and language)',
        table: {
          defaultValue: { summary: 'gov' },
        },
      },
      expanded: {
        control: 'boolean',
        description: 'Control expanded state of the accordion',
        table: {
          defaultValue: { summary: 'false' },
        },
      },
      ariaLabel: {
        control: 'text',
        description: 'Custom aria-label for the banner section',
      },
    },
  });
</script>

<Story
  name="Default Gov"
  play={async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const banner = canvas.getByRole('region');
    await expect(banner).toBeInTheDocument();
    await expect(banner).toHaveAttribute('aria-label', 'Official website of the United States government');

    const button = canvas.getByRole('button');
    await expect(button).toHaveAttribute('aria-expanded', 'false');

    await userEvent.click(button);
    await expect(button).toHaveAttribute('aria-expanded', 'true');
  }}
/>

<Story
  name="Military"
  args={{ variant: 'mil' }}
  play={async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const banner = canvas.getByRole('region');
    await expect(banner).toHaveAttribute('aria-label', 'Official website of the United States government');

    const button = canvas.getByRole('button');
    await userEvent.click(button);
  }}
/>

<Story
  name="Gov Spanish"
  args={{ variant: 'gov-es' }}
  play={async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const banner = canvas.getByRole('region');
    await expect(banner).toHaveAttribute('aria-label', 'Un sitio oficial del Gobierno de Estados Unidos');

    const headerText = canvas.getByText('Un sitio oficial del Gobierno de Estados Unidos');
    await expect(headerText).toBeInTheDocument();

    const button = canvas.getByRole('button');
    await userEvent.click(button);
  }}
/>

<Story
  name="Military Spanish"
  args={{ variant: 'mil-es' }}
  play={async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const banner = canvas.getByRole('region');
    await expect(banner).toHaveAttribute('aria-label', 'Un sitio oficial del Gobierno de Estados Unidos');

    const button = canvas.getByRole('button');
    await userEvent.click(button);
  }}
/>

<Story
  name="Expanded"
  args={{ expanded: true }}
  play={async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const button = canvas.getByRole('button');
    await expect(button).toHaveAttribute('aria-expanded', 'true');

  }}
/>

<Story
  name="Custom Aria Label"
  args={{ ariaLabel: 'Custom government website banner' }}
  play={async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const banner = canvas.getByRole('region');
    await expect(banner).toHaveAttribute('aria-label', 'Custom government website banner');
  }}
/>

<Story
  name="With Custom Classes"
  args={{ class: 'margin-bottom-4' }}
/>

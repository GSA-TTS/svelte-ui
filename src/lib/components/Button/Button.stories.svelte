<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import { expect, userEvent, within, fn } from 'storybook/test';
  import Button from './Button.svelte';

  const { Story } = defineMeta({
    title: 'Components/Button',
    component: Button,
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
        options: [
          'default',
          'secondary',
          'accent-cool',
          'accent-warm',
          'base',
          'outline',
          'inverse',
          'unstyled',
        ],
        description: 'Button style variant (maps to USWDS button modifiers)',
        table: {
          defaultValue: { summary: 'default' },
        },
      },
      size: {
        control: 'select',
        options: ['default', 'big'],
        description: 'Button size (maps to USWDS button sizes)',
        table: {
          defaultValue: { summary: 'default' },
        },
      },
      type: {
        control: 'select',
        options: ['button', 'submit', 'reset'],
        description: 'Button type attribute',
        table: {
          defaultValue: { summary: 'button' },
        },
      },
      disabled: {
        control: 'boolean',
        description: 'Disabled state (hidden from screen readers)',
        table: {
          defaultValue: { summary: 'false' },
        },
      },
    },
  });
</script>

<Story
  name="Default"
  args={{ children: 'Default Button' }}
  play={async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const button = canvas.getByRole('button');
    await expect(button).toBeInTheDocument();
    await expect(button).toHaveTextContent('Default Button');
    await userEvent.click(button);
  }}
/>

<Story
  name="Secondary"
  args={{ variant: 'secondary', children: 'Secondary Button' }}
  play={async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const button = canvas.getByRole('button');
    await expect(button.className).toContain('usa-button--secondary');
    await userEvent.click(button);
  }}
/>

<Story
  name="Accent Cool"
  args={{ variant: 'accent-cool', children: 'Accent Cool Button' }}
/>

<Story
  name="Accent Warm"
  args={{ variant: 'accent-warm', children: 'Accent Warm Button' }}
/>

<Story name="Base" args={{ variant: 'base', children: 'Base Button' }} />

<Story
  name="Outline"
  args={{ variant: 'outline', children: 'Outline Button' }}
/>

<Story
  name="Inverse"
  args={{ variant: 'inverse', children: 'Inverse Button' }}
  parameters={{ backgrounds: { default: 'dark' } }}
/>

<Story
  name="Unstyled"
  args={{ variant: 'unstyled', children: 'Unstyled Button' }}
/>

<Story
  name="Big"
  args={{ size: 'big', children: 'Big Button' }}
  play={async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const button = canvas.getByRole('button');
    await expect(button.className).toContain('usa-button--big');
    await userEvent.click(button);
  }}
/>

<Story
  name="Big Secondary"
  args={{ size: 'big', variant: 'secondary', children: 'Big Secondary Button' }}
/>

<Story
  name="Disabled"
  args={{ disabled: true, children: 'Disabled Button' }}
  play={async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const button = canvas.getByRole('button');
    await expect(button).toBeDisabled();
  }}
/>

<Story name="Submit Button" args={{ type: 'submit', children: 'Submit' }} />

<Story name="Reset Button" args={{ type: 'reset', children: 'Reset' }} />

<Story
  name="With Custom Classes"
  args={{ children: 'Custom Styled', class: 'margin-top-2 width-full' }}
/>

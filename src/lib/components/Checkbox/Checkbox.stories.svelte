<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import { expect, userEvent, within, fn } from 'storybook/test';
  import Checkbox from './Checkbox.svelte';

  const { Story } = defineMeta({
    title: 'Components/Checkbox',
    component: Checkbox,
    tags: ['autodocs'],
    parameters: {
      a11y: {
        test: 'error',
      },
    },
    args :{
      onchange: fn(),
    },
    argTypes: {
      tile: {
        control: 'boolean',
        description: 'Tile variant - larger touch target with background',
        table: {
          defaultValue: { summary: 'false' },
        },
      },
      helpText: {
        control: 'text',
        description: 'Optional help text displayed below the label',
      },
      label: {
        control: 'text',
        description: 'Label text for the checkbox',
      },
      id: {
        control: 'text',
        description: 'Checkbox ID (required for label association)',
      },
      checked: {
        control: 'boolean',
        description: 'Checked state',
        table: {
          defaultValue: { summary: 'false' },
        },
      },
      disabled: {
        control: 'boolean',
        description: 'Disabled state',
        table: {
          defaultValue: { summary: 'false' },
        },
      },
      required: {
        control: 'boolean',
        description: 'Required field',
        table: {
          defaultValue: { summary: 'false' },
        },
      },
      name: {
        control: 'text',
        description: 'Input name attribute',
      },
      value: {
        control: 'text',
        description: 'Input value attribute',
      },
    },
  });
</script>

<Story
  name="Default"
  args={{ id: 'checkbox-default', label: 'Checkbox label' }}
  play={async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const checkbox = canvas.getByRole('checkbox');
    const label = canvas.getByLabelText('Checkbox label');
    const wrapper = canvasElement.querySelector('.usa-checkbox');

    await expect(checkbox).toBeInTheDocument();
    await expect(checkbox.className).toContain('usa-checkbox__input');
    await expect(checkbox).toHaveAttribute('id', 'checkbox-default');
    await expect(checkbox).not.toBeChecked();
    await expect(label).toBeInTheDocument();
    await expect(wrapper).toBeInTheDocument();

    await userEvent.click(checkbox);
    await expect(checkbox).toBeChecked();

    await userEvent.click(label);
    await expect(checkbox).not.toBeChecked();
  }}
/>

<Story
  name="Checked"
  args={{ id: 'checkbox-checked', label: 'Checked checkbox', checked: true }}
  play={async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const checkbox = canvas.getByRole('checkbox');

    await expect(checkbox).toBeChecked();
  }}
/>

<Story
  name="Disabled"
  args={{ id: 'checkbox-disabled', label: 'Disabled checkbox', disabled: true }}
  play={async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const checkbox = canvas.getByRole('checkbox');

    await expect(checkbox).toBeDisabled();
    await expect(checkbox).not.toBeChecked();
  }}
/>

<Story
  name="Disabled Checked"
  args={{ id: 'checkbox-disabled-checked', label: 'Disabled checked checkbox', disabled: true, checked: true }}
  play={async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const checkbox = canvas.getByRole('checkbox');

    await expect(checkbox).toBeDisabled();
    await expect(checkbox).toBeChecked();
  }}
/>

<Story
  name="Required"
  args={{ id: 'checkbox-required', label: 'Required checkbox', required: true }}
  play={async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const checkbox = canvas.getByRole('checkbox');
    const asterisk = canvasElement.querySelector('.usa-hint--required');

    await expect(checkbox).toBeRequired();
    await expect(asterisk?.textContent).toBe('*');
  }}
/>

<Story
  name="With Help Text"
  args={{
    id: 'checkbox-help',
    label: 'Checkbox with help text',
    helpText: 'Select this option if you agree to the terms',
  }}
  play={async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const checkbox = canvas.getByRole('checkbox');
    const helpTextElement = canvasElement.querySelector('.usa-checkbox__label-description');

    await expect(checkbox).toBeInTheDocument();
    await expect(helpTextElement?.textContent).toBe('Select this option if you agree to the terms');
  }}
/>

<Story
  name="Tile Variant"
  args={{ id: 'checkbox-tile', label: 'Tile checkbox', tile: true }}
  play={async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const checkbox = canvas.getByRole('checkbox');

    await expect(checkbox.className).toContain('usa-checkbox__input--tile');
  }}
/>

<Story
  name="Tile with Description"
  args={{
    id: 'checkbox-tile-desc',
    label: 'Tile with description',
    tile: true,
    helpText: 'This is optional text that can be used to describe the label in more detail.',
  }}
  play={async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const checkbox = canvas.getByRole('checkbox');
    const description = canvasElement.querySelector('.usa-checkbox__label-description');

    await expect(checkbox.className).toContain('usa-checkbox__input--tile');
    await expect(description?.textContent).toBe('This is optional text that can be used to describe the label in more detail.');
  }}
/>

<Story
  name="Tile Disabled"
  args={{ id: 'checkbox-tile-disabled', label: 'Disabled tile checkbox', tile: true, disabled: true }}
  play={async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const checkbox = canvas.getByRole('checkbox');

    await expect(checkbox).toBeDisabled();
    await expect(checkbox.className).toContain('usa-checkbox__input--tile');
  }}
/>

<Story
  name="With Custom Classes"
  args={{ id: 'checkbox-custom', label: 'Checkbox with custom classes', class: 'margin-top-2' }}
  play={async ({ canvasElement }) => {
    const wrapper = canvasElement.querySelector('.usa-checkbox');

    await expect(wrapper?.className).toContain('usa-checkbox');
    await expect(wrapper?.className).toContain('margin-top-2');
  }}
/>

<Story
  name="Keyboard Navigation"
  args={{ id: 'checkbox-keyboard', label: 'Keyboard navigable' }}
  play={async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const checkbox = canvas.getByRole('checkbox');

    await expect(checkbox).not.toBeChecked();

    await userEvent.tab();
    await expect(checkbox).toHaveFocus();

    await userEvent.keyboard(' ');
    await expect(checkbox).toBeChecked();

    await userEvent.keyboard(' ');
    await expect(checkbox).not.toBeChecked();
  }}
/>

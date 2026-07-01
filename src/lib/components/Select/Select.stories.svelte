<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import { expect, userEvent, within } from 'storybook/test';
  import Select from './Select.svelte';

  const { Story } = defineMeta({
    title: 'Components/Select',
    component: Select,
    tags: ['autodocs'],
    parameters: {
      a11y: {
        test: 'error',
      },
    },
    argTypes: {
      error: {
        control: 'boolean',
        description: 'Error state - applies error styling and aria-invalid',
        table: {
          defaultValue: { summary: 'false' },
        },
      },
      success: {
        control: 'boolean',
        description: 'Success state - applies success styling',
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
      multiple: {
        control: 'boolean',
        description: 'Multiple selection mode',
        table: {
          defaultValue: { summary: 'false' },
        },
      },
      helpText: {
        control: 'text',
        description: 'Help text displayed above the select',
      },
      errorMessage: {
        control: 'text',
        description: 'Error message displayed below the select',
      },
      label: {
        control: 'text',
        description: 'Label text for the select',
      },
      optional: {
        control: 'boolean',
        description: 'Mark field as optional - displays "(optional)" after label',
        table: {
          defaultValue: { summary: 'false' },
        },
      },
      id: {
        control: 'text',
        description: 'Select ID (required for label association)',
      },
    },
  });

  export { defaultOptions, optionsWithPlaceholder, manyOptions };
</script>

{#snippet defaultOptions()}
  <option value="value1">Option A</option>
  <option value="value2">Option B</option>
  <option value="value3">Option C</option>
{/snippet}

{#snippet optionsWithPlaceholder()}
  <option value="">- Select -</option>
  <option value="value1">Option A</option>
  <option value="value2">Option B</option>
  <option value="value3">Option C</option>
{/snippet}

{#snippet manyOptions()}
  <option value="">- Select -</option>
  <option value="AL">Alabama</option>
  <option value="AK">Alaska</option>
  <option value="AZ">Arizona</option>
  <option value="AR">Arkansas</option>
  <option value="CA">California</option>
  <option value="CO">Colorado</option>
  <option value="CT">Connecticut</option>
  <option value="DE">Delaware</option>
  <option value="FL">Florida</option>
  <option value="GA">Georgia</option>
  <option value="HI">Hawaii</option>
  <option value="ID">Idaho</option>
  <option value="IL">Illinois</option>
  <option value="IN">Indiana</option>
  <option value="IA">Iowa</option>
{/snippet}

<Story
  name="Default"
  args={{ id: 'select-default', label: 'Dropdown label', children: optionsWithPlaceholder }}
  play={async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const select = canvas.getByRole('combobox');
    const label = canvas.getByText('Dropdown label');

    await expect(select).toBeInTheDocument();
    await expect(select.className).toContain('usa-select');
    await expect(select).toHaveAttribute('id', 'select-default');
    await expect(label).toBeInTheDocument();
  }}
/>

<Story
  name="With Value Selected"
  args={{ id: 'select-value', label: 'Dropdown with selection', value: 'value2', children: optionsWithPlaceholder }}
  play={async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const select = canvas.getByRole('combobox');

    await expect(select).toHaveValue('value2');
  }}
/>

<Story
  name="With Help Text"
  args={{
    id: 'select-help',
    label: 'Select an option',
    helpText: 'Choose the option that best describes your situation',
    children: optionsWithPlaceholder,
  }}
  play={async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const select = canvas.getByRole('combobox');
    const hint = canvasElement.querySelector('.usa-hint');

    await expect(select).toHaveAttribute('aria-describedby', 'select-help-hint');
    await expect(hint?.textContent).toBe('Choose the option that best describes your situation');
  }}
/>

<Story
  name="Error State"
  args={{
    id: 'select-error',
    label: 'Select an option',
    error: true,
    errorMessage: 'Please select a valid option',
    children: optionsWithPlaceholder,
  }}
  play={async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const select = canvas.getByRole('combobox');
    const label = canvas.getByText('Select an option');
    const errorMsg = canvasElement.querySelector('.usa-error-message');

    await expect(select).toHaveAttribute('aria-invalid', 'true');
    await expect(select.className).toContain('usa-select--error');
    await expect(label.className).toContain('usa-label--error');
    await expect(errorMsg?.textContent).toBe('Please select a valid option');
    await expect(select).toHaveAttribute('aria-describedby', 'select-error-error');
  }}
/>

<Story
  name="Success State"
  args={{
    id: 'select-success',
    label: 'Select an option',
    success: true,
    value: 'value1',
    children: optionsWithPlaceholder,
  }}
  play={async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const select = canvas.getByRole('combobox');

    await expect(select.className).toContain('usa-select--success');
    await expect(select).not.toHaveAttribute('aria-invalid');
  }}
/>

<Story
  name="Disabled"
  args={{ id: 'select-disabled', label: 'Disabled select', disabled: true, children: defaultOptions }}
  play={async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const select = canvas.getByRole('combobox');

    await expect(select).toBeDisabled();
  }}
/>

<Story
  name="Required"
  args={{ id: 'select-required', label: 'Select an option', required: true, children: optionsWithPlaceholder }}
  play={async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const select = canvas.getByRole('combobox');
    const asterisk = canvasElement.querySelector('.usa-hint--required');

    await expect(select).toBeRequired();
    await expect(select).toHaveAttribute('id', 'select-required');
    await expect(asterisk?.textContent).toBe('*');
  }}
/>

<Story
  name="Optional"
  args={{ id: 'select-optional', label: 'Select an option', optional: true, children: optionsWithPlaceholder }}
  play={async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const select = canvas.getByRole('combobox');
    const optionalText = canvasElement.querySelector('.usa-hint');

    await expect(select).not.toBeRequired();
    await expect(optionalText?.textContent).toBe('(optional)');
  }}
/>

<Story
  name="Multiple Select"
  args={{
    id: 'select-multiple',
    label: 'Select states (hold Ctrl/Cmd to select multiple)',
    multiple: true,
    size: 8,
    children: manyOptions,
  }}
  play={async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const select = canvas.getByRole('listbox');

    await expect(select).toHaveAttribute('multiple');
    await expect(select.className).toContain('usa-select');
    await expect(select).toHaveAttribute('size', '8');
  }}
/>

<Story
  name="With Custom Classes"
  args={{ id: 'select-custom', label: 'Select with custom classes', class: 'margin-top-2', children: defaultOptions }}
  play={async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const select = canvas.getByRole('combobox');

    await expect(select.className).toContain('usa-select');
    await expect(select.className).toContain('margin-top-2');
  }}
/>

<Story
  name="Keyboard Navigation"
  args={{ id: 'select-keyboard', label: 'Navigate with keyboard', children: optionsWithPlaceholder }}
  play={async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const select = canvas.getByRole('combobox');

    await userEvent.tab();
    await expect(select).toHaveFocus();
  }}
/>

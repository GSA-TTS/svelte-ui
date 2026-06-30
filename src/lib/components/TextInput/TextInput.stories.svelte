<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import { expect, userEvent, within } from 'storybook/test';
  import TextInput from './TextInput.svelte';

  const { Story } = defineMeta({
    title: 'Components/TextInput',
    component: TextInput,
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
      width: {
        control: 'select',
        options: [undefined, '2xs', 'xs', 'sm', 'small', 'md', 'medium', 'lg', 'xl', '2xl'],
        description: 'Input width modifier (maps to USWDS usa-input--[width] classes)',
        table: {
          defaultValue: { summary: 'undefined' },
        },
      },
      type: {
        control: 'select',
        options: ['text', 'email', 'password', 'tel', 'url', 'number', 'search'],
        description: 'HTML input type attribute',
        table: {
          defaultValue: { summary: 'text' },
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
      helpText: {
        control: 'text',
        description: 'Help text displayed above the input',
      },
      errorMessage: {
        control: 'text',
        description: 'Error message displayed below the input',
      },
      label: {
        control: 'text',
        description: 'Label text for the input',
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
        description: 'Input ID (required for label association)',
      },
    },
  });
</script>

<Story
  name="Default"
  args={{ id: 'input-default', label: 'Text input label' }}
  play={async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByRole('textbox');
    const label = canvas.getByText('Text input label');
    
    await expect(input).toBeInTheDocument();
    await expect(input.className).toContain('usa-input');
    await expect(input).toHaveAttribute('id', 'input-default');
    await expect(label).toBeInTheDocument();
  }}
/>

<Story
  name="With Value"
  args={{ id: 'input-value', label: 'Text input with value', value: 'Example text' }}
  play={async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByRole('textbox');
    
    await expect(input).toHaveValue('Example text');
  }}
/>

<Story
  name="With Help Text"
  args={{
    id: 'input-help',
    label: 'Full name',
    helpText: 'Enter your full name as it appears on your ID',
  }}
  play={async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByRole('textbox');
    const hint = canvasElement.querySelector('.usa-hint');
    
    await expect(input).toHaveAttribute('aria-describedby', 'input-help-hint');
    await expect(hint?.textContent).toBe('Enter your full name as it appears on your ID');
  }}
/>

<Story
  name="Error State"
  args={{
    id: 'input-error',
    label: 'Email address',
    error: true,
    errorMessage: 'Enter an email address in the required format, like name@example.com',
    type: 'email',
  }}
  play={async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByRole('textbox');
    const label = canvas.getByText('Email address');
    const errorMsg = canvasElement.querySelector('.usa-error-message');
    
    await expect(input).toHaveAttribute('aria-invalid', 'true');
    await expect(input.className).toContain('usa-input--error');
    await expect(label.className).toContain('usa-label--error');
    await expect(errorMsg?.textContent).toBe('Enter an email address in the required format, like name@example.com');
    await expect(input).toHaveAttribute('aria-describedby', 'input-error-error');
  }}
/>

<Story
  name="Success State"
  args={{
    id: 'input-success',
    label: 'Email address',
    success: true,
    type: 'email',
    value: 'user@example.com',
  }}
  play={async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByRole('textbox');
    
    await expect(input.className).toContain('usa-input--success');
    await expect(input).not.toHaveAttribute('aria-invalid');
  }}
/>

<Story
  name="Disabled"
  args={{ id: 'input-disabled', label: 'Disabled input', disabled: true, value: 'Cannot edit' }}
  play={async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByRole('textbox');
    
    await expect(input).toBeDisabled();
  }}
/>

<Story
  name="Required"
  args={{ id: 'input-required', label: 'Email address', type: 'email', required: true }}
  play={async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByRole('textbox');
    const asterisk = canvasElement.querySelector('.usa-hint--required');
    
    await expect(input).toBeRequired();
    await expect(input).toHaveAttribute('id', 'input-required');
    await expect(asterisk?.textContent).toBe('*');
  }}
/>

<Story
  name="Optional"
  args={{ id: 'input-optional', label: 'Middle name', type: 'text', optional: true }}
  play={async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByRole('textbox');
    const optionalText = canvasElement.querySelector('.usa-hint');
    
    await expect(input).not.toBeRequired();
    await expect(optionalText?.textContent).toBe('(optional)');
  }}
/>

<Story
  name="Width Small"
  args={{ id: 'input-width-sm', label: 'ZIP code', width: 'sm', type: 'text' }}
  play={async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByRole('textbox');
    
    await expect(input.className).toContain('usa-input--sm');
  }}
/>

<Story
  name="Width Medium"
  args={{ id: 'input-width-md', label: 'Phone number', width: 'md', type: 'tel' }}
  play={async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByRole('textbox');
    
    await expect(input.className).toContain('usa-input--md');
  }}
/>

<Story
  name="With Custom Classes"
  args={{ id: 'input-custom', label: 'Text with custom classes', class: 'margin-top-2' }}
  play={async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByRole('textbox');
    
    await expect(input.className).toContain('usa-input');
    await expect(input.className).toContain('margin-top-2');
  }}
/>

<Story
  name="Keyboard Navigation"
  args={{ id: 'input-keyboard', label: 'Type here' }}
  play={async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByRole('textbox');
    
    await userEvent.tab();
    await expect(input).toHaveFocus();
    
    await userEvent.type(input, 'Test text');
    await expect(input).toHaveValue('Test text');
  }}
/>

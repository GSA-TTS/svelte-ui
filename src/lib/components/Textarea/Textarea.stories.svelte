<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import { expect, userEvent, within, fn } from 'storybook/test';
  import Textarea from './Textarea.svelte';

  const { Story } = defineMeta({
    title: 'Components/Textarea',
    component: Textarea,
    tags: ['autodocs'],
    parameters: {
      a11y: {
        test: 'error',
      },
    },
    args :{
      onchange: fn(),
      onfocus: fn(),
      onblur: fn(),
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
      helpText: {
        control: 'text',
        description: 'Help text displayed above the textarea',
      },
      errorMessage: {
        control: 'text',
        description: 'Error message displayed below the textarea',
      },
      label: {
        control: 'text',
        description: 'Label text for the textarea',
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
        description: 'Textarea ID (required for label association)',
      },
    },
  });
</script>

<Story
  name="Default"
  args={{ id: 'textarea-default', label: 'Text area label' }}
  play={async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const textarea = canvas.getByRole('textbox');
    const label = canvas.getByText('Text area label');

    await expect(textarea).toBeInTheDocument();
    await expect(textarea.className).toContain('usa-textarea');
    await expect(textarea).toHaveAttribute('id', 'textarea-default');
    await expect(label).toBeInTheDocument();
  }}
/>

<Story
  name="With Value"
  args={{
    id: 'textarea-value',
    label: 'Description',
    value: 'This is example text that has been pre-filled.',
  }}
  play={async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const textarea = canvas.getByRole('textbox');

    await expect(textarea).toHaveValue('This is example text that has been pre-filled.');
  }}
/>

<Story
  name="With Help Text"
  args={{ id: 'textarea-help', label: 'Description', helpText: 'Maximum 500 characters' }}
  play={async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const textarea = canvas.getByRole('textbox');
    const hint = canvasElement.querySelector('.usa-hint');

    await expect(textarea).toHaveAttribute('aria-describedby', 'textarea-help-hint');
    await expect(hint?.textContent).toBe('Maximum 500 characters');
  }}
/>

<Story
  name="Error State"
  args={{
    id: 'textarea-error',
    label: 'Description',
    error: true,
    errorMessage: 'Please enter a description with at least 10 characters',
  }}
  play={async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const textarea = canvas.getByRole('textbox');
    const label = canvas.getByText('Description');
    const errorMsg = canvasElement.querySelector('.usa-error-message');

    await expect(textarea).toHaveAttribute('aria-invalid', 'true');
    await expect(textarea.className).toContain('usa-textarea--error');
    await expect(label.className).toContain('usa-label--error');
    await expect(errorMsg?.textContent).toBe('Please enter a description with at least 10 characters');
    await expect(textarea).toHaveAttribute('aria-describedby', 'textarea-error-error');
  }}
/>

<Story
  name="Success State"
  args={{
    id: 'textarea-success',
    label: 'Description',
    success: true,
    value: 'This description meets all requirements.',
  }}
  play={async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const textarea = canvas.getByRole('textbox');

    await expect(textarea.className).toContain('usa-textarea--success');
    await expect(textarea).not.toHaveAttribute('aria-invalid');
  }}
/>

<Story
  name="Disabled"
  args={{
    id: 'textarea-disabled',
    label: 'Disabled textarea',
    disabled: true,
    value: 'Cannot edit this text',
  }}
  play={async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const textarea = canvas.getByRole('textbox');

    await expect(textarea).toBeDisabled();
  }}
/>

<Story
  name="Required"
  args={{ id: 'textarea-required', label: 'Description', required: true }}
  play={async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const textarea = canvas.getByRole('textbox');
    const asterisk = canvasElement.querySelector('.usa-hint--required');

    await expect(textarea).toBeRequired();
    await expect(textarea).toHaveAttribute('id', 'textarea-required');
    await expect(asterisk?.textContent).toBe('*');
  }}
/>

<Story
  name="Optional"
  args={{ id: 'textarea-optional', label: 'Additional comments', optional: true }}
  play={async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const textarea = canvas.getByRole('textbox');
    const optionalText = canvasElement.querySelector('.usa-hint');

    await expect(textarea).not.toBeRequired();
    await expect(optionalText?.textContent).toBe('(optional)');
  }}
/>

<Story
  name="With Custom Classes"
  args={{ id: 'textarea-custom', label: 'Textarea with custom classes', class: 'margin-top-2' }}
  play={async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const textarea = canvas.getByRole('textbox');

    await expect(textarea.className).toContain('usa-textarea');
    await expect(textarea.className).toContain('margin-top-2');
  }}
/>

<Story
  name="Keyboard Navigation"
  args={{ id: 'textarea-keyboard', label: 'Type here' }}
  play={async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const textarea = canvas.getByRole('textbox');

    await userEvent.tab();
    await expect(textarea).toHaveFocus();

    await userEvent.type(textarea, 'Test text entry');
    await expect(textarea).toHaveValue('Test text entry');
  }}
/>

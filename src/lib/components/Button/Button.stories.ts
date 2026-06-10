import type { Meta, StoryObj } from "@storybook/svelte";
import { expect, userEvent, within } from "storybook/test";
import Button from "./Button.svelte";

const meta = {
  title: "Components/Button",
  component: Button,
  tags: ["autodocs"],
  parameters: {
    a11y: {
      // Fail tests on accessibility violations
      test: 'error',
    },
  },
  argTypes: {
    variant: {
      control: "select",
      options: [
        "default",
        "secondary",
        "accent-cool",
        "accent-warm",
        "base",
        "outline",
        "inverse",
        "unstyled",
      ],
      description: "Button style variant (maps to USWDS button modifiers)",
      table: {
        defaultValue: { summary: "default" },
      },
    },
    size: {
      control: "select",
      options: ["default", "big"],
      description: "Button size (maps to USWDS button sizes)",
      table: {
        defaultValue: { summary: "default" },
      },
    },
    type: {
      control: "select",
      options: ["button", "submit", "reset"],
      description: "Button type attribute",
      table: {
        defaultValue: { summary: "button" },
      },
    },
    disabled: {
      control: "boolean",
      description: "Disabled state (hidden from screen readers)",
      table: {
        defaultValue: { summary: "false" },
      },
    },
  },
} satisfies Meta<Button>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default button - USWDS primary button style
 * Tests: rendering, text content, click interaction
 */
export const Default: Story = {
  args: {
    children: "Default Button",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Test: Button renders and is in the document
    const button = canvas.getByRole('button');
    await expect(button).toBeInTheDocument();

    // Test: Button has correct text content
    await expect(button).toHaveTextContent('Default Button');

    // Test: Button is clickable
    await userEvent.click(button);
  },
};

/**
 * Secondary button variant - USWDS secondary style
 * Tests: variant class is applied correctly
 */
export const Secondary: Story = {
  args: {
    variant: "secondary",
    children: "Secondary Button",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Test: Button has secondary variant class
    const button = canvas.getByRole('button');
    await expect(button.className).toContain('usa-button--secondary');

    // Test: Click interaction
    await userEvent.click(button);
  },
};

/**
 * Accent Cool button variant - USWDS accent cool style
 */
export const AccentCool: Story = {
  args: {
    variant: "accent-cool",
    children: "Accent Cool Button",
  },
};

/**
 * Accent Warm button variant - USWDS accent warm style
 */
export const AccentWarm: Story = {
  args: {
    variant: "accent-warm",
    children: "Accent Warm Button",
  },
};

/**
 * Base button variant - USWDS base style
 */
export const Base: Story = {
  args: {
    variant: "base",
    children: "Base Button",
  },
};

/**
 * Outline button variant - USWDS outline style with transparent background
 */
export const Outline: Story = {
  args: {
    variant: "outline",
    children: "Outline Button",
  },
};

/**
 * Inverse button variant - USWDS inverse style for dark backgrounds
 */
export const Inverse: Story = {
  args: {
    variant: "inverse",
    children: "Inverse Button",
  },
  parameters: {
    backgrounds: { default: "dark" },
  },
};

/**
 * Unstyled button - USWDS unstyled button that looks like a link
 */
export const Unstyled: Story = {
  args: {
    variant: "unstyled",
    children: "Unstyled Button",
  },
};

/**
 * Big button size - USWDS large button size
 * Tests: size class is applied correctly
 */
export const Big: Story = {
  args: {
    size: "big",
    children: "Big Button",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Test: Button has big size class
    const button = canvas.getByRole('button');
    await expect(button.className).toContain('usa-button--big');

    // Test: Click interaction
    await userEvent.click(button);
  },
};

/**
 * Big Secondary button - Combines size and variant
 */
export const BigSecondary: Story = {
  args: {
    size: "big",
    variant: "secondary",
    children: "Big Secondary Button",
  },
};

/**
 * Disabled button - Uses HTML disabled attribute
 * Tests: disabled state and accessibility
 */
export const Disabled: Story = {
  args: {
    disabled: true,
    children: "Disabled Button",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Test: Button is disabled
    const button = canvas.getByRole('button');
    await expect(button).toBeDisabled();
  },
};

/**
 * Submit button type
 */
export const SubmitButton: Story = {
  args: {
    type: "submit",
    children: "Submit",
  },
};

/**
 * Reset button type
 */
export const ResetButton: Story = {
  args: {
    type: "reset",
    children: "Reset",
  },
};

/**
 * Button with custom classes - You can add USWDS utility classes
 */
export const WithCustomClasses: Story = {
  args: {
    children: "Custom Styled",
    class: "margin-top-2 width-full",
  },
};


import type { Meta, StoryObj } from "@storybook/svelte";
import Button from "./Button.svelte";

const meta = {
  title: "Components/Button",
  component: Button,
  tags: ["autodocs"],
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
 */
export const Default: Story = {
  args: {
    children: "Default Button",
  },
};

/**
 * Secondary button variant - USWDS secondary style
 */
export const Secondary: Story = {
  args: {
    variant: "secondary",
    children: "Secondary Button",
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
 */
export const Big: Story = {
  args: {
    size: "big",
    children: "Big Button",
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
 */
export const Disabled: Story = {
  args: {
    disabled: true,
    children: "Disabled Button",
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

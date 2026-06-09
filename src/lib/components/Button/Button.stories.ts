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
      description: "Button style variant",
      table: {
        defaultValue: { summary: "default" },
      },
    },
    size: {
      control: "select",
      options: ["default", "big"],
      description: "Button size",
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
    ariaDisabled: {
      control: "boolean",
      description: "Aria-disabled state (visible to screen readers)",
      table: {
        defaultValue: { summary: "false" },
      },
    },
  },
} satisfies Meta<Button>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default button variant - primary action button
 */
export const Default: Story = {
  args: {
    children: "Default Button",
  },
};

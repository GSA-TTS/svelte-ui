<script module lang="ts">
  import { defineMeta } from "@storybook/addon-svelte-csf";
  import { expect, userEvent, within, fn } from "storybook/test";
  import Radio from "./Radio.svelte";

  const { Story } = defineMeta({
    title: "Components/Radio",
    component: Radio,
    tags: ["autodocs"],
    parameters: {
      a11y: {
        test: "error",
      },
    },
    args: {
      onchange: fn(),
    },
    argTypes: {
      tile: {
        control: "boolean",
        description: "Tile variant - larger touch target with background",
        table: {
          defaultValue: { summary: "false" },
        },
      },
      helpText: {
        control: "text",
        description: "Optional help text displayed below the label",
      },
      label: {
        control: "text",
        description: "Label text for the radio button",
      },
      id: {
        control: "text",
        description: "Radio button ID (required for label association)",
      },
      checked: {
        control: "boolean",
        description: "Checked state",
        table: {
          defaultValue: { summary: "false" },
        },
      },
      disabled: {
        control: "boolean",
        description: "Disabled state",
        table: {
          defaultValue: { summary: "false" },
        },
      },
      required: {
        control: "boolean",
        description: "Required field",
        table: {
          defaultValue: { summary: "false" },
        },
      },
      name: {
        control: "text",
        description: "Input name attribute (required for radio button groups)",
      },
      value: {
        control: "text",
        description: "Input value attribute",
      },
    },
  });
</script>

<Story
  name="Default"
  args={{
    id: "radio-default",
    label: "Radio button label",
    name: "default-group",
  }}
  play={async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const radio = canvas.getByRole("radio");
    const label = canvas.getByLabelText("Radio button label");
    const wrapper = canvasElement.querySelector(".usa-radio");

    await expect(radio).toBeInTheDocument();
    await expect(radio.className).toContain("usa-radio__input");
    await expect(radio).toHaveAttribute("id", "radio-default");
    await expect(radio).toHaveAttribute("type", "radio");
    await expect(radio).not.toBeChecked();
    await expect(label).toBeInTheDocument();
    await expect(wrapper).toBeInTheDocument();

    await userEvent.click(label);
    await expect(radio).toBeChecked();
  }}
/>

<Story
  name="Checked"
  args={{
    id: "radio-checked",
    label: "Checked radio button",
    name: "checked-group",
    checked: true,
  }}
  play={async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const radio = canvas.getByRole("radio");

    await expect(radio).toBeChecked();
  }}
/>

<Story
  name="Disabled"
  args={{
    id: "radio-disabled",
    label: "Disabled radio button",
    name: "disabled-group",
    disabled: true,
  }}
  play={async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const radio = canvas.getByRole("radio");

    await expect(radio).toBeDisabled();
    await expect(radio).not.toBeChecked();
  }}
/>

<Story
  name="Disabled Checked"
  args={{
    id: "radio-disabled-checked",
    label: "Disabled checked radio button",
    name: "disabled-checked-group",
    disabled: true,
    checked: true,
  }}
  play={async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const radio = canvas.getByRole("radio");

    await expect(radio).toBeDisabled();
    await expect(radio).toBeChecked();
  }}
/>

<Story
  name="Required"
  args={{
    id: "radio-required",
    label: "Required radio button",
    name: "required-group",
    required: true,
  }}
  play={async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const radio = canvas.getByRole("radio");
    const asterisk = canvasElement.querySelector(".usa-hint--required");

    await expect(radio).toBeRequired();
    await expect(asterisk?.textContent).toBe("*");
  }}
/>

<Story
  name="With Help Text"
  args={{
    id: "radio-help",
    label: "Radio button with help text",
    name: "help-group",
    helpText: "Select this option if you prefer this choice",
  }}
  play={async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const radio = canvas.getByRole("radio");
    const helpTextElement = canvasElement.querySelector(
      ".usa-radio__label-description",
    );

    await expect(radio).toBeInTheDocument();
    await expect(helpTextElement?.textContent).toBe(
      "Select this option if you prefer this choice",
    );
  }}
/>

<Story
  name="Tile Variant"
  args={{
    id: "radio-tile",
    label: "Tile radio button",
    name: "tile-group",
    tile: true,
  }}
  play={async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const radio = canvas.getByRole("radio");

    await expect(radio.className).toContain("usa-radio__input--tile");
  }}
/>

<Story
  name="Tile with Description"
  args={{
    id: "radio-tile-desc",
    label: "Tile with description",
    name: "tile-desc-group",
    tile: true,
    helpText:
      "This is optional text that can be used to describe the label in more detail.",
  }}
  play={async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const radio = canvas.getByRole("radio");
    const description = canvasElement.querySelector(
      ".usa-radio__label-description",
    );

    await expect(radio.className).toContain("usa-radio__input--tile");
    await expect(description?.textContent).toBe(
      "This is optional text that can be used to describe the label in more detail.",
    );
  }}
/>

<Story
  name="Tile Disabled"
  args={{
    id: "radio-tile-disabled",
    label: "Disabled tile radio button",
    name: "tile-disabled-group",
    tile: true,
    disabled: true,
  }}
  play={async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const radio = canvas.getByRole("radio");

    await expect(radio).toBeDisabled();
    await expect(radio.className).toContain("usa-radio__input--tile");
  }}
/>

<Story
  name="With Custom Classes"
  args={{
    id: "radio-custom",
    label: "Radio button with custom classes",
    name: "custom-group",
    class: "margin-top-2",
  }}
  play={async ({ canvasElement }) => {
    const wrapper = canvasElement.querySelector(".usa-radio");

    await expect(wrapper?.className).toContain("usa-radio");
    await expect(wrapper?.className).toContain("margin-top-2");
  }}
/>

<Story
  name="Keyboard Navigation"
  args={{
    id: "radio-keyboard",
    label: "Keyboard navigable",
    name: "keyboard-group",
  }}
  play={async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const radio = canvas.getByRole("radio");

    await expect(radio).not.toBeChecked();

    await userEvent.tab();
    await expect(radio).toHaveFocus();

    await userEvent.keyboard(" ");
    await expect(radio).toBeChecked();
  }}
/>

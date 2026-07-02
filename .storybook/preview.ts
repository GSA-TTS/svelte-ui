import type { Preview } from "@storybook/svelte";
import "../src/lib/styles/index.css";
import theme from "./theme";

const preview: Preview = {
  tags: ["autodocs"],
  parameters: {
    docs: {
      toc: true,
      theme: theme,
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    options: {
      showPanel: true,
      panelPosition: "bottom",
      storySort: {
        order: ["Components", "Recipes", "*"],
      },
    },
  },
};

export default preview;

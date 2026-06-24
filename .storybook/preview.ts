import type { Preview } from "@storybook/svelte";
import "../src/lib/styles/index.css";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    options: {
      showPanel: true,
      panelPosition: "bottom",
    },
  },
};

export default preview;

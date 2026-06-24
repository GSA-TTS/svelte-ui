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
    test: {
      // Ensure the test addon is enabled in built Storybook
      dangerouslyIgnoreUnhandledErrors: false,
    },
  },
};

export default preview;

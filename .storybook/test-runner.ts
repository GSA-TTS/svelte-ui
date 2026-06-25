import type { TestRunnerConfig } from "@storybook/test-runner";
import { getStoryContext } from "@storybook/test-runner";

const config: TestRunnerConfig = {
  async preVisit(page, context) {
    // This ensures Svelte stories are properly loaded
    await page.evaluate(() => {
      if (typeof window !== "undefined") {
        // Wait for Svelte components to be mounted
        return new Promise((resolve) => {
          if (document.readyState === "complete") {
            resolve(undefined);
          } else {
            window.addEventListener("load", () => resolve(undefined));
          }
        });
      }
    });
  },
};

export default config;

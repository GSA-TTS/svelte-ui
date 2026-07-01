import type { StorybookConfig } from "@storybook/svelte-vite";

const config: StorybookConfig = {
  stories: ["../src/**/*.stories.@(js|ts|svelte)", "../docs/**/*.mdx"],
  addons: [
    "@storybook/addon-docs",
    "@storybook/addon-svelte-csf",
    "@storybook/addon-vitest",
    "@storybook/addon-a11y",
  ],
  framework: {
    name: "@storybook/svelte-vite",
    options: {},
  },
  viteFinal: async (config) => {
    // Ensure import.meta.vitest is defined as false in Storybook context
    if (config.define) {
      config.define["import.meta.vitest"] = "undefined";
    } else {
      config.define = {
        "import.meta.vitest": "undefined",
      };
    }

    // Set build target to esnext to avoid esbuild transpilation issues
    // with modern JavaScript features (destructuring in for-of loops)
    if (!config.build) {
      config.build = {};
    }
    config.build.target = "esnext";

    // Also set optimizeDeps target for dev server
    if (!config.optimizeDeps) {
      config.optimizeDeps = {};
    }
    config.optimizeDeps.esbuildOptions = {
      target: "esnext",
    };

    return config;
  },
};

export default config;

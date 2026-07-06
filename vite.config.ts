import { svelte } from "@sveltejs/vite-plugin-svelte";
import { defineConfig } from "vitest/config";
import { resolve } from "path";
import dts from "vite-plugin-dts";
import { storybookTest } from "@storybook/addon-vitest/vitest-plugin";

export default defineConfig({
  plugins: [
    svelte(),
    dts({
      include: ["src/lib/**/*.ts"],
      exclude: ["src/**/*.test.ts", "src/**/*.spec.ts", "src/**/*.stories.ts", "src/**/*.stories.svelte"],
      entryRoot: "src/lib",
      outDir: "dist",
      rollupTypes: false,
    }),
    storybookTest({
      storybookScript: "npm run storybook -- --ci",
    }),
  ],
  build: {
    target: "esnext",
    lib: {
      entry: resolve(__dirname, "src/lib/index.ts"),
      name: "SvelteUI",
      fileName: (format) => `svelte-ui.${format}.js`,
    },
    rollupOptions: {
      external: ["svelte", "svelte/internal", "@uswds/uswds"],
      output: {
        globals: {
          svelte: "Svelte",
        },
      },
    },
  },
  test: {
    includeSource: ["src/**/*.{js,ts,svelte}"],
    globals: true,
    environment: "jsdom",
    setupFiles: ["./src/test-setup.ts"],
    onConsoleLog(log) {
      if (log.includes("Not implemented: HTMLCanvasElement")) {
        return false;
      }
    },
    coverage: {
      provider: "v8",
      reporter: ["text", "json", "html"],
      exclude: [
        "node_modules/",
        "src/**/*.spec.ts",
        "**/*.config.{js,ts}",
        "**/dist/**",
      ],
    },
  },
  server: {
    host: "0.0.0.0",
    port: 5173,
  },
});

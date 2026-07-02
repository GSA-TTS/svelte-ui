import { create } from "storybook/theming";

export default create({
  base: "light",

  fontBase:
    '"Source Sans Pro", "Helvetica Neue", "Helvetica", "Roboto", "Arial", sans-serif',
  fontCode:
    '"Roboto Mono Web", "Bitstream Vera Sans Mono", "Consolas", "Courier", monospace',

  brandTitle: "Svelte UI Library",
  brandUrl: "https://github.com/GSA/svelte-ui",
  brandTarget: "_self",

  colorPrimary: "#005ea2",
  colorSecondary: "#005ea2",

  appBg: "#f0f0f0",
  appContentBg: "#ffffff",
  appPreviewBg: "#ffffff",
  appBorderColor: "#a9aeb1",
  appBorderRadius: 0,

  textColor: "#1b1b1b",
  textInverseColor: "#ffffff",

  barTextColor: "#71767a",
  barSelectedColor: "#005ea2",
  barHoverColor: "#0076d6",
  barBg: "#ffffff",

  inputBg: "#ffffff",
  inputBorder: "#71767a",
  inputTextColor: "#1b1b1b",
  inputBorderRadius: 0,
});

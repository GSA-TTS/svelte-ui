import "@testing-library/jest-dom/vitest";

// Suppress jsdom Canvas warning - Canvas is not needed for accessibility testing
const originalError = console.error;
const originalWarn = console.warn;

console.error = (...args) => {
  if (
    typeof args[0] === "string" &&
    args[0].includes("Not implemented: HTMLCanvasElement")
  ) {
    return;
  }
  originalError(...args);
};

console.warn = (...args) => {
  if (
    typeof args[0] === "string" &&
    args[0].includes("Not implemented: HTMLCanvasElement")
  ) {
    return;
  }
  originalWarn(...args);
};

/**
 * Ambient type declarations for Svelte components
 * Allows importing .svelte files in TypeScript
 */

declare module "*.svelte" {
  import type { Component } from "svelte";
  const component: Component<any>;
  export default component;
  // Allow type exports from Svelte components
  export * from "svelte";
}

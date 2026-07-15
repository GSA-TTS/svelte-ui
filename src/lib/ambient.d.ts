/**
 * Ambient type declarations for Svelte components
 * Allows importing .svelte files in TypeScript
 */

declare module "*.svelte" {
  import type { Component } from "svelte";
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const component: Component<any>;
  export default component;
  // Allow type exports from Svelte components
  export * from "svelte";
}

/**
 * mdsvex type declarations
 * Allows importing .svx and .md files as Svelte components
 */

declare module "*.svx" {
  import type { SvelteComponent } from "svelte";
  export default class Comp extends SvelteComponent {}
  export const metadata: Record<string, unknown>;
}

declare module "*.md" {
  import type { SvelteComponent } from "svelte";
  export default class Comp extends SvelteComponent {}
  export const metadata: Record<string, unknown>;
}

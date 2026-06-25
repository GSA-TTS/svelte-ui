import type { HTMLAnchorAttributes } from "svelte/elements";
import type { Snippet } from "svelte";

/**
 * Link component props
 */
export interface LinkProps extends Omit<HTMLAnchorAttributes, "children"> {
  /**
   * Link variant
   * @default 'default'
   */
  variant?: "default" | "external";

  /**
   * Link content (can be a snippet or a string)
   */
  children?: Snippet | string;
}

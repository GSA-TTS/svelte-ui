import type { HTMLButtonAttributes } from "svelte/elements";
import type { Snippet } from "svelte";

/**
 * Button component props
 */
export interface ButtonProps extends Omit<HTMLButtonAttributes, "children"> {
  /**
   * Button variant
   * @default 'default'
   */
  variant?:
    | "default"
    | "secondary"
    | "accent-cool"
    | "accent-warm"
    | "base"
    | "outline"
    | "inverse"
    | "unstyled";

  /**
   * Button size
   * @default 'default'
   */
  size?: "default" | "big";

  /**
   * Button content (can be a snippet or a string)
   */
  children?: Snippet | string;
}

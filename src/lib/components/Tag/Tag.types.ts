import type { HTMLAttributes } from "svelte/elements";
import type { Snippet } from "svelte";

/**
 * Tag component props
 */
export interface TagProps extends Omit<
  HTMLAttributes<HTMLSpanElement>,
  "children"
> {
  /**
   * Tag size
   * @default 'default'
   */
  size?: "default" | "big";

  /**
   * Tag content (can be a snippet or a string)
   */
  children?: Snippet | string;
}

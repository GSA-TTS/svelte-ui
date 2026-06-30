import type { HTMLAttributes } from "svelte/elements";
import type { Snippet } from "svelte";

export interface TagProps extends Omit<
  HTMLAttributes<HTMLSpanElement>,
  "children"
> {
  size?: "default" | "big";
  children?: Snippet | string;
}

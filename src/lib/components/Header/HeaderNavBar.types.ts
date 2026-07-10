import type { HTMLAttributes } from "svelte/elements";
import type { Snippet } from "svelte";

export interface HeaderNavBarProps extends Omit<
  HTMLAttributes<HTMLDivElement>,
  "children"
> {
  children?: Snippet;
}

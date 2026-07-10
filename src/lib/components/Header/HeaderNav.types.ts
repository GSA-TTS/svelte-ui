import type { HTMLAttributes } from "svelte/elements";
import type { Snippet } from "svelte";

export interface HeaderNavProps extends Omit<
  HTMLAttributes<HTMLElement>,
  "children"
> {
  ariaLabel?: string;
  children?: Snippet;
}

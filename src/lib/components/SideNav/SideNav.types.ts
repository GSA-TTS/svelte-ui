import type { HTMLAttributes } from "svelte/elements";
import type { Snippet } from "svelte";

export interface SideNavProps extends Omit<
  HTMLAttributes<HTMLElement>,
  "children"
> {
  ariaLabel?: string;
  currentUrl?: string;
  children?: Snippet;
}

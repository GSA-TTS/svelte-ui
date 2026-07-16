import type { HTMLAnchorAttributes } from "svelte/elements";
import type { Snippet } from "svelte";

export interface SideNavItemProps extends Omit<
  HTMLAnchorAttributes,
  "children"
> {
  href: string;
  current?: boolean;
  label?: Snippet | string;
  children?: Snippet;
}

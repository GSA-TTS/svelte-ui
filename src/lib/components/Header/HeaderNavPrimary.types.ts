import type { HTMLAttributes } from "svelte/elements";
import type { Snippet } from "svelte";

export interface HeaderNavItemConfig {
  label: string;
  href?: string;
  current?: boolean;
  children?: HeaderNavItemConfig[];
}

export interface HeaderNavPrimaryProps extends Omit<
  HTMLAttributes<HTMLUListElement>,
  "children"
> {
  items?: HeaderNavItemConfig[];
  children?: Snippet;
}

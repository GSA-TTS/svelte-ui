import type { HTMLAttributes } from "svelte/elements";
import type { Snippet } from "svelte";
import type { HeaderNavItemChildConfig } from "./HeaderNavItem.types.js";

export interface HeaderNavItemConfig {
  label: string;
  href?: string;
  current?: boolean;
  children?: HeaderNavItemChildConfig[];
}

export interface HeaderNavPrimaryProps extends Omit<
  HTMLAttributes<HTMLUListElement>,
  "children"
> {
  items?: HeaderNavItemConfig[];
  children?: Snippet;
}

import type { HTMLAttributes } from "svelte/elements";
import type { Snippet } from "svelte";

export interface HeaderNavItemChildConfig {
  label: string;
  href: string;
}

export interface HeaderNavItemProps extends Omit<
  HTMLAttributes<HTMLLIElement>,
  "children"
> {
  label: string;
  href?: string;
  current?: boolean;
  itemChildren?: HeaderNavItemChildConfig[];
  children?: Snippet;
}

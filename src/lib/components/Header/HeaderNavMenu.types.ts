import type { HTMLButtonAttributes } from "svelte/elements";

export interface HeaderNavMenuProps extends Omit<
  HTMLButtonAttributes,
  "children"
> {
  variant?: "menu" | "close";
}

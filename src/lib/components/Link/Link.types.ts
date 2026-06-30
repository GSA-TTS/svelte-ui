import type { HTMLAnchorAttributes } from "svelte/elements";
import type { Snippet } from "svelte";

export interface LinkProps extends Omit<HTMLAnchorAttributes, "children"> {
  variant?: "default" | "external";
  children?: Snippet | string;
}

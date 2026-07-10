import type { HTMLAttributes } from "svelte/elements";
import type { Snippet } from "svelte";

export interface HeaderLogoProps extends Omit<
  HTMLAttributes<HTMLDivElement>,
  "children"
> {
  href?: string;
  title?: string;
  children?: Snippet | string;
}

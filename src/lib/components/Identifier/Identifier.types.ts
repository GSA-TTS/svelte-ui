import type { HTMLAttributes } from "svelte/elements";
import type { Snippet } from "svelte";

export interface IdentifierProps extends Omit<
  HTMLAttributes<HTMLDivElement>,
  "children"
> {
  children?: Snippet;
}

import type { HTMLAttributes } from "svelte/elements";
import type { Snippet } from "svelte";

export interface CardGroupProps extends Omit<
  HTMLAttributes<HTMLUListElement>,
  "children"
> {
  children?: Snippet;
}

import type { HTMLAttributes } from "svelte/elements";
import type { Snippet } from "svelte";

export interface AccordionItemProps extends Omit<
  HTMLAttributes<HTMLDivElement>,
  "children" | "id" | "title"
> {
  id: string;
  title: string | Snippet;
  expanded?: boolean;
  children?: Snippet | string;
}

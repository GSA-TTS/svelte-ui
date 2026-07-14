import type { HTMLAttributes } from "svelte/elements";
import type { Snippet } from "svelte";

export interface AccordionProps extends Omit<
  HTMLAttributes<HTMLDivElement>,
  "children"
> {
  bordered?: boolean;
  multiselectable?: boolean;
  children?: Snippet;
}

export type AccordionContextType = {
  toggle: (_itemId: string) => void;
  isExpanded: (_itemId: string) => boolean;
  setInitialExpanded: (_itemId: string) => void;
};

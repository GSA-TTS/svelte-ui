import type { HTMLInputAttributes } from "svelte/elements";

export interface RadioProps extends Omit<
  HTMLInputAttributes,
  "type" | "children"
> {
  tile?: boolean;
  helpText?: string;
  label: string;
  id: string;
}

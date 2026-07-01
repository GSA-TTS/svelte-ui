import type { HTMLSelectAttributes } from "svelte/elements";
import type { Snippet } from "svelte";

export interface SelectProps
  extends Omit<HTMLSelectAttributes, "children"> {
  error?: boolean;
  success?: boolean;
  helpText?: string;
  errorMessage?: string;
  label?: string;
  optional?: boolean;
  id: string;
  children?: Snippet;
}

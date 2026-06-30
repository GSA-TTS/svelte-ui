import type { HTMLTextareaAttributes } from "svelte/elements";

export interface TextareaProps extends Omit<
  HTMLTextareaAttributes,
  "children"
> {
  error?: boolean;
  success?: boolean;
  helpText?: string;
  errorMessage?: string;
  label?: string;
  optional?: boolean;
  id: string;
}

import type { HTMLInputAttributes } from "svelte/elements";

export interface TextInputProps extends Omit<HTMLInputAttributes, "children"> {
  error?: boolean;
  success?: boolean;
  width?: "2xs" | "xs" | "sm" | "small" | "md" | "medium" | "lg" | "xl" | "2xl";
  helpText?: string;
  errorMessage?: string;
  label?: string;
  optional?: boolean;
  id: string;
}

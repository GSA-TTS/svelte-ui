import type { HTMLButtonAttributes } from "svelte/elements";
import type { Snippet } from "svelte";

export interface ButtonProps extends Omit<HTMLButtonAttributes, "children"> {
  variant?:
    | "default"
    | "secondary"
    | "accent-cool"
    | "accent-warm"
    | "base"
    | "outline"
    | "inverse"
    | "unstyled";
  size?: "default" | "big";
  children?: Snippet | string;
}

import type { HTMLLiAttributes } from "svelte/elements";
import type { Snippet } from "svelte";

export interface CardProps extends Omit<HTMLLiAttributes, "children"> {
  variant?: "default" | "flag";
  headerFirst?: boolean;
  mediaRight?: boolean;
  header?: Snippet;
  media?: Snippet;
  body?: Snippet;
  footer?: Snippet;
}

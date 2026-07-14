import type { HTMLAttributes } from "svelte/elements";

export interface IdentifierUSAGovProps extends Omit<HTMLAttributes<HTMLElement>, "children"> {
  description?: string;
  linkText?: string;
  linkHref?: string;
  ariaLabel?: string;
  variant?: "default" | "external";
}

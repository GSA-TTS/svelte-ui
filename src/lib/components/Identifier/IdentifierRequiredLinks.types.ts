import type { HTMLAttributes } from "svelte/elements";

export interface RequiredLinkItem {
  text: string;
  href: string;
  variant?: "default" | "external";
}

export interface IdentifierRequiredLinksProps extends Omit<
  HTMLAttributes<HTMLElement>,
  "children"
> {
  links?: RequiredLinkItem[];
  ariaLabel?: string;
}

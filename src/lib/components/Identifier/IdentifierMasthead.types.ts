import type { HTMLAttributes } from "svelte/elements";
import type { Snippet } from "svelte";

export interface Agency {
  name: string;
  href: string;
}

export interface IdentifierMastheadProps extends Omit<
  HTMLAttributes<HTMLElement>,
  "children"
> {
  domain?: string;
  agencies?: Agency[];
  includeTaxpayerDisclaimer?: boolean;
  children?: Snippet;
}

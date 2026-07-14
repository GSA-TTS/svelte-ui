import type { HTMLAttributes } from "svelte/elements";
import type { Snippet } from "svelte";

export interface IdentifierProps extends Omit<
  HTMLAttributes<HTMLDivElement>,
  "children"
> {
  domain?: string;
  includeTaxpayerDisclaimer?: boolean;
  requiredLinksAriaLabel?: string;
  logos?: Snippet;
  agencyLinks?: Snippet;
  requiredLinks?: Snippet;
}

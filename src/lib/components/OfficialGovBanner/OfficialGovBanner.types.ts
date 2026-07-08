import type { HTMLAttributes } from "svelte/elements";

export interface OfficialGovBannerProps
  extends HTMLAttributes<HTMLElement> {
  variant?: "gov" | "mil" | "gov-es" | "mil-es";
  expanded?: boolean;
  ariaLabel?: string;
}

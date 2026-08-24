import type { HTMLAttributes } from "svelte/elements";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export interface BreadcrumbProps extends HTMLAttributes<HTMLElement> {
  items: BreadcrumbItem[];
  truncate?: boolean;
  ariaLabel?: string;
  withRDFa?: boolean;
}

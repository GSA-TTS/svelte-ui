import type { HTMLAttributes } from "svelte/elements";

export interface NavItem {
  id: string;
  label: string;
  level: "h2" | "h3" | "h4" | "h5" | "h6";
}

export interface InPageNavProps extends HTMLAttributes<HTMLElement> {
  contentSelector?: string;
  headingLevels?: string[];
  title?: string;
  scrollOffset?: number;
}

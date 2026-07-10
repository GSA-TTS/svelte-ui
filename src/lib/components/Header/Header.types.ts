import type { HTMLAttributes } from "svelte/elements";
import type { Snippet } from "svelte";

export interface HeaderProps extends HTMLAttributes<HTMLElement> {
  variant?: "basic" | "extended" | "megamenu";
  children?: Snippet;
}

export interface HeaderContextValue {
  mobileMenuOpen: boolean;
  toggleMobileMenu: () => void;
  closeMobileMenu: () => void;
  expandedNavItem: string | null;
  setExpandedNavItem: (label: string | null) => void;
}

import type { HTMLAttributes } from "svelte/elements";

export interface HeaderOverlayProps extends HTMLAttributes<HTMLDivElement> {
  onclick?: () => void;
}

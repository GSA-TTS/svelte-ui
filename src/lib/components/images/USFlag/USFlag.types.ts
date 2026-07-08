import type { HTMLAttributes } from "svelte/elements";

export interface USFlagProps extends HTMLAttributes<HTMLImageElement> {
  width?: number;
  height?: number;
  alt?: string;
}

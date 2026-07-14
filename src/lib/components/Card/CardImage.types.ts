import type { HTMLAttributes } from "svelte/elements";

export interface CardImageProps extends Omit<
  HTMLAttributes<HTMLDivElement>,
  "children"
> {
  src: string;
  alt: string;
  inset?: boolean;
  exdent?: boolean;
}

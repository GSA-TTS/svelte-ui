import type { SVGAttributes } from "svelte/elements";

export interface IconProps extends SVGAttributes<SVGSVGElement> {
  name: string;
  size?: 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
}

import type { HTMLAttributes } from 'svelte/elements';
import type { Snippet } from 'svelte';

export interface DocsLayoutProps extends HTMLAttributes<HTMLElement> {
  title?: string;
  description?: string;
  author?: string;
  date?: string;
  children?: Snippet;
}

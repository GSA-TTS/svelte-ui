<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements';
  import type { Snippet } from 'svelte';

  interface H1Props extends HTMLAttributes<HTMLHeadingElement> {
    children?: Snippet;
  }

  let { children, ...restProps }: H1Props = $props();
</script>

<h1 {...restProps}>
  {@render children?.()}
</h1>

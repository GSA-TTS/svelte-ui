<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements';
  import type { Snippet } from 'svelte';

  interface H2Props extends HTMLAttributes<HTMLHeadingElement> {
    children?: Snippet;
  }

  let { children, ...restProps }: H2Props = $props();
</script>

<h2 {...restProps}>
  {@render children?.()}
</h2>

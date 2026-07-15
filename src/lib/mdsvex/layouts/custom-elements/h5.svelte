<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements';
  import type { Snippet } from 'svelte';

  interface H5Props extends HTMLAttributes<HTMLHeadingElement> {
    children?: Snippet;
  }

  let { children, ...restProps }: H5Props = $props();
</script>

<h5 {...restProps}>
  {@render children?.()}
</h5>

<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements';
  import type { Snippet } from 'svelte';

  interface H6Props extends HTMLAttributes<HTMLHeadingElement> {
    children?: Snippet;
  }

  let { children, ...restProps }: H6Props = $props();
</script>

<h6 {...restProps}>
  {@render children?.()}
</h6>

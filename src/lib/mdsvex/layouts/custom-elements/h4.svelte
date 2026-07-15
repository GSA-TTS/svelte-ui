<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements';
  import type { Snippet } from 'svelte';

  interface H4Props extends HTMLAttributes<HTMLHeadingElement> {
    children?: Snippet;
  }

  let { children, ...restProps }: H4Props = $props();
</script>

<h4 {...restProps}>
  {@render children?.()}
</h4>

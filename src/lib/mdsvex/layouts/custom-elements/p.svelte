<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements';
  import type { Snippet } from 'svelte';

  interface ParagraphProps extends HTMLAttributes<HTMLParagraphElement> {
    children?: Snippet;
  }

  let { children, ...restProps }: ParagraphProps = $props();
</script>

<p {...restProps}>
  {@render children?.()}
</p>

<script lang="ts">
  import type { TagProps } from './Tag.types.js';

  let {
    size = 'default',
    class: className,
    children,
    ...restProps
  }: TagProps = $props();

  const classes = $derived.by(() => {
    const classList: string[] = ['usa-tag'];
    
    if (size === 'big') {
      classList.push('usa-tag--big');
    }
    
    if (className) {
      classList.push(String(className));
    }
    
    return classList.join(' ');
  });
</script>

<span
  class={classes}
  {...restProps}
>
  {#if typeof children === 'string'}
    {children}
  {:else if children}
    {@render children()}
  {/if}
</span>

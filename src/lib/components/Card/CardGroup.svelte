<script lang="ts">
  import type { CardGroupProps } from './CardGroup.types.js';

  let {
    class: className,
    children,
    ...restProps
  }: CardGroupProps = $props();

  const classes = $derived.by(() => {
    const classList: string[] = ['usa-card-group'];
    
    if (className) {
      classList.push(String(className));
    }
    
    return classList.join(' ');
  });
</script>

<ul class={classes} {...restProps}>
  {#if children}
    {@render children()}
  {/if}
</ul>

<script lang="ts">
  import type { HeaderNavBarProps } from './HeaderNavBar.types.js';

  let {
    class: className,
    children,
    ...restProps
  }: HeaderNavBarProps = $props();

  const classes = $derived.by(() => {
    const classList: string[] = ['usa-navbar'];
    
    if (className) {
      classList.push(String(className));
    }
    
    return classList.join(' ');
  });
</script>

<div class={classes} {...restProps}>
  {#if children}
    {@render children()}
  {/if}
</div>

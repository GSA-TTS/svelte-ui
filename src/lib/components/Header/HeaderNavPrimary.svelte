<script lang="ts">
  import type { HeaderNavPrimaryProps } from './HeaderNavPrimary.types.js';
  import HeaderNavItem from './HeaderNavItem.svelte';

  let {
    items,
    class: className,
    children,
    ...restProps
  }: HeaderNavPrimaryProps = $props();

  const classes = $derived.by(() => {
    const classList: string[] = ['usa-nav__primary', 'usa-accordion'];
    
    if (className) {
      classList.push(String(className));
    }
    
    return classList.join(' ');
  });
</script>

<ul class={classes} {...restProps}>
  {#if children}
    {@render children()}
  {:else if items}
    {#each items as item (item.label)}
      <HeaderNavItem
        label={item.label}
        href={item.href}
        current={item.current}
        itemChildren={item.children}
      />
    {/each}
  {/if}
</ul>

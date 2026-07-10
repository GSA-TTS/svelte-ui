<script lang="ts">
  import type { HeaderNavProps } from './HeaderNav.types.js';
  import { getContext } from 'svelte';
  import type { HeaderContextValue } from './Header.types.js';
  import HeaderNavMenu from './HeaderNavMenu.svelte';

  let {
    ariaLabel = 'Primary navigation',
    class: className,
    children,
    ...restProps
  }: HeaderNavProps = $props();

  const headerContext = getContext<HeaderContextValue>('header');

  const classes = $derived.by(() => {
    const classList: string[] = ['usa-nav'];
    
    if (headerContext?.mobileMenuOpen) {
      classList.push('is-visible');
    }
    
    if (className) {
      classList.push(String(className));
    }
    
    return classList.join(' ');
  });
</script>

<nav aria-label={ariaLabel} class={classes} {...restProps}>
  <HeaderNavMenu variant="close" />
  {#if children}
    {@render children()}
  {/if}
</nav>

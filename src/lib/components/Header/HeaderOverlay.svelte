<script lang="ts">
  import type { HeaderOverlayProps } from './HeaderOverlay.types.js';
  import { getContext } from 'svelte';
  import type { HeaderContextValue } from './Header.types.js';

  let {
    class: className,
    onclick,
    ...restProps
  }: HeaderOverlayProps = $props();

  const headerContext = getContext<HeaderContextValue>('header');

  const classes = $derived.by(() => {
    const classList: string[] = ['usa-overlay'];
    
    if (headerContext?.mobileMenuOpen) {
      classList.push('is-visible');
    }
    
    if (className) {
      classList.push(String(className));
    }
    
    return classList.join(' ');
  });

  function handleClick(event: MouseEvent) {
    if (headerContext) {
      headerContext.closeMobileMenu();
    }
    if (onclick) {
      onclick();
    }
  }
</script>

<div
  class={classes}
  onclick={handleClick}
  {...restProps}
></div>

<script lang="ts">
  import type { HeaderNavMenuProps } from './HeaderNavMenu.types.js';
  import { getContext } from 'svelte';
  import type { HeaderContextValue } from './Header.types.js';

  let {
    variant = 'menu',
    class: className,
    onclick,
    ...restProps
  }: HeaderNavMenuProps = $props();

  const headerContext = getContext<HeaderContextValue>('header');

  const classes = $derived.by(() => {
    const classList: string[] = [];
    
    if (variant === 'menu') {
      classList.push('usa-menu-btn');
    } else if (variant === 'close') {
      classList.push('usa-nav__close');
    }
    
    if (className) {
      classList.push(String(className));
    }
    
    return classList.join(' ');
  });

  function handleClick(event: MouseEvent) {
    if (headerContext) {
      if (variant === 'menu') {
        headerContext.toggleMobileMenu();
      } else if (variant === 'close') {
        headerContext.closeMobileMenu();
      }
    }
    if (onclick) {
      onclick(event);
    }
  }
</script>

{#if variant === 'menu'}
  <button
    type="button"
    class={classes}
    onclick={handleClick}
    {...restProps}
  >
    Menu
  </button>
{:else if variant === 'close'}
  <button
    type="button"
    class={classes}
    onclick={handleClick}
    {...restProps}
  >
    <img src="/assets/img/usa-icons/close.svg" alt="Close" />
  </button>
{/if}

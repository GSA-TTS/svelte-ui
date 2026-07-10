<script lang="ts">
  import type { HeaderProps, HeaderContextValue } from './Header.types.js';
  import { setContext } from 'svelte';
  import HeaderOverlay from './HeaderOverlay.svelte';

  let {
    variant = 'basic',
    class: className,
    children,
    ...restProps
  }: HeaderProps = $props();

  let mobileMenuOpen = $state(false);
  let expandedNavItem = $state<string | null>(null);

  const headerContext: HeaderContextValue = {
    get mobileMenuOpen() {
      return mobileMenuOpen;
    },
    toggleMobileMenu: () => {
      mobileMenuOpen = !mobileMenuOpen;
    },
    closeMobileMenu: () => {
      mobileMenuOpen = false;
    },
    get expandedNavItem() {
      return expandedNavItem;
    },
    setExpandedNavItem: (label: string | null) => {
      expandedNavItem = label;
    }
  };

  setContext('header', headerContext);

  const classes = $derived.by(() => {
    const classList: string[] = ['usa-header'];

    if (variant === 'basic') {
      classList.push('usa-header--basic');
    } else if (variant === 'extended') {
      classList.push('usa-header--extended');
    } else if (variant === 'megamenu') {
      classList.push('usa-header--megamenu');
    }

    if (className) {
      classList.push(String(className));
    }

    return classList.join(' ');
  });

  $effect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      expandedNavItem = null;
    }

    return () => {
      document.body.style.overflow = '';
    };
  });
</script>

<HeaderOverlay />

<header class={classes} {...restProps}>
  <div class="usa-nav-container">
    {#if children}
      {@render children()}
    {/if}
  </div>
</header>

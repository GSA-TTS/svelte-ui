<script lang="ts">
  import { setContext } from 'svelte';
  import type { SideNavProps } from './SideNav.types.js';

  let {
    ariaLabel = 'Side navigation',
    currentUrl,
    class: className,
    children,
    ...restProps
  }: SideNavProps = $props();

  setContext('sidenav-current-url', () => currentUrl);

  const classes = $derived.by(() => {
    const classList: string[] = [];

    if (className) {
      classList.push(String(className));
    }

    return classList.length > 0 ? classList.join(' ') : undefined;
  });
</script>

<nav
  aria-label={ariaLabel}
  class={classes}
  {...restProps}
>
  <ul class="usa-sidenav">
    {#if children}
      {@render children()}
    {/if}
  </ul>
</nav>

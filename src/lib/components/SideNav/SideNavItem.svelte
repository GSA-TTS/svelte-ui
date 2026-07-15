<script lang="ts">
  import { getContext } from 'svelte';
  import { isCurrentPage } from './SideNav.utils.js';
  import type { SideNavItemProps } from './SideNavItem.types.js';

  let {
    href,
    current,
    label,
    class: className,
    children,
    ...restProps
  }: SideNavItemProps = $props();

  const getCurrentUrl = getContext<
    (() => string | undefined) | undefined
  >('sidenav-current-url');

  const isActive = $derived.by(() => {
    if (current !== undefined) return current;

    const currentUrl = getCurrentUrl?.();
    if (currentUrl && href) {
      return isCurrentPage(href, currentUrl);
    }

    return false;
  });

  const linkClasses = $derived.by(() => {
    const classList: string[] = [];

    if (isActive) {
      classList.push('usa-current');
    }

    if (className) {
      classList.push(String(className));
    }

    return classList.length > 0 ? classList.join(' ') : undefined;
  });
</script>

<li class="usa-sidenav__item">
  <a {href} class={linkClasses} aria-current={isActive ? 'page' : undefined} {...restProps}>
    {#if typeof label === 'string'}
      {label}
    {:else if label}
      {@render label()}
    {/if}
  </a>

  {#if children}
    <ul class="usa-sidenav__sublist">
      {@render children()}
    </ul>
  {/if}
</li>

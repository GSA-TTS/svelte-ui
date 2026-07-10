<script lang="ts">
  import type { HeaderNavItemProps } from './HeaderNavItem.types.js';
  import { getContext, untrack } from 'svelte';
  import type { HeaderContextValue } from './Header.types.js';

  let {
    label,
    href,
    current = false,
    itemChildren,
    class: className,
    children,
    ...restProps
  }: HeaderNavItemProps = $props();

  const headerContext = getContext<HeaderContextValue>('header');

  let buttonElement: HTMLButtonElement | undefined = $state();
  let submenuElement: HTMLUListElement | undefined = $state();

  const hasDropdown = $derived(
    (itemChildren && itemChildren.length > 0) || children
  );

  const expanded = $derived(
    Boolean(hasDropdown && headerContext?.expandedNavItem === label)
  );
  $inspect(expanded, headerContext?.expandedNavItem)

  const classes = $derived.by(() => {
    const classList: string[] = ['usa-nav__primary-item'];

    if (className) {
      classList.push(String(className));
    }

    return classList.join(' ');
  });

  const linkClasses = $derived.by(() => {
    const classList: string[] = [];

    if (hasDropdown) {
      classList.push('usa-accordion__button', 'usa-nav__link');
      if (current) {
        classList.push('usa-current');
      }
    } else {
      classList.push('usa-nav-link');
    }

    return classList.join(' ');
  });

  const submenuId = $derived(
    `nav-submenu-${label.toLowerCase().replace(/\s+/g, '-')}`
  );

  function toggleDropdown() {
    console.log("toggleDropDown")
    if (headerContext) {
      if (expanded) {
        headerContext.setExpandedNavItem(null);
      } else {
        headerContext.setExpandedNavItem(label);
      }
    }
  }

  function handleKeydown(event: KeyboardEvent) {
    if (event.key === 'Escape' && expanded) {
      if (headerContext) {
        headerContext.setExpandedNavItem(null);
      }
      untrack(() => buttonElement)?.focus();
    }
  }

  function handleSimpleLinkClick() {
    if (headerContext) {
      headerContext.setExpandedNavItem(null);
    }
  }
</script>

<li class={classes} {...restProps}>
  {#if hasDropdown}
    <button
      bind:this={buttonElement}
      type="button"
      class={linkClasses}
      aria-expanded={expanded}
      aria-controls={submenuId}
      onclick={toggleDropdown}
      onkeydown={handleKeydown}
    >
      <span>{label}</span>
    </button>
    <ul
      bind:this={submenuElement}
      id={submenuId}
      class="usa-nav__submenu"
      style:display={expanded ? 'block' : 'none'}
    >
      {#if children}
        {@render children()}
      {:else if itemChildren}
        {#each itemChildren as child, index (`${child.label}-${index}`)}
          <li class="usa-nav__submenu-item">
            <a href={child.href}>
              <span>{child.label}</span>
            </a>
          </li>
        {/each}
      {/if}
    </ul>
  {:else}
    <a href={href} class={linkClasses} onclick={handleSimpleLinkClick}>
      <span>{label}</span>
    </a>
  {/if}
</li>

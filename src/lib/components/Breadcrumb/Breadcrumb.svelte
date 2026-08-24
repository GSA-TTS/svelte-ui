<script lang="ts">
  import type { BreadcrumbProps } from './Breadcrumb.types.js';
  import Link from '../Link/Link.svelte';

  let {
    items = [],
    truncate = false,
    ariaLabel = 'Breadcrumbs',
    withRDFa = false,
    class: className,
    ...restProps
  }: BreadcrumbProps = $props();

  const navClasses = $derived.by(() => {
    const classList: string[] = ['usa-breadcrumb'];
    
    if (truncate) {
      classList.push('usa-breadcrumb--truncate');
    }
    
    if (className) {
      classList.push(String(className));
    }
    
    return classList.join(' ');
  });

  const olProps = $derived(
    withRDFa
      ? {
          vocab: 'http://schema.org/',
          typeof: 'BreadcrumbList',
          class: 'usa-breadcrumb__list',
        }
      : { class: 'usa-breadcrumb__list' }
  );

  function getLiProps(_index: number) {
    if (!withRDFa) {
      return { class: 'usa-breadcrumb__list-item' };
    }
    return {
      property: 'itemListElement',
      typeof: 'ListItem',
      class: 'usa-breadcrumb__list-item',
    };
  }

  function getLinkProps(_index: number) {
    if (!withRDFa) {
      return { class: 'usa-breadcrumb__link' };
    }
    return {
      property: 'item',
      typeof: 'WebPage',
      class: 'usa-breadcrumb__link',
    };
  }
</script>

<nav class={navClasses} aria-label={ariaLabel} {...restProps}>
  <ol {...olProps}>
    {#each items as item, index (item.label + index)}
      {@const isLast = index === items.length - 1}
      {@const isCurrent = isLast || !item.href}
      <li
        {...getLiProps(index)}
        class:usa-current={isCurrent}
        aria-current={isCurrent ? 'page' : undefined}
      >
        {#if isCurrent}
          {#if withRDFa}
            <span property="name">{item.label}</span>
            <meta property="position" content={String(index + 1)} />
          {:else}
            <span>{item.label}</span>
          {/if}
        {:else}
          <Link href={item.href} {...getLinkProps(index)}>
            {#if withRDFa}
              <span property="name">{item.label}</span>
            {:else}
              <span>{item.label}</span>
            {/if}
          </Link>
          {#if withRDFa}
            <meta property="position" content={String(index + 1)} />
          {/if}
        {/if}
      </li>
    {/each}
  </ol>
</nav>

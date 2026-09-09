<script lang="ts">
  import type { HeaderSearchPlaceholderProps } from './HeaderSearchPlaceholder.types.js';
  import Icon from '../Icon/Icon.svelte';

  let {
    ariaLabel = 'Search component',
    class: className,
    children,
    ...restProps
  }: HeaderSearchPlaceholderProps = $props();

  const classes = $derived.by(() => {
    const classList: string[] = [];
    
    if (className) {
      classList.push(String(className));
    }
    
    return classList.join(' ');
  });
</script>

<section aria-label={ariaLabel} class={classes} {...restProps}>
  {#if children}
    {@render children()}
  {:else}
    <form class="usa-search usa-search--small" role="search">
      <label class="usa-sr-only" for="search-field">Search</label>
      <input
        class="usa-input"
        id="search-field"
        type="search"
        name="search"
      />
      <button class="usa-button" type="submit" aria-label="Search">
        <Icon name="search" class="usa-search__submit-icon" />
      </button>
    </form>
  {/if}
</section>

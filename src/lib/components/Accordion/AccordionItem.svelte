<script lang="ts">
  import { getContext, onMount } from 'svelte';
  import type { AccordionItemProps } from './AccordionItem.types';
  import type { AccordionContextType } from './Accordion.types';

  let {
    id,
    title,
    expanded = false,
    children,
    ...restProps
  }: AccordionItemProps = $props();

  const accordion = getContext<AccordionContextType>('accordion');

  onMount(() => {
    if (expanded) {
      accordion.setInitialExpanded(id);
    }
  });

  const isExpanded = $derived(accordion.isExpanded(id));

  function handleClick() {
    accordion.toggle(id);
  }
</script>

<h4 class="usa-accordion__heading">
  <button
    type="button"
    class="usa-accordion__button"
    aria-expanded={isExpanded}
    aria-controls={id}
    onclick={handleClick}
  >
    {#if typeof title === 'string'}
      {title}
    {:else}
      {@render title()}
    {/if}
  </button>
</h4>

<div
  {id}
  class="usa-accordion__content usa-prose"
  hidden={!isExpanded}
  {...restProps}
>
  {#if typeof children === 'string'}
    <p>{children}</p>
  {:else if children}
    {@render children()}
  {/if}
</div>

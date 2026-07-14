<script lang="ts">
  import { setContext } from 'svelte';
  import { SvelteSet } from 'svelte/reactivity';
  import type { AccordionProps } from './Accordion.types';

  let {
    bordered = false,
    multiselectable = false,
    class: className,
    children,
    ...restProps
  }: AccordionProps = $props();

  let expandedItems = new SvelteSet<string>();

  function toggle(id: string) {
    if (multiselectable) {
      if (expandedItems.has(id)) {
        expandedItems.delete(id);
      } else {
        expandedItems.add(id);
      }
    } else {
      if (expandedItems.has(id)) {
        expandedItems.clear();
      } else {
        expandedItems.clear();
        expandedItems.add(id);
      }
    }
  }

  function isExpanded(id: string): boolean {
    return expandedItems.has(id);
  }

  function setInitialExpanded(id: string) {
    expandedItems.add(id);
  }

  setContext('accordion', {
    toggle,
    isExpanded,
    setInitialExpanded
  });

  const classes = $derived.by(() => {
    const classList = ['usa-accordion'];
    if (bordered) classList.push('usa-accordion--bordered');
    if (multiselectable) classList.push('usa-accordion--multiselectable');
    if (className) classList.push(String(className));
    return classList.join(' ');
  });
</script>

<div class={classes} data-allow-multiple={multiselectable || undefined} {...restProps}>
  {@render children?.()}
</div>

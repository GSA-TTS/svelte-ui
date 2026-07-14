<script lang="ts">
  import type { IdentifierProps } from './Identifier.types.js';

  let {
    class: className,
    children,
    ...restProps
  }: IdentifierProps = $props();

  const classes = $derived.by(() => {
    const classList: string[] = ['usa-identifier'];
    
    if (className) {
      classList.push(String(className));
    }
    
    return classList.join(' ');
  });
</script>

<div class={classes} {...restProps}>
  {#if children}
    {@render children()}
  {/if}
</div>

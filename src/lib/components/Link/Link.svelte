<script lang="ts">
  import type { LinkProps } from './Link.types.js';

  let {
    variant = 'default',
    class: className,
    children,
    ...restProps
  }: LinkProps = $props();

  const classes = $derived.by(() => {
    const classList: string[] = ['usa-link'];
    
    if (variant === 'external') {
      classList.push('usa-link--external');
    }
    
    if (className) {
      classList.push(String(className));
    }
    
    return classList.join(' ');
  });

  const relAttr = $derived.by(() => {
    if (restProps.rel) {
      return restProps.rel;
    }
    
    if (variant === 'external') {
      if (restProps.target === '_blank') {
        return 'noreferrer noopener';
      }
      return 'noreferrer';
    }
    
    return undefined;
  });
</script>

<a
  class={classes}
  rel={relAttr}
  {...restProps}
>
  {#if typeof children === 'string'}
    {children}
  {:else if children}
    {@render children()}
  {/if}
</a>

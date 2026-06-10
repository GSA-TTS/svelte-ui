<script lang="ts">
  import type { ButtonProps } from './Button.types.js';

  let {
    variant = 'default',
    size = 'default',
    class: className,
    children,
    ...restProps
  }: ButtonProps = $props();

  const classes = $derived.by(() => {
    const classList: string[] = ['usa-button'];
    
    if (variant === 'secondary') {
      classList.push('usa-button--secondary');
    } else if (variant === 'accent-cool') {
      classList.push('usa-button--accent-cool');
    } else if (variant === 'accent-warm') {
      classList.push('usa-button--accent-warm');
    } else if (variant === 'base') {
      classList.push('usa-button--base');
    } else if (variant === 'outline') {
      classList.push('usa-button--outline');
    } else if (variant === 'inverse') {
      classList.push('usa-button--inverse');
    } else if (variant === 'unstyled') {
      classList.push('usa-button--unstyled');
    }
    
    if (size === 'big') {
      classList.push('usa-button--big');
    }
    
    if (className) {
      classList.push(String(className));
    }
    
    return classList.join(' ');
  });
</script>

<button
  class={classes}
  {...restProps}
>
  {#if typeof children === 'string'}
    {children}
  {:else if children}
    {@render children()}
  {/if}
</button>


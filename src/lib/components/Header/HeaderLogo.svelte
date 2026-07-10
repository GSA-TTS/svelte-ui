<script lang="ts">
  import type { HeaderLogoProps } from './HeaderLogo.types.js';

  let {
    href = '/',
    title = '',
    class: className,
    children,
    ...restProps
  }: HeaderLogoProps = $props();

  const classes = $derived.by(() => {
    const classList: string[] = ['usa-logo'];
    
    if (className) {
      classList.push(String(className));
    }
    
    return classList.join(' ');
  });
</script>

<div class={classes} {...restProps}>
  <em class="usa-logo__text">
    <a {href} {title}>
      {#if typeof children === 'string'}
        {children}
      {:else if children}
        {@render children()}
      {:else}
        {title}
      {/if}
    </a>
  </em>
</div>

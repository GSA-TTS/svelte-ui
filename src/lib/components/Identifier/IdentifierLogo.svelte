<script lang="ts">
  import type { IdentifierLogoProps } from './IdentifierLogo.types.js';

  let {
    src,
    alt,
    href = '',
    class: className,
    ...restProps
  }: IdentifierLogoProps = $props();

  const classes = $derived.by(() => {
    const classList: string[] = ['usa-identifier__logo'];
    
    if (className) {
      classList.push(String(className));
    }
    
    return classList.join(' ');
  });
</script>

<a {href} class={classes} {...restProps}>
  <img
    class="usa-identifier__logo-img"
    {src}
    {alt}
  />
</a>

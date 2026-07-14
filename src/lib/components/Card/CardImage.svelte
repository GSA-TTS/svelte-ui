<script lang="ts">
  import type { CardImageProps } from './CardImage.types.js';

  let {
    src,
    alt,
    inset = false,
    exdent = false,
    class: className,
    ...restProps
  }: CardImageProps = $props();

  const mediaClasses = $derived.by(() => {
    const classList: string[] = ['usa-card__media'];
    
    if (inset) {
      classList.push('usa-card__media--inset');
    }
    
    if (exdent) {
      classList.push('usa-card__media--exdent');
    }
    
    return classList.join(' ');
  });

  const imgClasses = $derived.by(() => {
    const classList: string[] = ['usa-card__img'];
    
    if (className) {
      classList.push(String(className));
    }
    
    return classList.join(' ');
  });
</script>

<div class={mediaClasses}>
  <div class={imgClasses} {...restProps}>
    <img {src} {alt} />
  </div>
</div>

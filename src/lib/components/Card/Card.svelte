<script lang="ts">
  import type { CardProps } from './Card.types.js';

  let {
    variant = 'default',
    headerFirst = false,
    mediaRight = false,
    class: className,
    header,
    media,
    body,
    footer,
    ...restProps
  }: CardProps = $props();

  const classes = $derived.by(() => {
    const classList: string[] = ['usa-card'];

    if (variant === 'flag') {
      classList.push('usa-card--flag');
    }

    if (headerFirst) {
      classList.push('usa-card--header-first');
    }

    if (mediaRight && variant === 'flag') {
      classList.push('usa-card--media-right');
    }

    if (className) {
      classList.push(String(className));
    }

    return classList.join(' ');
  });
</script>

<li class={classes} {...restProps}>
  <div class="usa-card__container">
    {#if header}
      <div class="usa-card__header">
        <h4 class="usa-card__heading">
          {@render header()}
        </h4>
      </div>
    {/if}
    {#if media}
      {@render media()}
    {/if}
    {#if body}
      <div class="usa-card__body">
        {@render body()}
      </div>
    {/if}
    {#if footer}
      <div class="usa-card__footer">
        {@render footer()}
      </div>
    {/if}
  </div>
</li>

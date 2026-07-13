<script lang="ts">
  /**
   * Icon component using USWDS icon sprite.
   *
   * @example
   * ```svelte
   * <Icon name="add" />
   * <Icon name="close" size={5} />
   * <Icon name="search" size={7} />
   * ```
   *
   * **Setup:** Copy the USWDS icon sprite to your application's public directory.
   *
   * **SvelteKit:**
   * ```bash
   * mkdir -p static/assets/img
   * cp node_modules/@gsa-tts/svelte-ui-uswds/src/lib/assets/img/uswds-icons.svg static/assets/img/
   * ```
   *
   * **Vite:**
   * ```bash
   * mkdir -p public/assets/img
   * cp node_modules/@gsa-tts/svelte-ui-uswds/src/lib/assets/img/uswds-icons.svg public/assets/img/
   * ```
   *
   * The component expects the sprite at `/assets/img/uswds-icons.svg` in your build output.
   *
   * **Available icons:** See [USWDS Icons](https://designsystem.digital.gov/components/icon/)
   * for the full list of 243 icon names.
   */
  import type { IconProps } from './Icon.types.js';

  let {
    name,
    size,
    class: className,
    ...restProps
  }: IconProps = $props();

  const classes = $derived.by(() => {
    const classList: string[] = ['usa-icon'];

    if (size) {
      classList.push(`usa-icon--size-${size}`);
    }

    if (className) {
      classList.push(String(className));
    }

    return classList.join(' ');
  });
</script>

<svg
  class={classes}
  aria-hidden="true"
  focusable="false"
  role="img"
  {...restProps}
>
  <use href="/assets/img/uswds-icons.svg#{name}"></use>
</svg>

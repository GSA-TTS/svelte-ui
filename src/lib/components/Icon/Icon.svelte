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
   * **Setup:** Ensure `/assets/uswds-icons.svg` is accessible in your application.
   * Copy `node_modules/@gsa-tts/svelte-ui-uswds/src/lib/assets/uswds-icons.svg`
   * to your public directory.
   *
   * **For SvelteKit projects:**
   * ```bash
   * cp node_modules/@gsa-tts/svelte-ui-uswds/src/lib/assets/uswds-icons.svg static/assets/
   * ```
   *
   * **For Vite projects:**
   * ```bash
   * cp node_modules/@gsa-tts/svelte-ui-uswds/src/lib/assets/uswds-icons.svg public/assets/
   * ```
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
  <use href="/assets/uswds-icons.svg#{name}"></use>
</svg>

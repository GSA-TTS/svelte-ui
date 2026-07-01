<script lang="ts">
  import type { RadioProps } from './Radio.types.js';

  let {
    tile = false,
    helpText,
    label,
    id,
    class: className,
    ...restProps
  }: RadioProps = $props();

  const inputClasses = $derived.by(() => {
    const classList: string[] = ['usa-radio__input'];

    if (tile) {
      classList.push('usa-radio__input--tile');
    }

    return classList.join(' ');
  });

  const wrapperClasses = $derived.by(() => {
    const classList: string[] = ['usa-radio'];

    if (className) {
      classList.push(String(className));
    }

    return classList.join(' ');
  });
</script>

<div class={wrapperClasses}>
  <input
    {id}
    class={inputClasses}
    type="radio"
    {...restProps}
  />
  <label class="usa-radio__label" for={id}>
    {label}
    {#if restProps.required}
      <span class="usa-hint usa-hint--required">*</span>
    {/if}
    {#if helpText}
      <span class="usa-radio__label-description">
        {helpText}
      </span>
    {/if}
  </label>
</div>

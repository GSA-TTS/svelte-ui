<script lang="ts">
  import type { CheckboxProps } from './Checkbox.types.js';

  let {
    tile = false,
    helpText,
    label,
    id,
    class: className,
    ...restProps
  }: CheckboxProps = $props();

  const inputClasses = $derived.by(() => {
    const classList: string[] = ['usa-checkbox__input'];

    if (tile) {
      classList.push('usa-checkbox__input--tile');
    }

    return classList.join(' ');
  });

  const wrapperClasses = $derived.by(() => {
    const classList: string[] = ['usa-checkbox'];

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
    type="checkbox"
    {...restProps}
  />
  <label class="usa-checkbox__label" for={id}>
    {label}
    {#if restProps.required}
      <span class="usa-hint usa-hint--required">*</span>
    {/if}
    {#if helpText}
      <span class="usa-checkbox__label-description">
        {helpText}
      </span>
    {/if}
  </label>
</div>

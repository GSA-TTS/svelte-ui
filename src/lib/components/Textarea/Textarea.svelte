<script lang="ts">
  import type { TextareaProps } from './Textarea.types.js';

  let {
    error = false,
    success = false,
    helpText,
    errorMessage,
    label,
    optional = false,
    id,
    class: className,
    ...restProps
  }: TextareaProps = $props();

  const classes = $derived.by(() => {
    const classList: string[] = ['usa-textarea'];

    if (error) {
      classList.push('usa-textarea--error');
    }

    if (success) {
      classList.push('usa-textarea--success');
    }

    if (className) {
      classList.push(String(className));
    }

    return classList.join(' ');
  });

  const ariaInvalid = $derived(error ? 'true' : undefined);

  const ariaDescribedBy = $derived.by(() => {
    const ids: string[] = [];
    if (errorMessage) {
      ids.push(`${id}-error`);
    }
    if (helpText) {
      ids.push(`${id}-hint`);
    }
    if (restProps['aria-describedby']) {
      ids.push(restProps['aria-describedby']);
    }
    return ids.length > 0 ? ids.join(' ') : undefined;
  });

  const labelClasses = $derived.by(() => {
    const classList: string[] = ['usa-label'];
    if (error) {
      classList.push('usa-label--error');
    }
    return classList.join(' ');
  });
</script>

{#if label}
  <label class={labelClasses} for={id}>
    {label}
    {#if restProps.required}
      <span class="usa-hint usa-hint--required">*</span>
    {:else if optional}
      <span class="usa-hint">(optional)</span>
    {/if}
  </label>
{/if}
{#if helpText}
  <div class="usa-hint" id="{id}-hint">
    {helpText}
  </div>
{/if}
<textarea
  {id}
  class={classes}
  aria-invalid={ariaInvalid}
  aria-describedby={ariaDescribedBy}
  {...restProps}
></textarea>
{#if errorMessage}
  <span class="usa-error-message" id="{id}-error">
    {errorMessage}
  </span>
{/if}

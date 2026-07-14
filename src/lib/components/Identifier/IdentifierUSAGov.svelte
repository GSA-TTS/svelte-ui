<script lang="ts">
  import type { IdentifierUSAGovProps } from './IdentifierUSAGov.types.js';
  import Link from '../Link/Link.svelte';

  let {
    description = 'Looking for U.S. government information and services?',
    linkText = 'Visit USA.gov',
    linkHref = 'https://www.usa.gov/',
    ariaLabel = 'U.S. government information and services',
    variant = 'external',
    class: className,
    ...restProps
  }: IdentifierUSAGovProps = $props();

  const sectionClasses = $derived.by(() => {
    const classList: string[] = ['usa-identifier__section', 'usa-identifier__section--usagov'];

    if (className) {
      classList.push(String(className));
    }

    return classList.join(' ');
  });
</script>

<section
  class={sectionClasses}
  aria-label={ariaLabel}
  {...restProps}
>
  <div class="usa-identifier__container">
    <div class="usa-identifier__usagov-description">
      {description}
    </div>
    <Link href={linkHref} {variant}>{linkText}</Link>
  </div>
</section>

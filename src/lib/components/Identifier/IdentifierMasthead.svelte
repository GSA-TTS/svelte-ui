<script lang="ts">
  import type { IdentifierMastheadProps } from './IdentifierMasthead.types.js';
  import Link from '../Link/Link.svelte';

  let {
    domain = 'domain.gov',
    agencies = [{ name: '<Parent agency>', href: '' }],
    includeTaxpayerDisclaimer = false,
    class: className,
    children,
    ...restProps
  }: IdentifierMastheadProps = $props();

  const sectionClasses = $derived.by(() => {
    const classList: string[] = ['usa-identifier__section', 'usa-identifier__section--masthead'];

    if (className) {
      classList.push(String(className));
    }

    return classList.join(' ');
  });
</script>

<section
  class={sectionClasses}
  aria-label='Agency identifier'
  {...restProps}
>
  <div class="usa-identifier__container">
    {#if children}
      <div class="usa-identifier__logos">
        {@render children()}
      </div>
    {/if}
    <section
      class="usa-identifier__identity"
      aria-label="Agency description"
    >
      <p class="usa-identifier__identity-domain">{domain}</p>
      <p class="usa-identifier__identity-disclaimer">
        An official website of the
        {#each agencies as agency, index (agency.name)}
          {#if index > 0}
            {index === agencies.length - 1 ? ' and the ' : ', '}
          {/if}
          <Link href={agency.href}>{agency.name}</Link>
        {/each}{#if includeTaxpayerDisclaimer}. Produced and published at taxpayer expense.{/if}
      </p>
    </section>
  </div>
</section>

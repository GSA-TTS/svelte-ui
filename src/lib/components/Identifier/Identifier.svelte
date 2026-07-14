<script lang="ts">
  import type { IdentifierProps } from './Identifier.types.js';
  import Link from '../Link/Link.svelte';

  let {
    domain = 'domain.gov',
    includeTaxpayerDisclaimer = false,
    requiredLinksAriaLabel = 'Important links',
    class: className,
    logos,
    agencyLinks,
    requiredLinks,
    ...restProps
  }: IdentifierProps = $props();

  const classes = $derived.by(() => {
    const classList: string[] = ['usa-identifier'];
    
    if (className) {
      classList.push(String(className));
    }
    
    return classList.join(' ');
  });
</script>

<div class={classes} {...restProps}>
  <section
    class="usa-identifier__section usa-identifier__section--masthead"
    aria-label='Agency identifier'
  >
    <div class="usa-identifier__container">
      {#if logos}
        <div class="usa-identifier__logos">
          {@render logos()}
        </div>
      {/if}
      <section
        class="usa-identifier__identity"
        aria-label="Agency description"
      >
        <p class="usa-identifier__identity-domain">{domain}</p>
        <p class="usa-identifier__identity-disclaimer">
          An official website of the
          {#if agencyLinks}
            {@render agencyLinks()}
          {/if}{#if includeTaxpayerDisclaimer}. Produced and published at taxpayer expense.{/if}
        </p>
      </section>
    </div>
  </section>
  {#if requiredLinks}
    <nav
      class="usa-identifier__section usa-identifier__section--required-links"
      aria-label={requiredLinksAriaLabel}
    >
      <div class="usa-identifier__container">
        <ul class="usa-identifier__required-links-list">
          {@render requiredLinks()}
        </ul>
      </div>
    </nav>
  {/if}
  <section
    class="usa-identifier__section usa-identifier__section--usagov"
    aria-label="U.S. government information and services"
  >
    <div class="usa-identifier__container">
      <div class="usa-identifier__usagov-description">
        Looking for U.S. government information and services?
      </div>
      <Link href="https://www.usa.gov/" variant="external">Visit USA.gov</Link>
    </div>
  </section>
</div>

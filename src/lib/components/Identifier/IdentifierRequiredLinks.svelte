<script lang="ts">
  import type { IdentifierRequiredLinksProps } from './IdentifierRequiredLinks.types.js';
  import Link from '../Link/Link.svelte';

  let {
    links = [
      { text: 'About <Parent shortname>', href: 'javascript:void(0)' },
      { text: 'Accessibility statement', href: '' },
      { text: 'FOIA requests', href: '' },
      { text: 'No FEAR Act data', href: '', variant: 'external' },
      { text: 'Office of the Inspector General', href: '' },
      { text: 'Performance reports', href: '' },
      { text: 'Privacy policy', href: '' },
    ],
    ariaLabel = 'Important links',
    class: className,
    ...restProps
  }: IdentifierRequiredLinksProps = $props();

  const navClasses = $derived.by(() => {
    const classList: string[] = ['usa-identifier__section', 'usa-identifier__section--required-links'];

    if (className) {
      classList.push(String(className));
    }

    return classList.join(' ');
  });
</script>

<nav
  class={navClasses}
  aria-label={ariaLabel}
  {...restProps}
>
  <div class="usa-identifier__container">
    <ul class="usa-identifier__required-links-list">
      {#each links as link (link.text)}
        <li class="usa-identifier__required-links-item">
          <Link
            href={link.href}
            variant={link.variant}
            class="usa-identifier__required-link"
          >
            {link.text}
          </Link>
        </li>
      {/each}
    </ul>
  </div>
</nav>

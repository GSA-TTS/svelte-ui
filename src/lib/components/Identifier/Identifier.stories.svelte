<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import { expect } from 'storybook/test';
  import Identifier from './Identifier.svelte';
  import IdentifierLogo from './IdentifierLogo.svelte';
  import IdentifierRequiredLinksItem from './IdentifierRequiredLinksItem.svelte';
  import Link from '../Link/Link.svelte';

  const { Story } = defineMeta({
    title: 'Components/Identifier',
    component: Identifier,
    tags: ['autodocs'],
    parameters: {
      a11y: {
        test: 'error',
      },
    },
  });
</script>

<Story
  name="Default"
  asChild
  play={async ({ canvasElement }) => {
    const masthead = canvasElement.querySelector('.usa-identifier__section--masthead');
    await expect(masthead).toBeInTheDocument();

    const requiredLinks = canvasElement.querySelector('.usa-identifier__section--required-links');
    await expect(requiredLinks).toBeInTheDocument();

    const usagov = canvasElement.querySelector('.usa-identifier__section--usagov');
    await expect(usagov).toBeInTheDocument();

    const logo = canvasElement.querySelector('.usa-identifier__logo-img');
    await expect(logo).toBeInTheDocument();

    const links = canvasElement.querySelectorAll('.usa-identifier__required-link');
    await expect(links.length).toBe(7);
  }}
>
  <Identifier>
    {#snippet logos()}
      <IdentifierLogo
        src="/assets/img/circle-gray-20.svg"
        alt="<Parent agency> logo"
      />
    {/snippet}
    {#snippet agencyLinks()}
      <Link href="">&lt;Parent agency&gt;</Link>
    {/snippet}
    {#snippet requiredLinks()}
      <IdentifierRequiredLinksItem href="javascript:void(0)">About &lt;Parent shortname&gt;</IdentifierRequiredLinksItem>
      <IdentifierRequiredLinksItem href="">Accessibility statement</IdentifierRequiredLinksItem>
      <IdentifierRequiredLinksItem href="">FOIA requests</IdentifierRequiredLinksItem>
      <IdentifierRequiredLinksItem href="">No FEAR Act data</IdentifierRequiredLinksItem>
      <IdentifierRequiredLinksItem href="">Office of the Inspector General</IdentifierRequiredLinksItem>
      <IdentifierRequiredLinksItem href="">Performance reports</IdentifierRequiredLinksItem>
      <IdentifierRequiredLinksItem href="">Privacy policy</IdentifierRequiredLinksItem>
    {/snippet}
  </Identifier>
</Story>

<Story
  name="Custom Agency"
  asChild
  play={async ({ canvasElement }) => {
    const domain = canvasElement.querySelector('.usa-identifier__identity-domain');
    await expect(domain?.textContent).toBe('example.gov');

    const disclaimer = canvasElement.querySelector('.usa-identifier__identity-disclaimer');
    await expect(disclaimer?.textContent).toContain('General Services Administration');

    const logo = canvasElement.querySelector('.usa-identifier__logo-img');
    await expect(logo?.getAttribute('alt')).toBe('GSA logo');
  }}
>
  <Identifier domain="example.gov">
    {#snippet logos()}
      <IdentifierLogo
        src="/assets/img/circle-gray-20.svg"
        alt="GSA logo"
        href="https://www.gsa.gov"
      />
    {/snippet}
    {#snippet agencyLinks()}
      <Link href="https://www.gsa.gov">General Services Administration</Link>
    {/snippet}
    {#snippet requiredLinks()}
      <IdentifierRequiredLinksItem href="javascript:void(0)">About &lt;Parent shortname&gt;</IdentifierRequiredLinksItem>
    {/snippet}
  </Identifier>
</Story>

<Story
  name="Custom Links"
  asChild
  play={async ({ canvasElement }) => {
    const links = canvasElement.querySelectorAll('.usa-identifier__required-link');
    await expect(links.length).toBe(3);
    await expect(links[0]?.textContent).toBe('Contact Us');
    await expect(links[1]?.textContent).toBe('Help');
    await expect(links[2]?.textContent).toBe('Terms of Service');
    await expect(links[1]?.className).toContain('usa-link--external');
  }}
>
  <Identifier>
    {#snippet logos()}
      <IdentifierLogo
        src="/assets/img/circle-gray-20.svg"
        alt="<Parent agency> logo"
      />
    {/snippet}
    {#snippet agencyLinks()}
      <Link href="">&lt;Parent agency&gt;</Link>
    {/snippet}
    {#snippet requiredLinks()}
      <IdentifierRequiredLinksItem href="javascript:void(0)">Contact Us</IdentifierRequiredLinksItem>
      <IdentifierRequiredLinksItem href="javascript:void(0)" variant="external">Help</IdentifierRequiredLinksItem>
      <IdentifierRequiredLinksItem href="javascript:void(0)">Terms of Service</IdentifierRequiredLinksItem>
    {/snippet}
  </Identifier>
</Story>

<Story
  name="No Logo"
  asChild
  play={async ({ canvasElement }) => {
    const logo = canvasElement.querySelector('.usa-identifier__logo');
    await expect(logo).not.toBeInTheDocument();

    const domain = canvasElement.querySelector('.usa-identifier__identity-domain');
    await expect(domain).toBeInTheDocument();
  }}
>
  <Identifier>
    {#snippet agencyLinks()}
      <Link href="">&lt;Parent agency&gt;</Link>
    {/snippet}
    {#snippet requiredLinks()}
      <IdentifierRequiredLinksItem href="javascript:void(0)">About &lt;Parent shortname&gt;</IdentifierRequiredLinksItem>
    {/snippet}
  </Identifier>
</Story>

<Story
  name="Multiple Logos"
  asChild
  play={async ({ canvasElement }) => {
    const logos = canvasElement.querySelectorAll('.usa-identifier__logo');
    await expect(logos.length).toBe(2);

    const disclaimer = canvasElement.querySelector('.usa-identifier__identity-disclaimer');
    await expect(disclaimer?.textContent).toContain('and the');
  }}
>
  <Identifier domain="domain.gov">
    {#snippet logos()}
      <IdentifierLogo
        src="/assets/img/circle-gray-20.svg"
        alt="<Parent agency> logo"
        href="javascript:void(0)"
      />
      <IdentifierLogo
        src="/assets/img/circle-gray-20.svg"
        alt="<Other agency> logo"
        href="javascript:void(0)"
      />
    {/snippet}
    {#snippet agencyLinks()}
      <Link href="">&lt;Parent agency&gt;</Link> and the <Link href="javascript:void(0)">&lt;Other agency&gt;</Link>
    {/snippet}
    {#snippet requiredLinks()}
      <IdentifierRequiredLinksItem href="javascript:void(0)">About &lt;Parent shortname&gt;</IdentifierRequiredLinksItem>
    {/snippet}
  </Identifier>
</Story>

<Story
  name="With Taxpayer Disclaimer"
  asChild
  play={async ({ canvasElement }) => {
    const disclaimer = canvasElement.querySelector('.usa-identifier__identity-disclaimer');
    await expect(disclaimer?.textContent).toContain('Produced and published at taxpayer expense');
  }}
>
  <Identifier includeTaxpayerDisclaimer={true}>
    {#snippet logos()}
      <IdentifierLogo
        src="/assets/img/circle-gray-20.svg"
        alt="<Parent agency> logo"
      />
    {/snippet}
    {#snippet agencyLinks()}
      <Link href="">&lt;Parent agency&gt;</Link>
    {/snippet}
    {#snippet requiredLinks()}
      <IdentifierRequiredLinksItem href="javascript:void(0)">About &lt;Parent shortname&gt;</IdentifierRequiredLinksItem>
    {/snippet}
  </Identifier>
</Story>

<Story
  name="With Custom Classes"
  asChild
  play={async ({ canvasElement }) => {
    const identifier = canvasElement.querySelector('.usa-identifier');
    await expect(identifier?.className).toContain('margin-top-2');
  }}
>
  <Identifier class="margin-top-2">
    {#snippet logos()}
      <IdentifierLogo
        src="/assets/img/circle-gray-20.svg"
        alt="<Parent agency> logo"
      />
    {/snippet}
    {#snippet agencyLinks()}
      <Link href="">&lt;Parent agency&gt;</Link>
    {/snippet}
    {#snippet requiredLinks()}
      <IdentifierRequiredLinksItem href="javascript:void(0)">About &lt;Parent shortname&gt;</IdentifierRequiredLinksItem>
    {/snippet}
  </Identifier>
</Story>

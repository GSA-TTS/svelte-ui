<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import { expect } from 'storybook/test';
  import Identifier from './Identifier.svelte';
  import IdentifierMasthead from './IdentifierMasthead.svelte';
  import IdentifierLogo from './IdentifierLogo.svelte';
  import IdentifierRequiredLinks from './IdentifierRequiredLinks.svelte';
  import IdentifierUSAGov from './IdentifierUSAGov.svelte';

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
    <IdentifierMasthead>
      <IdentifierLogo
        src="/assets/img/circle-gray-20.svg"
        alt="<Parent agency> logo"
      />
    </IdentifierMasthead>
    <IdentifierRequiredLinks />
    <IdentifierUSAGov />
  </Identifier>
</Story>

<Story
  name="With Placeholder Defaults"
  asChild
  play={async ({ canvasElement }) => {
    const domain = canvasElement.querySelector('.usa-identifier__identity-domain');
    await expect(domain?.textContent).toBe('domain.gov');

    const disclaimer = canvasElement.querySelector('.usa-identifier__identity-disclaimer');
    await expect(disclaimer?.textContent).toContain('<Parent agency>');

    const description = canvasElement.querySelector('.usa-identifier__usagov-description');
    await expect(description?.textContent).toContain('Looking for U.S. government information');
  }}
>
  <Identifier>
    <IdentifierMasthead />
    <IdentifierRequiredLinks />
    <IdentifierUSAGov />
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
  <Identifier>
    <IdentifierMasthead
      domain="example.gov"
      agencies={[{ name: 'General Services Administration', href: 'https://www.gsa.gov' }]}
    >
      <IdentifierLogo
        src="/assets/img/circle-gray-20.svg"
        alt="GSA logo"
        href="https://www.gsa.gov"
      />
    </IdentifierMasthead>
    <IdentifierRequiredLinks />
    <IdentifierUSAGov />
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
  }}
>
  <Identifier>
    <IdentifierMasthead>
      <IdentifierLogo
        src="/assets/img/circle-gray-20.svg"
        alt="<Parent agency> logo"
      />
    </IdentifierMasthead>
    <IdentifierRequiredLinks
      links={[
        { text: 'Contact Us', href: 'javascript:void(0)' },
        { text: 'Help', href: 'javascript:void(0)', variant: 'external' },
        { text: 'Terms of Service', href: 'javascript:void(0)' },
      ]}
    />
    <IdentifierUSAGov />
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
    <IdentifierMasthead />
    <IdentifierRequiredLinks />
    <IdentifierUSAGov />
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
  <Identifier>
    <IdentifierMasthead
      agencies={[
        { name: '<Parent agency>', href: '' },
        { name: '<Other agency>', href: 'javascript:void(0)' }
      ]}
      domain="domain.gov"
    >
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
    </IdentifierMasthead>
    <IdentifierRequiredLinks />
    <IdentifierUSAGov />
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
  <Identifier>
    <IdentifierMasthead includeTaxpayerDisclaimer={true}>
      <IdentifierLogo
        src="/assets/img/circle-gray-20.svg"
        alt="<Parent agency> logo"
      />
    </IdentifierMasthead>
    <IdentifierRequiredLinks />
    <IdentifierUSAGov />
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
    <IdentifierMasthead>
      <IdentifierLogo
        src="/assets/img/circle-gray-20.svg"
        alt="<Parent agency> logo"
      />
    </IdentifierMasthead>
    <IdentifierRequiredLinks />
    <IdentifierUSAGov />
  </Identifier>
</Story>

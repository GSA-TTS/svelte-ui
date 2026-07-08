<script lang="ts">
  import type { OfficialGovBannerProps } from './OfficialGovBanner.types.js';
  import Icon from '../Icon/Icon.svelte';
  import USFlag from '../images/USFlag/USFlag.svelte';
  import DotGovIcon from '../images/DotGovIcon/DotGovIcon.svelte';
  import HttpsIcon from '../images/HttpsIcon/HttpsIcon.svelte';

  let {
    variant = 'gov',
    expanded = false,
    ariaLabel,
    class: className,
    ...restProps
  }: OfficialGovBannerProps = $props();

  let isExpanded = $state(false);

  $effect(() => {
    isExpanded = expanded;
  });

  const toggleExpanded = () => {
    isExpanded = !isExpanded;
  };

  const contentId = $derived(`gov-banner-${variant}`);

  const finalAriaLabel = $derived(
    ariaLabel ||
    (variant === 'gov' || variant === 'mil'
      ? 'Official website of the United States government'
      : 'Un sitio oficial del Gobierno de Estados Unidos')
  );

  const classes = $derived.by(() => {
    const classList: string[] = ['usa-banner'];

    if (className) {
      classList.push(String(className));
    }

    return classList.join(' ');
  });
</script>

{#snippet iconLock()}
<span class="icon-lock">
  <svg xmlns="http://www.w3.org/2000/svg" width="52" height="64" viewBox="0 0 52 64" class="usa-banner__lock-image" role="img" aria-labelledby="banner-lock-description-default" focusable="false">
    <title id="banner-lock-title-default">Lock</title>
    <desc id="banner-lock-description-default">Locked padlock icon</desc>
    <path fill="#000000" fill-rule="evenodd" d="M26 0c10.493 0 19 8.507 19 19v9h3a4 4 0 0 1 4 4v28a4 4 0 0 1-4 4H4a4 4 0 0 1-4-4V32a4 4 0 0 1 4-4h3v-9C7 8.507 15.507 0 26 0zm0 8c-5.979 0-10.843 4.77-10.996 10.712L15 19v9h22v-9c0-6.075-4.925-11-11-11z"></path>
  </svg>
</span>
{/snippet}

{#snippet headerGov()}
  <header class="usa-banner__header">
    <div class="usa-banner__inner">
      <div class="grid-col-auto">
        <USFlag class="usa-banner__header-flag"/>
      </div>
      <div class="grid-col-fill tablet:grid-col-auto" aria-hidden="true">
        <p class="usa-banner__header-text">
          An official website of the United States government
        </p>
        <p class="usa-banner__header-action">Here's how you know</p>
      </div>
      <button
        type="button"
        class="usa-accordion__button usa-banner__button"
        aria-expanded={isExpanded}
        aria-controls={contentId}
        onclick={toggleExpanded}
      >
        <span class="usa-banner__button-text">Here's how you know</span>
      </button>
    </div>
  </header>
{/snippet}

{#snippet headerEs()}
  <header class="usa-banner__header">
    <div class="usa-banner__inner">
      <div class="grid-col-auto">
        <USFlag class="usa-banner__header-flag" alt='la bandera estadounidense'/>
      </div>
      <div class="grid-col-fill tablet:grid-col-auto" aria-hidden="true">
        <p class="usa-banner__header-text">
          Un sitio oficial del Gobierno de Estados Unidos
        </p>
        <p class="usa-banner__header-action">Así es como usted puede verificarlo</p>
      </div>
      <button
        type="button"
        class="usa-accordion__button usa-banner__button"
        aria-expanded={isExpanded}
        aria-controls={contentId}
        onclick={toggleExpanded}
      >
        <span class="usa-banner__button-text">Así es como usted puede verificarlo</span>
      </button>
    </div>
  </header>
{/snippet}

{#snippet contentGov()}
  <div class="grid-row grid-gap-lg">
    <div class="usa-banner__guidance tablet:grid-col-6">
      <DotGovIcon
        class="usa-banner__icon usa-media-block__img"
      />
      <div class="usa-media-block__body">
        <p>
          <strong>Official websites use .gov</strong><br />
          A <strong>.gov</strong> website belongs to an official government organization in the United States.
        </p>
      </div>
    </div>
    <div class="usa-banner__guidance tablet:grid-col-6">
      <HttpsIcon
        class="usa-banner__icon usa-media-block__img"
      />
      <div class="usa-media-block__body">
        <p>
          <strong>Secure .gov websites use HTTPS</strong><br />
          A <strong>lock</strong> ( {@render iconLock()} ) or <strong>https://</strong> means you've safely connected to the .gov website. Share sensitive information only on official, secure websites.
        </p>
      </div>
    </div>
  </div>
{/snippet}

{#snippet contentMil()}
  <div class="grid-row grid-gap-lg">
    <div class="usa-banner__guidance tablet:grid-col-6">
      <DotGovIcon
        class="usa-banner__icon usa-media-block__img"
      />
      <div class="usa-media-block__body">
        <p>
          <strong>Official websites use .mil</strong><br />
          A <strong>.mil</strong> website belongs to an official U.S. Department of Defense organization.
        </p>
      </div>
    </div>
    <div class="usa-banner__guidance tablet:grid-col-6">
      <HttpsIcon
        class="usa-banner__icon usa-media-block__img"
      />
      <div class="usa-media-block__body">
        <p>
          <strong>Secure .mil websites use HTTPS</strong><br />
          A <strong>lock</strong> ( {@render iconLock()} ) or <strong>https://</strong> means you've safely connected to the .mil website. Share sensitive information only on official, secure websites.
        </p>
      </div>
    </div>
  </div>
{/snippet}

{#snippet contentGovEs()}
  <div class="grid-row grid-gap-lg">
    <div class="usa-banner__guidance tablet:grid-col-6">
      <DotGovIcon
        class="usa-banner__icon usa-media-block__img"
      />
      <div class="usa-media-block__body">
        <p>
          <strong>Los sitios web oficiales usan .gov</strong><br />
          Un sitio web <strong>.gov</strong> pertenece a una organización oficial del Gobierno de Estados Unidos.
        </p>
      </div>
    </div>
    <div class="usa-banner__guidance tablet:grid-col-6">
      <HttpsIcon
        class="usa-banner__icon usa-media-block__img"
      />
      <div class="usa-media-block__body">
        <p>
          <strong>Los sitios web seguros .gov usan HTTPS</strong><br />
          Un <strong>candado</strong> ( {@render iconLock()} ) o <strong>https://</strong> significa que usted se conectó de forma segura a un sitio web .gov. Comparta información sensible sólo en sitios web oficiales y seguros.
        </p>
      </div>
    </div>
  </div>
{/snippet}

{#snippet contentMilEs()}
  <div class="grid-row grid-gap-lg">
    <div class="usa-banner__guidance tablet:grid-col-6">
      <DotGovIcon
        class="usa-banner__icon usa-media-block__img"
      />
      <div class="usa-media-block__body">
        <p>
          <strong>Los sitios web oficiales usan .mil</strong><br />
          Un sitio web <strong>.mil</strong> pertenece a una organización oficial del Departamento de Defensa de EE. UU.
        </p>
      </div>
    </div>
    <div class="usa-banner__guidance tablet:grid-col-6">
      <HttpsIcon
        class="usa-banner__icon usa-media-block__img"
      />
      <div class="usa-media-block__body">
        <p>
          <strong>Los sitios web seguros .mil usan HTTPS</strong><br />
          Un <strong>candado</strong> ( {@render iconLock()} ) o <strong>https://</strong> significa que usted se conectó de forma segura a un sitio web .mil. Comparta información sensible sólo en sitios web oficiales y seguros.
        </p>
      </div>
    </div>
  </div>
{/snippet}


<section
  class={classes}
  aria-label={finalAriaLabel}
  {...restProps}
>
  <div class="usa-accordion">
    {#if variant === 'gov' || variant === 'mil'}
      {@render headerGov()}
    {:else}
      {@render headerEs()}
    {/if}
    <div
      class="usa-banner__content usa-accordion__content"
      id={contentId}
      hidden={!isExpanded}
    >
      {#if variant === 'gov'}
        {@render contentGov()}
      {:else if variant === 'mil'}
        {@render contentMil()}
      {:else if variant === 'gov-es'}
        {@render contentGovEs()}
      {:else}
        {@render contentMilEs()}
      {/if}
    </div>
  </div>
</section>

<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import { expect } from 'storybook/test';
  import Card from './Card.svelte';
  import CardGroup from './CardGroup.svelte';
  import CardImage from './CardImage.svelte';
  import Button from '../Button/Button.svelte';

  const { Story } = defineMeta({
    title: 'Components/Card',
    component: Card,
    tags: ['autodocs'],
    parameters: {
      a11y: {
        test: 'error',
      },
    },
    argTypes: {
      variant: {
        control: 'select',
        options: ['default', 'flag'],
        description: 'Card layout variant (maps to USWDS card modifiers)',
        table: {
          defaultValue: { summary: 'default' },
        },
      },
      headerFirst: {
        control: 'boolean',
        description: 'Display header before media element',
        table: {
          defaultValue: { summary: 'false' },
        },
      },
      mediaRight: {
        control: 'boolean',
        description: 'Display media on the right (flag variant only)',
        table: {
          defaultValue: { summary: 'false' },
        },
      },
    },
  });
</script>

<Story
  name="Default Card"
  play={async ({ canvasElement }) => {
    const cards = canvasElement.querySelectorAll('.usa-card');
    await expect(cards.length).toBe(3);
    
    const firstCard = cards[0];
    await expect(firstCard?.className).toContain('usa-card');
  }}
>
  {#snippet template()}
    <CardGroup class="tablet-lg:grid-col">
      <Card class="tablet-lg:grid-col-4">
        {#snippet header()}
          Card 1
        {/snippet}
        {#snippet body()}
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis earum
            tenetur quo cupiditate, eaque qui officia recusandae.
          </p>
        {/snippet}
        {#snippet footer()}
          <Button>Visit Florida Keys</Button>
        {/snippet}
      </Card>

      <Card class="tablet-lg:grid-col-4">
        {#snippet header()}
          Card 2
        {/snippet}
        {#snippet body()}
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis earum
            tenetur quo cupiditate, eaque qui officia recusandae.
          </p>
        {/snippet}
        {#snippet footer()}
          <Button>Visit Florida Keys</Button>
        {/snippet}
      </Card>

      <Card class="tablet-lg:grid-col-4">
        {#snippet header()}
          Card 3
        {/snippet}
        {#snippet body()}
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis earum
            tenetur quo cupiditate, eaque qui officia recusandae.
          </p>
        {/snippet}
        {#snippet footer()}
          <Button>Visit Florida Keys</Button>
        {/snippet}
      </Card>
    </CardGroup>
  {/snippet}
</Story>

<Story
  name="Card with Media"
  play={async ({ canvasElement }) => {
    const cards = canvasElement.querySelectorAll('.usa-card');
    await expect(cards.length).toBe(2);
    
    const media = canvasElement.querySelector('.usa-card__media');
    await expect(media).toBeTruthy();
    
    const img = canvasElement.querySelector('.usa-card__img img');
    await expect(img).toBeTruthy();
    await expect(img?.getAttribute('src')).toBe('https://designsystem.digital.gov/img/introducing-uswds-2-0/built-to-grow--alt.jpg');
  }}
>
  {#snippet template()}
    <CardGroup class="tablet-lg:grid-col">
      <Card class="tablet-lg:grid-col-4">
        {#snippet header()}
          Card with Media
        {/snippet}
        {#snippet media()}
          <CardImage
            src="https://designsystem.digital.gov/img/introducing-uswds-2-0/built-to-grow--alt.jpg"
            alt="A placeholder image"
          />
        {/snippet}
        {#snippet body()}
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis earum
            tenetur quo cupiditate, eaque qui officia recusandae.
          </p>
        {/snippet}
        {#snippet footer()}
          <Button>Visit Florida Keys</Button>
        {/snippet}
      </Card>

      <Card class="tablet-lg:grid-col-4">
        {#snippet header()}
          Card with Media
        {/snippet}
        {#snippet media()}
          <CardImage
            src="https://designsystem.digital.gov/img/introducing-uswds-2-0/built-to-grow--alt.jpg"
            alt="A placeholder image"
          />
        {/snippet}
        {#snippet body()}
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis earum
            tenetur quo cupiditate, eaque qui officia recusandae.
          </p>
        {/snippet}
        {#snippet footer()}
          <Button>Visit Florida Keys</Button>
        {/snippet}
      </Card>
    </CardGroup>
  {/snippet}
</Story>

<Story
  name="Media with Header First"
  args={{ headerFirst: true }}
  play={async ({ canvasElement }) => {
    const cards = canvasElement.querySelectorAll('.usa-card');
    await expect(cards.length).toBe(3);

    const card = canvasElement.querySelector('.usa-card');
    await expect(card?.className).toContain('usa-card--header-first');

    const media = canvasElement.querySelector('.usa-card__media');
    await expect(media?.className).toContain('usa-card__media--exdent');
  }}
>
  {#snippet template(args)}
    <CardGroup class="tablet-lg:grid-col">
      <Card class="tablet-lg:grid-col-4" headerFirst={args.headerFirst}>
        {#snippet header()}
          Media with header first 1
        {/snippet}
        {#snippet media()}
          <CardImage
            src="https://designsystem.digital.gov/img/introducing-uswds-2-0/built-to-grow--alt.jpg"
            alt="A placeholder image"
            exdent={true}
          />
        {/snippet}
        {#snippet body()}
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore
            possimus similique nemo odit doloremque laudantium?
          </p>
        {/snippet}
        {#snippet footer()}
          <Button>Visit Florida Keys</Button>
        {/snippet}
      </Card>

      <Card class="tablet-lg:grid-col-4" headerFirst={args.headerFirst}>
        {#snippet header()}
          Media with header first 2
        {/snippet}
        {#snippet media()}
          <CardImage
            src="https://designsystem.digital.gov/img/introducing-uswds-2-0/built-to-grow--alt.jpg"
            alt="A placeholder image"
            exdent={true}
          />
        {/snippet}
        {#snippet body()}
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore
            possimus similique nemo odit doloremque laudantium?
          </p>
        {/snippet}
        {#snippet footer()}
          <Button>Visit Florida Keys</Button>
        {/snippet}
      </Card>

      <Card class="tablet-lg:grid-col-4" headerFirst={args.headerFirst}>
        {#snippet header()}
          Media with header first 3
        {/snippet}
        {#snippet media()}
          <CardImage
            src="https://designsystem.digital.gov/img/introducing-uswds-2-0/built-to-grow--alt.jpg"
            alt="A placeholder image"
            exdent={true}
          />
        {/snippet}
        {#snippet body()}
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore
            possimus similique nemo odit doloremque laudantium?
          </p>
        {/snippet}
        {#snippet footer()}
          <Button>Visit Florida Keys</Button>
        {/snippet}
      </Card>
    </CardGroup>
  {/snippet}
</Story>

<Story
  name="Inset Media"
  play={async ({ canvasElement }) => {
    const media = canvasElement.querySelector('.usa-card__media');
    await expect(media?.className).toContain('usa-card__media--inset');
  }}
>
  {#snippet template()}
    <CardGroup class="tablet-lg:grid-col">
      <Card class="tablet-lg:grid-col-4">
        {#snippet header()}
          Inset media
        {/snippet}
        {#snippet media()}
          <CardImage
            src="https://designsystem.digital.gov/img/introducing-uswds-2-0/built-to-grow--alt.jpg"
            alt="A placeholder image"
            inset={true}
          />
        {/snippet}
        {#snippet body()}
          <p>
            Etiam vitae sodales metus. Fusce id orci dignissim, efficitur risus
            eget, tempus odio. Donec lectus ante, auctor eget cursus sed,
            convallis quis magna. Orci varius natoque penatibus et magnis dis
            parturient montes, nascetur ridiculus mus. Mauris mattis tellus
            bibendum aliquet malesuada.
          </p>
        {/snippet}
        {#snippet footer()}
          <Button>Visit Florida Keys</Button>
        {/snippet}
      </Card>
    </CardGroup>
  {/snippet}
</Story>

<Story
  name="Exdent Media"
  play={async ({ canvasElement }) => {
    const media = canvasElement.querySelector('.usa-card__media');
    await expect(media?.className).toContain('usa-card__media--exdent');
  }}
>
  {#snippet template()}
    <CardGroup class="tablet-lg:grid-col">
      <Card class="tablet-lg:grid-col-4">
        {#snippet header()}
          Exdent media
        {/snippet}
        {#snippet media()}
          <CardImage
            src="https://designsystem.digital.gov/img/introducing-uswds-2-0/built-to-grow--alt.jpg"
            alt="A placeholder image"
            exdent={true}
          />
        {/snippet}
        {#snippet body()}
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore
            possimus similique nemo odit doloremque laudantium?
          </p>
        {/snippet}
        {#snippet footer()}
          <Button>Visit Florida Keys</Button>
        {/snippet}
      </Card>
    </CardGroup>
  {/snippet}
</Story>

<Story
  name="Flag Layout Default"
  args={{ variant: 'flag' }}
  play={async ({ canvasElement }) => {
    const card = canvasElement.querySelector('.usa-card');
    await expect(card?.className).toContain('usa-card--flag');
  }}
>
  {#snippet template()}
    <CardGroup>
      <Card variant="flag" class="flex-1">
        {#snippet header()}
          Default flag 1
        {/snippet}
        {#snippet media()}
          <CardImage
            src="https://designsystem.digital.gov/img/introducing-uswds-2-0/built-to-grow--alt.jpg"
            alt="A placeholder image"
          />
        {/snippet}
        {#snippet body()}
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
        {/snippet}
        {#snippet footer()}
          <Button>Visit Florida Keys</Button>
        {/snippet}
      </Card>
      <Card variant="flag" class="flex-1">
        {#snippet header()}
          Default flag 2
        {/snippet}
        {#snippet media()}
          <CardImage
            src="https://designsystem.digital.gov/img/introducing-uswds-2-0/built-to-grow--alt.jpg"
            alt="A placeholder image"
          />
        {/snippet}
        {#snippet body()}
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
        {/snippet}
        {#snippet footer()}
          <Button>Visit Florida Keys</Button>
        {/snippet}
      </Card>
    </CardGroup>
  {/snippet}
</Story>

<Story
  name="Flag Media Right"
  args={{ variant: 'flag', mediaRight: true }}
  play={async ({ canvasElement }) => {
    const card = canvasElement.querySelector('.usa-card');
    await expect(card?.className).toContain('usa-card--flag');
    await expect(card?.className).toContain('usa-card--media-right');
  }}
>
  {#snippet template()}
    <CardGroup>
      <Card variant="flag" mediaRight={true} class="flex-1">
        {#snippet header()}
          Flag media right 1
        {/snippet}
        {#snippet media()}
          <CardImage 
            src="https://designsystem.digital.gov/img/introducing-uswds-2-0/built-to-grow--alt.jpg"
            alt="A placeholder image"
          />
        {/snippet}
        {#snippet body()}
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
        {/snippet}
        {#snippet footer()}
          <Button>Visit Florida Keys</Button>
        {/snippet}
      </Card>
      
      <Card variant="flag" mediaRight={true} class="flex-1">
        {#snippet header()}
          Flag media right 2
        {/snippet}
        {#snippet media()}
          <CardImage 
            src="https://designsystem.digital.gov/img/introducing-uswds-2-0/built-to-grow--alt.jpg"
            alt="A placeholder image"
          />
        {/snippet}
        {#snippet body()}
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
        {/snippet}
        {#snippet footer()}
          <Button>Visit Florida Keys</Button>
        {/snippet}
      </Card>
    </CardGroup>
  {/snippet}
</Story>

<Story
  name="Flag Media Right Inset"
  args={{ variant: 'flag', mediaRight: true }}
  play={async ({ canvasElement }) => {
    const card = canvasElement.querySelector('.usa-card');
    await expect(card?.className).toContain('usa-card--flag');
    await expect(card?.className).toContain('usa-card--media-right');

    const media = canvasElement.querySelector('.usa-card__media');
    await expect(media?.className).toContain('usa-card__media--inset');
  }}
>
  {#snippet template()}
    <CardGroup>
      <Card variant="flag" mediaRight={true} class="flex-1">
        {#snippet header()}
          Flag media right inset 1
        {/snippet}
        {#snippet media()}
          <CardImage 
            src="https://designsystem.digital.gov/img/introducing-uswds-2-0/built-to-grow--alt.jpg"
            alt="A placeholder image"
            inset={true}
          />
        {/snippet}
        {#snippet body()}
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
        {/snippet}
        {#snippet footer()}
          <Button>Visit Florida Keys</Button>
        {/snippet}
      </Card>
      
      <Card variant="flag" mediaRight={true} class="flex-1">
        {#snippet header()}
          Flag media right inset 2
        {/snippet}
        {#snippet media()}
          <CardImage 
            src="https://designsystem.digital.gov/img/introducing-uswds-2-0/built-to-grow--alt.jpg"
            alt="A placeholder image"
            inset={true}
          />
        {/snippet}
        {#snippet body()}
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
        {/snippet}
        {#snippet footer()}
          <Button>Visit Florida Keys</Button>
        {/snippet}
      </Card>
    </CardGroup>
  {/snippet}
</Story>

<Story
  name="Multiple Cards in Group"
  play={async ({ canvasElement }) => {
    const cardGroup = canvasElement.querySelector('.usa-card-group');
    await expect(cardGroup).toBeTruthy();

    const cards = canvasElement.querySelectorAll('.usa-card');
    await expect(cards.length).toBe(3);
  }}
>
  {#snippet template()}
    <CardGroup class="tablet-lg:grid-col">
      <Card class="tablet-lg:grid-col-4">
        {#snippet header()}
          Card 1
        {/snippet}
        {#snippet body()}
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis earum
            tenetur quo cupiditate, eaque qui officia recusandae.
          </p>
        {/snippet}
        {#snippet footer()}
          <Button>Learn More</Button>
        {/snippet}
      </Card>

      <Card class="tablet-lg:grid-col-4">
        {#snippet header()}
          Card 2
        {/snippet}
        {#snippet media()}
          <CardImage
            src="https://designsystem.digital.gov/img/introducing-uswds-2-0/built-to-grow--alt.jpg"
            alt="A placeholder image"
          />
        {/snippet}
        {#snippet body()}
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis earum
            tenetur quo cupiditate, eaque qui officia recusandae.
          </p>
        {/snippet}
        {#snippet footer()}
          <Button>Learn More</Button>
        {/snippet}
      </Card>

      <Card class="tablet-lg:grid-col-4">
        {#snippet header()}
          Card 3
        {/snippet}
        {#snippet body()}
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis earum
            tenetur quo cupiditate, eaque qui officia recusandae.
          </p>
        {/snippet}
        {#snippet footer()}
          <Button>Learn More</Button>
        {/snippet}
      </Card>
    </CardGroup>
  {/snippet}
</Story>

<Story
  name="With Custom Classes"
  play={async ({ canvasElement }) => {
    const card = canvasElement.querySelector('.usa-card');
    await expect(card?.className).toContain('usa-card');
    await expect(card?.className).toContain('margin-top-2');
    await expect(card?.className).toContain('border-2px');
  }}
>
  {#snippet template()}
    <CardGroup class="tablet-lg:grid-col">
      <Card class="tablet-lg:grid-col-4 margin-top-2 border-2px">
        {#snippet header()}
          Custom Styled Card
        {/snippet}
        {#snippet body()}
          <p>
            This card has custom USWDS utility classes applied for margin and border.
          </p>
        {/snippet}
        {#snippet footer()}
          <Button>Visit Florida Keys</Button>
        {/snippet}
      </Card>
    </CardGroup>
  {/snippet}
</Story>

<Story
  name="Card Without Footer"
  play={async ({ canvasElement }) => {
    const footer = canvasElement.querySelector('.usa-card__footer');
    await expect(footer).toBeFalsy();

    const body = canvasElement.querySelector('.usa-card__body');
    await expect(body).toBeTruthy();
  }}
>
  {#snippet template()}
    <CardGroup class="tablet-lg:grid-col">
      <Card class="tablet-lg:grid-col-4">
        {#snippet header()}
          Card Without Footer
        {/snippet}
        {#snippet body()}
          <p>
            This card does not have a footer section. The footer snippet is optional.
          </p>
        {/snippet}
      </Card>
    </CardGroup>
  {/snippet}
</Story>

<Story
  name="Card Without Header"
  play={async ({ canvasElement }) => {
    const header = canvasElement.querySelector('.usa-card__header');
    await expect(header).toBeFalsy();

    const body = canvasElement.querySelector('.usa-card__body');
    await expect(body).toBeTruthy();
  }}
>
  {#snippet template()}
    <CardGroup class="tablet-lg:grid-col">
      <Card class="tablet-lg:grid-col-4">
        {#snippet media()}
          <CardImage
            src="https://designsystem.digital.gov/img/introducing-uswds-2-0/built-to-grow--alt.jpg"
            alt="A placeholder image"
          />
        {/snippet}
        {#snippet body()}
          <p>
            This card does not have a header. The header snippet is optional.
          </p>
        {/snippet}
        {#snippet footer()}
          <Button>Learn More</Button>
        {/snippet}
      </Card>
    </CardGroup>
  {/snippet}
</Story>

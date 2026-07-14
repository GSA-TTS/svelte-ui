<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import { expect, userEvent, within } from 'storybook/test';
  import Accordion from './Accordion.svelte';
  import AccordionItem from './AccordionItem.svelte';

  const { Story } = defineMeta({
    title: 'Components/Accordion',
    component: Accordion,
    tags: ['autodocs'],
    parameters: {
      a11y: {
        test: 'error',
      },
    },
    argTypes: {
      bordered: {
        control: 'boolean',
        description: 'Display borders around accordion',
        table: {
          defaultValue: { summary: 'false' },
        },
      },
      multiselectable: {
        control: 'boolean',
        description: 'Allow multiple items to be expanded simultaneously',
        table: {
          defaultValue: { summary: 'false' },
        },
      },
    },
  });
</script>

<style>
  :global(.custom-accordion .usa-accordion__button) {
    background-color: #fee4ce;
  }
  :global(.custom-accordion .usa-accordion__button:hover) {
    background-color: #fa9441;
  }
  :global(.custom-accordion .usa-accordion__button:focus) {
    outline: 3px solid #fa9441;
    outline-offset: 2px;
  }
  :global(.custom-accordion .usa-accordion__content) {
    border-left-color: #fee4ce;
    border-right-color: #fee4ce;
    border-bottom-color: #fee4ce;
  }

</style>

<Story
  name="Default"
  asChild
  play={async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const accordion = canvasElement.querySelector('.usa-accordion');
    await expect(accordion).toBeInTheDocument();

    const buttons = canvas.getAllByRole('button');
    await expect(buttons).toHaveLength(5);

    const button1 = buttons[0];
    await expect(button1).toHaveAttribute('aria-expanded', 'false');
    await expect(button1).toHaveAttribute('aria-controls', 'first-amendment');

    await userEvent.click(button1);
    await expect(button1).toHaveAttribute('aria-expanded', 'true');
    const content1 = canvasElement.querySelector('#first-amendment');
    await expect(content1).not.toHaveAttribute('hidden');

    await userEvent.click(buttons[1]);
    await expect(button1).toHaveAttribute('aria-expanded', 'false');
    await expect(content1).toHaveAttribute('hidden');
    const content2 = canvasElement.querySelector('#second-amendment');
    await expect(content2).not.toHaveAttribute('hidden');
  }}
>
  <Accordion>
    <AccordionItem id="first-amendment" title="First Amendment">
      Congress shall make no law respecting an establishment of religion, or prohibiting the free exercise thereof; or abridging the freedom of speech, or of the press; or the right of the people peaceably to assemble, and to petition the Government for a redress of grievances.
    </AccordionItem>
    <AccordionItem id="second-amendment" title="Second Amendment">
      A well regulated Militia, being necessary to the security of a free State, the right of the people to keep and bear Arms, shall not be infringed.
    </AccordionItem>
    <AccordionItem id="third-amendment" title="Third Amendment">
      No Soldier shall, in time of peace be quartered in any house, without the consent of the Owner, nor in time of war, but in a manner to be prescribed by law.
    </AccordionItem>
    <AccordionItem id="fourth-amendment" title="Fourth Amendment">
      The right of the people to be secure in their persons, houses, papers, and effects, against unreasonable searches and seizures, shall not be violated, and no Warrants shall issue, but upon probable cause, supported by Oath or affirmation, and particularly describing the place to be searched, and the persons or things to be seized.
    </AccordionItem>
    <AccordionItem id="fifth-amendment" title="Fifth Amendment">
      No person shall be held to answer for a capital, or otherwise infamous crime, unless on a presentment or indictment of a Grand Jury, except in cases arising in the land or naval forces, or in the Militia, when in actual service in time of War or public danger; nor shall any person be subject for the same offence to be twice put in jeopardy of life or limb; nor shall be compelled in any criminal case to be a witness against himself, nor be deprived of life, liberty, or property, without due process of law; nor shall private property be taken for public use, without just compensation.
    </AccordionItem>
  </Accordion>
</Story>

<Story
  name="Bordered"
  asChild
  play={async ({ canvasElement }) => {
    const accordion = canvasElement.querySelector('.usa-accordion');
    await expect(accordion).toBeInTheDocument();
    await expect(accordion?.className).toContain('usa-accordion--bordered');
  }}
>
  <Accordion bordered>
    <AccordionItem id="b-first-amendment" title="First Amendment">
      Congress shall make no law respecting an establishment of religion, or prohibiting the free exercise thereof; or abridging the freedom of speech, or of the press; or the right of the people peaceably to assemble, and to petition the Government for a redress of grievances.
    </AccordionItem>
    <AccordionItem id="b-second-amendment" title="Second Amendment">
      A well regulated Militia, being necessary to the security of a free State, the right of the people to keep and bear Arms, shall not be infringed.
    </AccordionItem>
    <AccordionItem id="b-third-amendment" title="Third Amendment">
      No Soldier shall, in time of peace be quartered in any house, without the consent of the Owner, nor in time of war, but in a manner to be prescribed by law.
    </AccordionItem>
  </Accordion>
</Story>

<Story
  name="Multiselectable"
  asChild
  play={async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const accordion = canvasElement.querySelector('.usa-accordion');
    await expect(accordion).toBeInTheDocument();
    await expect(accordion?.className).toContain('usa-accordion--multiselectable');
    await expect(accordion).toHaveAttribute('data-allow-multiple');

    const buttons = canvas.getAllByRole('button');

    await userEvent.click(buttons[0]);
    await userEvent.click(buttons[1]);

    const content1 = canvasElement.querySelector('#m-first-amendment');
    const content2 = canvasElement.querySelector('#m-second-amendment');
    await expect(content1).not.toHaveAttribute('hidden');
    await expect(content2).not.toHaveAttribute('hidden');
  }}
>
  <Accordion multiselectable>
    <AccordionItem id="m-first-amendment" title="First Amendment">
      Congress shall make no law respecting an establishment of religion, or prohibiting the free exercise thereof; or abridging the freedom of speech, or of the press; or the right of the people peaceably to assemble, and to petition the Government for a redress of grievances.
    </AccordionItem>
    <AccordionItem id="m-second-amendment" title="Second Amendment">
      A well regulated Militia, being necessary to the security of a free State, the right of the people to keep and bear Arms, shall not be infringed.
    </AccordionItem>
    <AccordionItem id="m-third-amendment" title="Third Amendment">
      No Soldier shall, in time of peace be quartered in any house, without the consent of the Owner, nor in time of war, but in a manner to be prescribed by law.
    </AccordionItem>
  </Accordion>
</Story>

<Story
  name="Default Open"
  asChild
  play={async ({ canvasElement }) => {
    const content1 = canvasElement.querySelector('#d-first-amendment');
    await expect(content1).not.toHaveAttribute('hidden');

    const button1 = canvasElement.querySelector('[aria-controls="d-first-amendment"]');
    await expect(button1).toHaveAttribute('aria-expanded', 'true');

    if (button1) {
      await userEvent.click(button1);
      await expect(button1).toHaveAttribute('aria-expanded', 'false');
    }
    await expect(content1).toHaveAttribute('hidden');
  }}
>
  <Accordion>
    <AccordionItem id="d-first-amendment" title="First Amendment" expanded>
      Congress shall make no law respecting an establishment of religion, or prohibiting the free exercise thereof; or abridging the freedom of speech, or of the press; or the right of the people peaceably to assemble, and to petition the Government for a redress of grievances.
    </AccordionItem>
    <AccordionItem id="d-second-amendment" title="Second Amendment">
      A well regulated Militia, being necessary to the security of a free State, the right of the people to keep and bear Arms, shall not be infringed.
    </AccordionItem>
    <AccordionItem id="d-third-amendment" title="Third Amendment">
      No Soldier shall, in time of peace be quartered in any house, without the consent of the Owner, nor in time of war, but in a manner to be prescribed by law.
    </AccordionItem>
  </Accordion>
</Story>

<Story
  name="Keyboard Navigation"
  asChild
  play={async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const buttons = canvas.getAllByRole('button');

    await userEvent.tab();
    await expect(buttons[0]).toHaveFocus();

    await userEvent.keyboard('{Enter}');
    const content1 = canvasElement.querySelector('#k-first-amendment');
    await expect(content1).not.toHaveAttribute('hidden');

    await userEvent.tab();
    await expect(buttons[1]).toHaveFocus();

    await userEvent.keyboard('{Enter}');
    await expect(content1).toHaveAttribute('hidden');
    const content2 = canvasElement.querySelector('#k-second-amendment');
    await expect(content2).not.toHaveAttribute('hidden');
  }}
>
  <Accordion>
    <AccordionItem id="k-first-amendment" title="First Amendment">
      Congress shall make no law respecting an establishment of religion, or prohibiting the free exercise thereof; or abridging the freedom of speech, or of the press; or the right of the people peaceably to assemble, and to petition the Government for a redress of grievances.
    </AccordionItem>
    <AccordionItem id="k-second-amendment" title="Second Amendment">
      A well regulated Militia, being necessary to the security of a free State, the right of the people to keep and bear Arms, shall not be infringed.
    </AccordionItem>
  </Accordion>
</Story>

<Story
  name="With Custom Classes"
  asChild
  parameters={{
    docs: {
      description: {
        story: `
This example demonstrates how to customize accordion button styles using CSS.
The \`.custom-accordion\` class is defined in the story file and targets the accordion buttons:

\`\`\`css
:global(.custom-accordion .usa-accordion__button) {
  background-color: #fee4ce;
}
:global(.custom-accordion .usa-accordion__button:hover) {
  background-color: #fa9441;
}
:global(.custom-accordion .usa-accordion__button:focus) {
  outline: 3px solid #fa9441;
  outline-offset: 2px;
}
:global(.custom-accordion .usa-accordion__content) {
  border-left-color: #fee4ce;
  border-right-color: #fee4ce;
  border-bottom-color: #fee4ce;
}
\`\`\`

Apply the custom class to the Accordion component:

\`\`\`svelte
<Accordion bordered class="custom-accordion">
  <AccordionItem id="..." title="...">
    Content
  </AccordionItem>
</Accordion>
\`\`\`
        `,
      },
    },
  }}
  play={async ({ canvasElement }) => {
    const accordion = canvasElement.querySelector('.usa-accordion');
    await expect(accordion).toBeInTheDocument();
    await expect(accordion?.className).toContain('usa-accordion--bordered');
    await expect(accordion?.className).toContain('custom-accordion');
  }}
>
  <Accordion bordered class="custom-accordion">
    <AccordionItem
      id="c-first-amendment"
      title="First Amendment"
    >
      Congress shall make no law respecting an establishment of religion, or prohibiting the free exercise thereof; or abridging the freedom of speech, or of the press; or the right of the people peaceably to assemble, and to petition the Government for a redress of grievances.
    </AccordionItem>
    <AccordionItem id="c-second-amendment" title="Second Amendment">
      A well regulated Militia, being necessary to the security of a free State, the right of the people to keep and bear Arms, shall not be infringed.
    </AccordionItem>
  </Accordion>
</Story>

<Story
  name="With Complex Content"
  asChild
  play={async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button');

    await userEvent.click(button);

    const content = canvasElement.querySelector('#complex-content');
    await expect(content).not.toHaveAttribute('hidden');

    const list = content?.querySelector('ul');
    await expect(list).toBeInTheDocument();

    const listItems = content?.querySelectorAll('li');
    await expect(listItems).toHaveLength(2);
  }}
>
  <Accordion>
    <AccordionItem id="complex-content" title="Second Amendment">
      <p>A well regulated Militia, being necessary to the security of a free State, the right of the people to keep and bear Arms, shall not be infringed.</p>
      <ul>
        <li>This is a list item</li>
        <li>Another list item</li>
      </ul>
    </AccordionItem>
  </Accordion>
</Story>

<Story
  name="Single Item"
  asChild
  play={async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const buttons = canvas.getAllByRole('button');
    await expect(buttons).toHaveLength(1);

    await userEvent.click(buttons[0]);
    const content = canvasElement.querySelector('#single-item');
    await expect(content).not.toHaveAttribute('hidden');
  }}
>
  <Accordion>
    <AccordionItem id="single-item" title="Only Amendment">
      This is the only accordion item in this example.
    </AccordionItem>
  </Accordion>
</Story>

<Story
  name="Bordered Multiselectable"
  asChild
  play={async ({ canvasElement }) => {
    const accordion = canvasElement.querySelector('.usa-accordion');
    await expect(accordion).toBeInTheDocument();
    await expect(accordion?.className).toContain('usa-accordion--bordered');
    await expect(accordion?.className).toContain('usa-accordion--multiselectable');
  }}
>
  <Accordion bordered multiselectable>
    <AccordionItem id="bm-first" title="First Amendment">
      Congress shall make no law respecting an establishment of religion, or prohibiting the free exercise thereof; or abridging the freedom of speech, or of the press; or the right of the people peaceably to assemble, and to petition the Government for a redress of grievances.
    </AccordionItem>
    <AccordionItem id="bm-second" title="Second Amendment">
      A well regulated Militia, being necessary to the security of a free State, the right of the people to keep and bear Arms, shall not be infringed.
    </AccordionItem>
  </Accordion>
</Story>

<Story
  name="Multiple Default Open"
  asChild
  play={async ({ canvasElement }) => {
    const content1 = canvasElement.querySelector('#mdo-first');
    const content2 = canvasElement.querySelector('#mdo-second');
    await expect(content1).not.toHaveAttribute('hidden');
    await expect(content2).not.toHaveAttribute('hidden');
  }}
>
  <Accordion multiselectable>
    <AccordionItem id="mdo-first" title="First Amendment" expanded>
      Congress shall make no law respecting an establishment of religion, or prohibiting the free exercise thereof; or abridging the freedom of speech, or of the press; or the right of the people peaceably to assemble, and to petition the Government for a redress of grievances.
    </AccordionItem>
    <AccordionItem id="mdo-second" title="Second Amendment" expanded>
      A well regulated Militia, being necessary to the security of a free State, the right of the people to keep and bear Arms, shall not be infringed.
    </AccordionItem>
    <AccordionItem id="mdo-third" title="Third Amendment">
      No Soldier shall, in time of peace be quartered in any house, without the consent of the Owner, nor in time of war, but in a manner to be prescribed by law.
    </AccordionItem>
  </Accordion>
</Story>

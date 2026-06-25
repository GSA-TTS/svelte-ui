<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import { expect, within } from 'storybook/test';
  import Tag from './Tag.svelte';
  import { tagsnippet } from './TagSnippet.example.svelte';

  const { Story } = defineMeta({
    title: 'Components/Tag',
    component: Tag,
    tags: ['autodocs'],
    parameters: {
      a11y: {
        test: 'error',
      },
    },
    argTypes: {
      size: {
        control: 'select',
        options: ['default', 'big'],
        description: 'Tag size (maps to USWDS tag sizes)',
        table: {
          defaultValue: { summary: 'default' },
        },
      },
    },
  });
</script>

<Story
  name="Default"
  args={{ children: 'Info' }}
  play={async ({ canvasElement }) => {
    const tag = canvasElement.querySelector('.usa-tag');

    await expect(tag).toBeInTheDocument();
    await expect(tag?.textContent).toBe('Info');
    await expect(tag?.className).toContain('usa-tag');
    await expect(tag?.tagName).toBe('SPAN');

    const canvas = within(canvasElement);
    const buttons = canvas.queryAllByRole('button');
    await expect(buttons).toHaveLength(0);
  }}
/>

<Story
  name="Big"
  args={{ size: 'big', children: 'Big Tag' }}
  play={async ({ canvasElement }) => {
    const tag = canvasElement.querySelector('.usa-tag');

    await expect(tag?.className).toContain('usa-tag--big');
    await expect(tag?.textContent).toBe('Big Tag');
  }}
/>

<Story
  name="With Custom Classes"
  args={{
    children: 'Custom Styled',
    class: 'bg-primary-vivid text-white margin-right-1',
  }}
  play={async ({ canvasElement }) => {
    const tag = canvasElement.querySelector('.usa-tag');

    await expect(tag?.className).toContain('usa-tag');
    await expect(tag?.className).toContain('bg-primary-vivid');
    await expect(tag?.className).toContain('text-white');
    await expect(tag?.className).toContain('margin-right-1');
  }}
/>

<Story
  name="Multiple Tags Inline"
  play={async ({ canvasElement }) => {
    const tags = canvasElement.querySelectorAll('.usa-tag');
    await expect(tags).toHaveLength(3);
    await expect(tags[0]?.textContent).toBe('New');
    await expect(tags[1]?.textContent).toBe('Featured');
    await expect(tags[2]?.textContent).toBe('Popular');
  }}
  asChild
>
  <div>
    <Tag children="New" />
    <Tag children="Featured" />
    <Tag children="Popular" />
  </div>
</Story>

<Story
  name="In Sentence Context"
  play={async ({ canvasElement }) => {
    const paragraph = canvasElement.querySelector('p');
    await expect(paragraph).toBeInTheDocument();
    await expect(paragraph?.textContent).toBe('This article is marked as new content');
    
    const tag = canvasElement.querySelector('.usa-tag');
    await expect(tag).toBeInTheDocument();
    await expect(tag?.textContent).toBe('New');
  }}
  asChild
>
  <div>
    <p>This article is marked as new content</p>
    <Tag children="New" />
  </div>
</Story>

<Story name="With Snippet Children" args={{ children: tagsnippet }} />

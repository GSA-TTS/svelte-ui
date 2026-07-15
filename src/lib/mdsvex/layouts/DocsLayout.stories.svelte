<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import { expect, within } from 'storybook/test';
  import DocsLayout from './DocsLayout.svelte';

  const { Story } = defineMeta({
    title: 'mdsvex/DocsLayout',
    component: DocsLayout,
    tags: ['autodocs'],
    parameters: {
      a11y: {
        test: 'error',
      },
    },
    argTypes: {
      title: {
        control: 'text',
        description: 'Document title from frontmatter',
        table: {
          category: 'Frontmatter',
        },
      },
      description: {
        control: 'text',
        description: 'Document description/intro from frontmatter',
        table: {
          category: 'Frontmatter',
        },
      },
      author: {
        control: 'text',
        description: 'Document author from frontmatter',
        table: {
          category: 'Frontmatter',
        },
      },
      date: {
        control: 'text',
        description: 'Document date from frontmatter',
        table: {
          category: 'Frontmatter',
        },
      },
    },
  });
</script>

<Story
  name="Default"
  args={{}}
>
  {#snippet children()}
    <p>This is the document content. It will be wrapped in the DocsLayout with USWDS prose styling.</p>
  {/snippet}
</Story>

<Story
  name="With Title"
  args={{
    title: 'Documentation Guide',
  }}
  play={async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    const heading = canvas.getByRole('heading', { level: 1 });
    await expect(heading).toBeInTheDocument();
    await expect(heading).toHaveTextContent('Documentation Guide');
  }}
>
  {#snippet children()}
    <h2>Section Heading</h2>
    <p>This layout includes a title from frontmatter displayed in the header.</p>
  {/snippet}
</Story>

<Story
  name="With Title And Description"
  args={{
    title: 'Getting Started',
    description: 'Learn how to use this component library in your project.',
  }}
  play={async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    const heading = canvas.getByRole('heading', { level: 1 });
    await expect(heading).toBeInTheDocument();
    await expect(heading).toHaveTextContent('Getting Started');
    
    const intro = canvas.getByText('Learn how to use this component library in your project.');
    await expect(intro).toBeInTheDocument();
    await expect(intro.className).toContain('usa-intro');
  }}
>
  {#snippet children()}
    <h2>Installation</h2>
    <p>Run the following command to install the package.</p>
  {/snippet}
</Story>

<Story
  name="With Full Metadata"
  args={{
    title: 'Component Design Patterns',
    description: 'Best practices for building accessible, reusable components.',
    author: 'Jane Doe',
    date: '2026-06-25',
  }}
  play={async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    const heading = canvas.getByRole('heading', { level: 1 });
    await expect(heading).toBeInTheDocument();
    await expect(heading).toHaveTextContent('Component Design Patterns');
    
    const intro = canvas.getByText('Best practices for building accessible, reusable components.');
    await expect(intro).toBeInTheDocument();
    
    const author = canvas.getByText('By Jane Doe');
    await expect(author).toBeInTheDocument();
    
    const time = canvas.getByText('2026-06-25');
    await expect(time).toBeInTheDocument();
    await expect(time.tagName).toBe('TIME');
    await expect(time.getAttribute('datetime')).toBe('2026-06-25');
  }}
>
  {#snippet children()}
    <h2>Introduction</h2>
    <p>Components should be composable, accessible, and follow USWDS design patterns.</p>
    
    <h3>Key Principles</h3>
    <ul>
      <li>Use semantic HTML</li>
      <li>Support keyboard navigation</li>
      <li>Provide proper ARIA attributes</li>
    </ul>
  {/snippet}
</Story>

<Story
  name="With Complex Content"
  args={{
    title: 'Markdown Content Example',
    description: 'Demonstrating how various markdown elements render in the layout.',
  }}
>
  {#snippet children()}
    <h2>Headings</h2>
    <p>This layout supports all heading levels and typography.</p>
    
    <h3>Lists</h3>
    <ul>
      <li>Unordered list item 1</li>
      <li>Unordered list item 2</li>
      <li>Unordered list item 3</li>
    </ul>
    
    <ol>
      <li>Ordered list item 1</li>
      <li>Ordered list item 2</li>
      <li>Ordered list item 3</li>
    </ol>
    
    <h3>Paragraphs</h3>
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
    <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
    
    <h3>Links</h3>
    <p>Visit the <a href="https://designsystem.digital.gov">USWDS documentation</a> for more information.</p>
  {/snippet}
</Story>

<Story
  name="Custom Class"
  args={{
    title: 'Custom Styled Document',
    class: 'custom-docs-layout',
  }}
  play={async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    const article = canvas.getByRole('article');
    await expect(article).toBeInTheDocument();
    await expect(article.className).toContain('usa-prose');
    await expect(article.className).toContain('custom-docs-layout');
  }}
>
  {#snippet children()}
    <p>This layout has a custom class applied for additional styling.</p>
  {/snippet}
</Story>

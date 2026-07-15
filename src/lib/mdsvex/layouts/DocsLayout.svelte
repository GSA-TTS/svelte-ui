<script module>
  import Link from '../../components/Link/Link.svelte';
  import { h1, h2, h3, h4, h5, h6, p } from './custom-elements';
  
  export { Link as a, h1, h2, h3, h4, h5, h6, p };
</script>

<script lang="ts">
  import type { DocsLayoutProps } from './DocsLayout.types.js';
  
  let {
    title,
    description,
    author,
    date,
    class: className,
    children,
    ...restProps
  }: DocsLayoutProps = $props();

  const classes = $derived.by(() => {
    const classList: string[] = ['usa-prose'];
    
    if (className) {
      classList.push(String(className));
    }
    
    return classList.join(' ');
  });
</script>

<article class={classes} {...restProps}>
  {#if title}
    <header>
      <h1>{title}</h1>
      {#if description}
        <p class="usa-intro">{description}</p>
      {/if}
      {#if author || date}
        <div class="metadata">
          {#if author}
            <span class="author">By {author}</span>
          {/if}
          {#if date}
            <time datetime={date}>{date}</time>
          {/if}
        </div>
      {/if}
    </header>
  {/if}
  
  {@render children?.()}
</article>

<style>
  .metadata {
    display: flex;
    gap: 1rem;
    margin-top: 0.5rem;
    margin-bottom: 2rem;
    font-size: 0.875rem;
    color: #565c65;
  }

  .author {
    font-weight: 600;
  }
</style>

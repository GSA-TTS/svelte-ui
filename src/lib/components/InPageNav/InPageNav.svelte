<script lang="ts">
  import type { InPageNavProps, NavItem } from './InPageNav.types.js';
  
  let {
    contentSelector = '.usa-prose',
    headingLevels = ['h2', 'h3'],
    title = 'On this page',
    scrollOffset = 0,
    class: className,
    ...restProps
  }: InPageNavProps = $props();
  
  let activeId = $state<string>('');
  let navItems = $state<NavItem[]>([]);
  
  $effect(() => {
    const checkForContent = () => {
      const contentElement = document.querySelector(contentSelector);
      
      if (!contentElement) {
        navItems = [];
        return;
      }
      
      const selector = headingLevels.join(', ');
      const headings = contentElement.querySelectorAll(selector);
      
      navItems = Array.from(headings).map((heading, index) => {
        if (!heading.id) {
          heading.id = `section-${index + 1}`;
        }
        
        return {
          id: heading.id,
          label: heading.textContent || '',
          level: heading.tagName.toLowerCase() as 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
        };
      });
    };
    
    checkForContent();
    
    const observer = new MutationObserver(() => {
      checkForContent();
    });
    
    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
    
    return () => {
      observer.disconnect();
    };
  });
  
  $effect(() => {
    if (navItems.length === 0) return;
    
    const headingElements = navItems
      .map(item => document.getElementById(item.id))
      .filter((el): el is HTMLElement => el !== null);
    
    if (headingElements.length === 0) return;
    
    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries.find(entry => entry.isIntersecting);
        if (visibleEntry) {
          activeId = visibleEntry.target.id;
        }
      },
      {
        rootMargin: `${scrollOffset}px 0px -80% 0px`,
        threshold: [0, 1]
      }
    );
    
    headingElements.forEach(el => observer.observe(el));
    
    return () => {
      headingElements.forEach(el => observer.unobserve(el));
    };
  });
  
  const classes = $derived.by(() => {
    const classList = ['usa-in-page-nav'];
    if (className) {
      classList.push(String(className));
    }
    return classList.join(' ');
  });
  
  function handleClick(event: MouseEvent, id: string) {
    event.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const top = element.getBoundingClientRect().top + window.scrollY + scrollOffset;
      window.scrollTo({ top, behavior: 'smooth' });
      activeId = id;
    }
  }
</script>

{#if navItems.length > 0}
  <aside class={classes} aria-label="In-page navigation" style="position: sticky; top: 0; align-self: start;" {...restProps}>
    <div class="usa-in-page-nav__nav">
      <h4 class="usa-in-page-nav__heading">{title}</h4>
      <ul class="usa-in-page-nav__list">
        {#each navItems as item (item.id)}
          <li class="usa-in-page-nav__item" class:usa-in-page-nav__item--sub={item.level === 'h3'}>
            <a
              href="#{item.id}"
              class="usa-in-page-nav__link"
              class:usa-current={activeId === item.id}
              onclick={(e) => handleClick(e, item.id)}
            >
              {item.label}
            </a>
          </li>
        {/each}
      </ul>
    </div>
  </aside>
{/if}

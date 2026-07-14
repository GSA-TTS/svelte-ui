<script lang="ts">
  import type { IdentifierRequiredLinksItemProps } from './IdentifierRequiredLinksItem.types.js';
  import Link from '../Link/Link.svelte';

  let props: IdentifierRequiredLinksItemProps = $props();
</script>

<li class="usa-identifier__required-links-item">
  <Link {...props} class="usa-identifier__required-link {props.class || ''}" />
</li>

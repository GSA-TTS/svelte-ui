<script lang="ts">
  import type { DotGovIconProps } from './DotGovIcon.types.js';
  import iconUrl from '../../../assets/img/icon-dot-gov.svg?url';
  let {
    width = 40,
    height = 40,
    class: className,
    ...restProps
  }: DotGovIconProps = $props();
</script>

<img
  src={iconUrl}
  alt=""
  {width}
  {height}
  class={className}
  aria-hidden="true"
  {...restProps}
/>

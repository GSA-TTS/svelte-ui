<script lang="ts">
  import type { DotGovIconProps } from './DotGovIcon.types.js';

  let {
    width = 40,
    height = 40,
    class: className,
    ...restProps
  }: DotGovIconProps = $props();
</script>

<img
  src="./assets/img/icon-dot-gov.svg"
  alt=""
  {width}
  {height}
  class={className}
  aria-hidden="true"
  {...restProps}
/>

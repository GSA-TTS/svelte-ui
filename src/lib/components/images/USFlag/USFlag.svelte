<script lang="ts">
  import type { USFlagProps } from './USFlag.types.js';

  let {
    width = 16,
    height = 11,
    alt = "US Flag",
    class: className,
    ...restProps
  }: USFlagProps = $props();
</script>

<img
  src="/assets/img/us_flag.svg"
  {alt}
  {width}
  {height}
  class={className}
  aria-hidden="true"
  {...restProps}
/>

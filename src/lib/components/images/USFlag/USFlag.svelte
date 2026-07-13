<script lang="ts">
  import type { USFlagProps } from './USFlag.types.js';
  import iconUrl from '../../../assets/img/us_flag.svg?url';

  let {
    width = 16,
    height = 11,
    alt = "US Flag",
    class: className,
    ...restProps
  }: USFlagProps = $props();
</script>

<img
  src={iconUrl}
  {alt}
  {width}
  {height}
  class={className}
  aria-hidden="true"
  {...restProps}
/>

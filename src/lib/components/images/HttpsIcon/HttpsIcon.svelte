<script lang="ts">
  import type { HttpsIconProps } from './HttpsIcon.types.js';
  import iconUrl from '../../../assets/img/icon-https.svg?url';
  let {
    width = 40,
    height = 40,
    class: className,
    ...restProps
  }: HttpsIconProps = $props();
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

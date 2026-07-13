<script lang="ts">
  import type { HttpsIconProps } from './HttpsIcon.types.js';

  let {
    width = 40,
    height = 40,
    class: className,
    ...restProps
  }: HttpsIconProps = $props();
</script>

<img
  src="./assets/img/icon-https.svg"
  alt=""
  {width}
  {height}
  class={className}
  aria-hidden="true"
  {...restProps}
/>

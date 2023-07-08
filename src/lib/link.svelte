<script lang="ts">
  import { base } from "$app/paths";

  export let to: string = "";

  export let classnames: string = "";

  $: href = base + to;
</script>

<a {href} class={classnames}><slot /></a>

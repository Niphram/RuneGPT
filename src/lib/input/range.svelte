<script lang="ts">
  export let label: string = "";

  export let value: number = 50;

  export let min: number = 0;
  export let max: number = 100;
  export let step: number = 1;
</script>

<label>
  {label}
  <input
    class="range range-primary"
    bind:value
    type="range"
    {min}
    {max}
    {step}
  />
</label>

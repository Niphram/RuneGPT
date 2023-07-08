<script lang="ts">
  import Rune from "./svg/rune.svelte";

  import { rotateGrid } from "./grid/grid";
  import { createSquareGrid } from "./grid/squareGrid";
  import { createTriGrid } from "./grid/triangleGrid";

  const gridOptions = [
    { label: "Hex", grid: createTriGrid(3, 3) },
    { label: "Tall Hex", grid: createTriGrid(3, 4) },
    { label: "Flat Hex", grid: rotateGrid(createTriGrid(3, 4)) },
    { label: "Tall Rect", grid: createSquareGrid(3, 4) },
    { label: "Wide Rect", grid: rotateGrid(createSquareGrid(3, 4)) },
  ];

  export let grid = gridOptions[0];
</script>

<div class="join flex flex-row rounded-lg">
  {#each gridOptions as option, i}
    <button
      class="btn-lg join-item btn h-auto flex-1 p-4"
      class:btn-primary={option === grid}
      on:click={() => (grid = gridOptions[i])}
      value={i}
    >
      <svg
        class="h-6 w-6"
        class:active={option === grid}
        viewBox="-0.6 -0.6 1.2 1.2"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g>
          <Rune grid={option.grid} seed="" pointDensity={1} lineDensity={1} />
        </g>
      </svg>
      {option.label}
    </button>
  {/each}
</div>

<style type="postcss">
  svg {
    stroke: hsl(var(--bc)) !important;
    fill: hsl(var(--b2)) !important;
  }

  svg.active {
    stroke: hsl(var(--pc)) !important;
    fill: hsl(var(--b2)) !important;
  }
</style>

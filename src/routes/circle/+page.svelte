<script lang="ts">
  import GridSelector from "$lib/grid-selector.svelte";
  import Circle from "$lib/svg/circle.svelte";

  import { downloadSVG } from "$lib/download";

  import type { Grid } from "$lib/grid/grid";
  import Range from "$lib/input/range.svelte";

  let text = `RuneGPT
you;can;generate
circles;by;writing;here
each;line;is;another;circle
each;line;contains;input;seperated;by;semicolons`;

  let pointDensity = 0.85;
  let lineDensity = 0.5;

  $: circles = text
    .split("\n")
    .reverse()
    .map((line) =>
      line
        .split(";")
        .map((t) => t.trim())
        .filter(Boolean)
    );

  $: scale = 1 / (circles.length * 2 + 1);

  let svgElement: SVGElement;

  let grid: { label: string; grid: Grid };
</script>

<div class="mb-4 grid gap-4">
  <div class="form-control w-full">
    <label for="input" class="label">
      <span class="label-text">Input</span>
    </label>
    <textarea
      name="input"
      class="textarea-bordered textarea block w-full rounded-lg"
      placeholder="Input"
      bind:value={text}
      rows="6"
    />
  </div>

  <GridSelector bind:grid />

  <div class="collapse-arrow collapse rounded-lg border-base-300 bg-base-200">
    <input type="checkbox" />
    <div class="collapse-title text-xl font-medium">Advanced Settings</div>
    <div class="collapse-content">
      <Range
        label="Point%"
        min={0}
        max={1}
        step={0.01}
        bind:value={pointDensity}
      />
      <Range
        label="Line%"
        min={0}
        max={1}
        step={0.01}
        bind:value={lineDensity}
      />
    </div>
  </div>

  <svg
    class="mx-auto max-w-full rounded-lg border border-neutral"
    bind:this={svgElement}
    viewBox="-1 -1 2 2"
    xmlns="http://www.w3.org/2000/svg"
  >
    <style>
      svg {
        stroke: black;
        fill: white;
      }
    </style>
    <g transform={`scale(${scale})`}>
      {#if grid}
        {#each circles as circle, reverseIdx}
          {@const idx = circles.length - 1 - reverseIdx}
          <Circle
            grid={grid.grid}
            rotation={(idx % 2) * 180}
            showCircle
            connectRunes
            diameter={idx * 2}
            runes={circle.map((c) => ({ seed: c, lineDensity, pointDensity }))}
          />
        {/each}
      {/if}
    </g>
  </svg>

  <button
    class="btn-primary btn w-full rounded-lg"
    on:click={() => downloadSVG(svgElement, "circle.svg")}>Download SVG</button
  >
</div>

<style>
  svg {
    stroke: hsl(var(--bc)) !important; /*  */
    fill: hsl(var(--b1)) !important;
  }
</style>

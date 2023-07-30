<script lang="ts">
    import { t } from "$lib/locales";

    import GridSelector from "$lib/grid-selector.svelte";
    import Rune from "$lib/svg/rune.svelte";

    import { downloadSVG } from "$lib/download";

    import type { Grid } from "$lib/grid/grid";
    import Range from "$lib/input/range.svelte";

    let seed = "RuneGPT";

    let pointDensity = 0.85;
    let lineDensity = 0.5;

    let grid: Grid;

    let svgElement: SVGElement;
</script>

<div class="mb-4 grid gap-4">
    <div class="form-control w-full">
        <label for="input" class="label">
            <span class="label-text">{$t("input.seed.label")}</span>
        </label>
        <input
            name="input"
            bind:value={seed}
            type="text"
            placeholder={$t("input.seed.placeholder")}
            class="input-bordered input w-full rounded-lg"
        />
    </div>

    <GridSelector bind:grid />

    <div class="collapse-arrow collapse rounded-lg border-base-300 bg-base-200">
        <input type="checkbox" />
        <div class="collapse-title text-xl font-medium">
            {$t("input.advanced")}
        </div>
        <div class="collapse-content">
            <Range
                label={$t("input.pointDensity.label")}
                min={0}
                max={1}
                step={0.01}
                bind:value={pointDensity}
            />
            <Range
                label={$t("input.lineDensity.label")}
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
        viewBox="-0.75 -0.75 1.5 1.5"
        xmlns="http://www.w3.org/2000/svg"
    >
        <style>
            svg {
                stroke: black;
                fill: white;
            }
        </style>
        {#if grid}
            <Rune {grid} {seed} {pointDensity} {lineDensity} />
        {/if}
    </svg>

    <button
        class="btn-primary btn w-full rounded-lg"
        on:click={() => downloadSVG(svgElement, `${seed}.svg`)}
        >{$t("downloadSvg")}</button
    >
</div>

<style type="postcss">
    svg {
        stroke: hsl(var(--bc)) !important;
        fill: hsl(var(--b1)) !important;
    }
</style>

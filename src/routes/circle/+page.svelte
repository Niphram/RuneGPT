<script lang="ts">
    import { t } from "$lib/locales";

    import GridSelector from "$lib/grid-selector.svelte";
    import Circle from "$lib/svg/circle.svelte";

    import { downloadSVG } from "$lib/download";

    import type { Grid } from "$lib/grid/grid";
    import Range from "$lib/input/range.svelte";

    let text = "";

    let pointDensity = 0.85;
    let lineDensity = 0.5;

    $: circles = (text || $t("input.seedCircle.placeholder"))
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

    let grid: Grid;
</script>

<div class="mb-4 grid gap-4">
    <div class="form-control w-full">
        <label for="input" class="label">
            <span class="label-text">{$t("input.seedCircle.label")}</span>
        </label>
        <textarea
            name="input"
            class="textarea-bordered textarea block w-full rounded-lg"
            placeholder={$t("input.seedCircle.placeholder")}
            bind:value={text}
            rows="6"
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
        viewBox="-1 -1 2 2"
        xmlns="http://www.w3.org/2000/svg"
    >
        <style>
            svg {
                stroke: black;
                fill: white;
            }
        </style>
        <g transform="scale({scale})">
            {#if grid}
                {#each circles as circle, reverseIdx (circles.length - reverseIdx)}
                    {@const idx = circles.length - 1 - reverseIdx}
                    <Circle
                        {grid}
                        rotation={(idx % 2) * 180}
                        showCircle
                        connectRunes
                        diameter={idx * 2}
                        runes={circle.map((c) => ({
                            seed: c,
                            lineDensity,
                            pointDensity,
                        }))}
                    />
                {/each}
            {/if}
        </g>
    </svg>

    <button
        class="btn-primary btn w-full rounded-lg"
        on:click={() => downloadSVG(svgElement, "circle.svg")}
        >{$t("downloadSvg")}</button
    >
</div>

<style>
    svg {
        stroke: hsl(var(--bc)) !important; /*  */
        fill: hsl(var(--b1)) !important;
    }
</style>

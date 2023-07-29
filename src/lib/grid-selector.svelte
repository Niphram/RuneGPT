<script lang="ts">
    import { t } from "../routes/+layout.svelte";

    import Rune from "./svg/rune.svelte";

    import { rotateGrid } from "./grid/grid";
    import { createSquareGrid } from "./grid/squareGrid";
    import { createTriGrid } from "./grid/triangleGrid";

    const gridOptions = [
        { label: "runes.hex", grid: createTriGrid(3, 3) },
        { label: "runes.tallHex", grid: createTriGrid(3, 4) },
        {
            label: "runes.flatHex",
            grid: rotateGrid(createTriGrid(3, 4)),
        },
        { label: "runes.tallRect", grid: createSquareGrid(3, 4) },
        {
            label: "runes.wideRect",
            grid: rotateGrid(createSquareGrid(3, 4)),
        },
    ] as const;

    export let grid = gridOptions[0].grid;
</script>

<div class="join flex rounded-lg">
    {#each gridOptions as option, i}
        <button
            class="btn-lg join-item btn h-auto flex-1 p-1 md:p-4"
            class:btn-primary={option.grid === grid}
            on:click={() => (grid = gridOptions[i].grid)}
            value={i}
        >
            <div class="flex flex-col justify-items-center gap-2">
                <svg
                    class="m-auto h-6 w-6"
                    class:active={option.grid === grid}
                    viewBox="-0.6 -0.6 1.2 1.2"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <g>
                        <Rune
                            grid={option.grid}
                            seed=""
                            pointDensity={1}
                            lineDensity={1}
                        />
                    </g>
                </svg>
                <span>
                    {$t(option.label)}
                </span>
            </div>
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

<svelte:options namespace="svg" />

<script lang="ts">
    import Rune from "$lib/svg/rune.svelte";

    import type { Grid } from "$lib/grid/grid";
    import type { ComponentProps } from "svelte";

    export let grid: Grid;

    export let runes: Omit<ComponentProps<Rune>, "grid">[] = [];
    export let showCircle = false;
    export let connectRunes = false;
    export let rotation = 0;
    export let diameter: number;

    function regularPolygon(sides: number, size: number) {
        return Array.from({ length: sides }, (_, i) => {
            const x = size * Math.sin((2 * Math.PI * i) / sides);
            const y = size * Math.cos((2 * Math.PI * i) / sides);

            return `${x},${y}`;
        }).join(" ");
    }
</script>

<g transform={`rotate(${rotation})`}>
    {#if showCircle}
        <circle cx="0" cy="0" r={diameter} fill="none" stroke-width="0.075" />
    {/if}

    {#if connectRunes && runes.length > 2}
        <polygon
            points={regularPolygon(runes.length, diameter)}
            fill="none"
            stroke-width="0.075"
        />
    {/if}

    {#each runes as rune, i}
        <g
            transform={`rotate(${
                (i * 360) / runes.length
            }) translate(0 ${diameter})`}
        >
            <circle cx="0" cy="0" r="0.75" stroke-width="0.075" />
            <Rune {...rune} {grid} />
        </g>
    {/each}
</g>

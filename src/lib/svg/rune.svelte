<svelte:options namespace="svg" />

<script lang="ts">
    import Alea from "alea";

    import type { Grid } from "$lib/grid/grid";

    export let grid: Grid;
    export let seed: unknown;

    export let pointDensity = 0.85;
    export let lineDensity = 0.5;

    function generateFinalGrid(
        grid: Grid,
        seed: unknown,
        pointDensity: number,
        lineDensity: number
    ) {
        const rng = Alea(seed);

        // create boolean for every point based on rng
        const activePoints = grid.points.map(() => rng() < pointDensity);

        // only keep lines that are
        // 1. connected to two active points and
        // 2. selected by rng
        const activeLines = grid.lines.filter(([aIdx, bIdx]) => {
            return (
                rng() < lineDensity && // Make sure rng is called first, so order is not influenced
                activePoints[aIdx] &&
                activePoints[bIdx]
            );
        });

        // disable all points that are connected to an active line
        activeLines.forEach(([a, b]) => {
            activePoints[a] = false;
            activePoints[b] = false;
        });

        const points = grid.points.filter((_, i) => activePoints[i]);
        const lines = activeLines.map(([a, b]) => [
            grid.points[a],
            grid.points[b],
        ]);

        return { points, lines };
    }

    $: filteredGrid = generateFinalGrid(grid, seed, pointDensity, lineDensity);

    $: linesPath = filteredGrid.lines
        .map(([a, b]) => {
            return `M${a.x} ${a.y} L${b.x} ${b.y}`;
        })
        .join(" ");

    $: dotsPath = filteredGrid.points
        .map(({ x, y }) => `M${x} ${y} h0.00001`)
        .join(" ");

    $: offset = grid.bounds.center();
</script>

<g transform={`translate(${-offset.x} ${-offset.y})`}>
    <path
        class="lines"
        d={linesPath}
        stroke-linecap="round"
        stroke-width="0.075"
    />
    <path
        class="dots"
        d={dotsPath}
        stroke-linecap="round"
        stroke-width="0.15"
    />
</g>

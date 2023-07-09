<script lang="ts">
    import "../app.css";
    import { base } from "$app/paths";

    import Rune from "$lib/svg/rune.svelte";

    import { createTriGrid } from "$lib/grid/triangleGrid";

    const grid = createTriGrid(3, 3);

    let seed: unknown = "RuneGPT";
</script>

<div class="navbar sticky top-0 z-50 bg-base-300">
    <div class="flex-1">
        <button
            class="btn-ghost btn mx-2"
            on:click={() => (seed = Math.random())}
        >
            <svg
                class="h-6 w-6"
                viewBox="-0.6 -0.6 1.2 1.2"
                xmlns="http://www.w3.org/2000/svg"
            >
                <g>
                    <Rune {grid} {seed} pointDensity={0.85} lineDensity={0.5} />
                </g>
            </svg>
            <span class="text-xl normal-case">RuneGPT</span>
        </button>
    </div>
    <div class="flex-none">
        <ul class="menu menu-horizontal px-1">
            <li><a href="{base}/">Rune Generator</a></li>
            <li><a href="{base}/circle">Circle Generator</a></li>
        </ul>
    </div>
</div>

<div class="container mx-auto flex max-w-screen-md flex-col py-4">
    <slot />
</div>

<footer class="footer footer-center bg-base-300 p-4 text-base-content">
    <div>
        <p>
            Made with ❤ by <a
                class="link"
                href="https://github.com/Niphram/RuneGPT"
            >
                Niphram
            </a>
        </p>
    </div>
</footer>

<style>
    svg {
        stroke: hsl(var(--bc)) !important; /*  */
        fill: hsl(var(--b3)) !important;
    }
</style>

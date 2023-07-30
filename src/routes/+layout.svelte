<script lang="ts">
    import { base } from "$app/paths";
    import "../app.css";

    import { isInitialized, t } from "$lib/locales";

    import LanguageSelector from "$lib/languageSelector.svelte";
    import Rune from "$lib/svg/rune.svelte";

    import { createTriGrid } from "$lib/grid/triangleGrid";

    const grid = createTriGrid(3, 3);

    let seed: unknown = "RuneGPT";
</script>

{#if $isInitialized}
    <div class="navbar sticky top-0 z-50 bg-base-300 px-4">
        <div class="flex-1">
            <button
                class="btn-ghost btn"
                on:click={() => (seed = Math.random())}
            >
                <svg
                    class="h-6 w-6"
                    viewBox="-0.6 -0.6 1.2 1.2"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <g>
                        <Rune
                            {grid}
                            {seed}
                            pointDensity={0.85}
                            lineDensity={0.5}
                        />
                    </g>
                </svg>
                <span class="text-xl normal-case">RuneGPT</span>
            </button>
        </div>
        <div class="flex-none">
            <ul class="menu menu-horizontal px-1">
                <li><a href="{base}/">{$t("header.runeGenerator")}</a></li>
                <li>
                    <a href="{base}/circle">{$t("header.circleGenerator")}</a>
                </li>
            </ul>

            <LanguageSelector />
        </div>
    </div>

    <div class="container mx-auto flex max-w-screen-md flex-col py-4">
        <slot />
    </div>

    <footer class="footer footer-center bg-base-300 p-4 text-base-content">
        <div>
            <p>
                {$t("footer.author.pre")}
                <a class="link" href="https://github.com/Niphram/RuneGPT">
                    Niphram
                </a>
                {$t("footer.author.post")}
            </p>
        </div>
    </footer>
{/if}

<style>
    svg {
        stroke: hsl(var(--bc)) !important; /*  */
        fill: hsl(var(--b3)) !important;
    }
</style>

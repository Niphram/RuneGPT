<script lang="ts">
    import { isLoading, locale, locales } from "$lib/locales";
    import { delay } from "./utils/storeDelay";

    const delayedLoading = delay(isLoading, 100, (v) => v);
</script>

{#if !$delayedLoading}
    <select class="select-ghost select select-sm w-16" bind:value={$locale}>
        {#each locales as { key, flag } (key)}
            <option selected={key === $locale} value={key}>{flag}</option>
        {/each}
    </select>
{:else}
    <div class="flex w-16 items-center justify-center text-center align-middle">
        <div class="loading loading-dots loading-sm" />
    </div>
{/if}

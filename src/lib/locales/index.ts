import { moosmannStores } from "moosmann-svelte";

import type en from "./en";

export const { t, locale, localeKeys, isInitialized, isLoading } =
    moosmannStores<typeof en>("en", {
        en: () => import("./en"),
        de: () => import("./de"),
    });

export const locales = [
    { key: "en", flag: "🇬🇧", label: "English" },
    { key: "de", flag: "🇩🇪", label: "Deutsch" },
];

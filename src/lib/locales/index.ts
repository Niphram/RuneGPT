import { moosmannStores } from "moosmann-svelte";

import en from "./en";

export const { t, locale } = await moosmannStores<typeof en>("en", {
    en,
    de: () => import("./de"),
});

export const locales = [
    { key: "en", flag: "🇬🇧", label: "English" },
    { key: "de", flag: "🇩🇪", label: "Deutsch" },
];
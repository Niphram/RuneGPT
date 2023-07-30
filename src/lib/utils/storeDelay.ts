import { derived, get, type Readable } from "svelte/store";

export function delay<T>(
    store: Readable<T>,
    delay: number,
    applyDelay?: (value: T) => boolean
) {
    let timeoutId: number | undefined;

    const delayedStore = derived(
        [store],
        ([value], set) => {
            if (timeoutId) {
                clearTimeout(timeoutId);
            }

            if (applyDelay && !applyDelay(value)) {
                set(value);
            } else {
                timeoutId = setTimeout(() => {
                    set(value);
                }, delay);
            }
        },
        get(store)
    );

    return delayedStore;
}

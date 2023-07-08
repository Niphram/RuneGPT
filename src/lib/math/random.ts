import Alea from "alea";

export function seededRandomSequence(seed: unknown, length: number) {
    const prng = Alea(seed);

    return Array.from({ length }, prng);
}

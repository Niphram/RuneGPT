import { createGrid, type Grid } from "$lib/grid/grid";
import { Vector } from "$lib/math/vector";

export function createSquareGrid(width: number, height: number): Grid {
    const points = Array.from(
        { length: width * height },
        (_, i) => new Vector(i % width, Math.floor(i / width))
    );

    const lines: [number, number][] = [];

    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width - 1; x++) {
            const idx = y * width + x;
            lines.push([idx, idx + 1]);
        }
    }

    for (let y = 0; y < height - 1; y++) {
        for (let x = 0; x < width; x++) {
            const idx = y * width + x;
            lines.push([idx, idx + width]);
        }
    }

    return createGrid(points, lines);
}

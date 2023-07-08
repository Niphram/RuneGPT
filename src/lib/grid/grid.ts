import { Bounds } from "$lib/math/bounds";
import { Vector } from "$lib/math/vector";

export type Grid = {
    points: Vector[];
    lines: [number, number][];
    bounds: Bounds;
};

export function createGrid(
    points: Vector[],
    connections: [number, number][]
): Grid {
    const bounds = new Bounds(Infinity, Infinity, -Infinity, -Infinity);

    points.forEach(({ x, y }) => {
        bounds.bottom = Math.min(bounds.bottom, y);
        bounds.top = Math.max(bounds.top, y);
        bounds.left = Math.min(bounds.left, x);
        bounds.right = Math.max(bounds.right, x);
    });

    const scale = 1 / Math.max(bounds.width(), bounds.height(), 1);

    const normalizedPoints = points.map(({ x, y }) => {
        return new Vector(x - bounds.left, y - bounds.bottom).scale(scale);
    });

    const scaledBounds = new Bounds(
        0,
        0,
        bounds.width() * scale,
        bounds.height() * scale
    );

    return {
        points: normalizedPoints,
        lines: connections,
        bounds: scaledBounds,
    };
}

export function rotateGrid(grid: Grid) {
    grid.points.forEach((p) => {
        const x = p.x;
        p.x = p.y;
        p.y = x;
    });

    const right = grid.bounds.right;
    grid.bounds.right = grid.bounds.top;
    grid.bounds.top = right;

    return grid;
}

import { createGrid, type Grid } from "$lib/grid/grid";
import { Vector } from "$lib/math/vector";

const SQRT_P75 = Math.sqrt(0.75);

export function createTriGrid(width: number, height: number): Grid {
  width = Math.min(Math.floor(width / 2), height - 1);

  const points = [];
  const lines: [number, number][] = [];

  for (let x = -width; x <= width; x++) {
    for (let y = Math.abs(x); y < height; y++) {
      points.push(new Vector(x * SQRT_P75, y - Math.abs(x / 2)));
    }
  }

  let offset = 0;
  for (let x = -width; x <= width; x++) {
    const colHeight = height - Math.abs(x);
    for (let i = 0; i < colHeight - 1; i++) {
      lines.push([i + offset, i + offset + 1]);
    }
    offset += colHeight;
  }

  function sum(a: number, b: number) {
    return ((b - a + 1) / 2) * (a + b);
  }

  const plm1 = points.length - 1;
  for (let x = width; x > 0; x--) {
    const colHeight = height - x;

    const offset = sum(height - width, colHeight - 1);

    for (let i = 0; i < colHeight; i++) {
      const idx = i + offset;
      const idxRev = plm1 - idx;

      lines.push([idx, idx + colHeight]);
      lines.push([idx, idx + colHeight + 1]);
      lines.push([idxRev, idxRev - colHeight]);
      lines.push([idxRev, idxRev - colHeight - 1]);
    }
  }

  return createGrid(points, lines);
}

import { Vector } from "./vector";

export class Bounds {
    constructor(
        public left: number,
        public bottom: number,
        public right: number,
        public top: number
    ) {}

    width() {
        return Math.abs(this.left - this.right);
    }

    height() {
        return Math.abs(this.top - this.bottom);
    }

    center() {
        const x = (this.left + this.right) * 0.5;
        const y = (this.top + this.bottom) * 0.5;

        return new Vector(x, y);
    }
}

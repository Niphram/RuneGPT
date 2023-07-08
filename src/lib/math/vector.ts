export class Vector {
    constructor(public x: number, public y: number) {}

    add(b: Vector) {
        this.x += b.x;
        this.y += b.y;
        return this;
    }

    sub(b: Vector) {
        this.x -= b.x;
        this.y -= b.y;
        return this;
    }

    scale(s: number) {
        this.x *= s;
        this.y *= s;
        return this;
    }

    static add(a: Vector, b: Vector) {
        return new Vector(a.x + b.x, a.y + b.y);
    }

    static average(a: Vector, b: Vector) {
        const x = (a.x + b.x) * 0.5;
        const y = (a.y + b.y) * 0.5;

        return new Vector(x, y);
    }

    static equal(a: Vector, b: Vector, eps = 0.0001) {
        return Math.abs(a.x - b.x) < eps && Math.abs(a.y - b.y) < eps;
    }
}

export class Vector2 {
    constructor(public x: number, public y: number) {}

    plus(other: Vector2) {
        return new Vector2(this.x + other.x, this.y + other.y);
    }
    minus(other: Vector2) {
        return new Vector2(this.x - other.x, this.y - other.y);
    }
    prod(other: number) {
        return new Vector2(this.x * other, this.y * other);
    }
    div(other: number) {
        return new Vector2(this.x / other, this.y / other);
    }

    dot(other: Vector2) {
        return this.x * other.x + this.y * other.y;
    }
    cross(other: Vector2) {
        return this.x * other.y - other.x * this.y;
    }

    length() {
        return Math.sqrt(this.x ** 2 + this.y ** 2);
    }

    lengthSq() {
        return this.x ** 2 + this.y ** 2;
    }
    angle() {
        return Math.atan2(this.y, this.x);
    }
    normalized() {
        return this.div(this.length());
    }

    directionTo(other: Vector2) {
        return other.minus(this).normalized();
    }
    distanceTo(other: Vector2) {
        return other.minus(this).length();
    }
    distanceToSq(other: Vector2) {
        return other.minus(this).lengthSq();
    }

    dupe() {
        return new Vector2(this.x, this.y);
    }
}

export const vec2 = (x: number, y: number) => new Vector2(x, y);

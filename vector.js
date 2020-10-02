class Vector {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    static add(v1, v2) {
        return new Vector(v1.x + v2.x, v1.y + v2.y);
    }

    static subtract(v1, v2) {
        return new Vector(v1.x - v2.x, v1.y - v2.y);
    }

    static mult(v1, c) {
        return new Vector(v1.x * c, v1.y * c);
    }

    static dot(v1, v2) {
        return (v1.x * v2.x + v1.y * v2.y);
    }

    mod() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }

}
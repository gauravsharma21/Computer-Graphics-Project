class GameWorld {

    constructor() {
        this.ball = new Ball('rgb(0,0,255)', new Vector(0, 0), new Vector(2, 2));
        this.b = new Ball('rgb(0,0,25)', new Vector(100, 100), new Vector(-2, 5));
    }

    draw() {
        if (Vector.subtract(this.ball.pos, this.b.pos).mod() <= 2 * this.ball.radius) {
            this.ball.detectCollision(this.b);
        }
        this.ball.draw();
        this.b.draw();
    }

    update() {
        this.ball.update();
        this.b.update();
    }
}
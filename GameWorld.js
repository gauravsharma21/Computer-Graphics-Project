class GameWorld {

    constructor() {
        this.ball = new Ball('rgb(0,0,255)', new Vector(150, 150), new Vector(5, 2));
        this.b = new Ball('rgb(0,0,25)', new Vector(100, 100), new Vector(-2, 5));
    }

    draw() {
        if (Vector.subtract(this.ball.pos, this.b.pos).mod() <= 2 * this.ball.radius + 10) {
            this.ball.detectCollision(this.b);
        }
        canvas.ctx.fillStyle = '#19e044';
        canvas.ctx.fillRect(40, 40, canvas.width - 80, canvas.height - 80);
        this.ball.draw();
        this.b.draw();

    }

    update() {
        this.ball.update();
        this.b.update();
    }
}
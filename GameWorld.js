class GameWorld {

    constructor() {
        this.ball = new Ball('rgb(0,0,255)', { x: 0, y: 0 });
        this.b = new Ball('rgb(0,0,25)', { x: 100, y: 100 });
    }

    draw() {
        if (this.ball.distance(b) <= this.ball.radius) {
            this.ball.detectCollision(b);
        }
        this.ball.draw();
        this.b.draw();
    }

    update() {
        this.ball.update();
        this.b.update();
    }
}
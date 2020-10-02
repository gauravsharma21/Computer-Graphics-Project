class Ball {
    constructor(color, pos) {
        this.x = pos.x;
        this.y = pos.y;
        this.vx = 10;
        this.vy = 10;
        this.radius = 25;
        this.color = color;
    }

    draw() {
        canvas.ctx.beginPath();
        canvas.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
        canvas.ctx.closePath();
        canvas.ctx.fillStyle = this.color;
        canvas.ctx.fill();
    }

    update() {
        // canvas.ctx.clearRect(0, 0, canvas.width, canvas.height);
        this.x += this.vx;
        this.y += this.vy;

        if (this.y + this.vy > canvas.height || this.y + this.vy < 0) {
            this.vy = -this.vy;
        }
        if (this.x + this.vx > canvas.width || this.x + this.vx < 0) {
            this.vx = -this.vx;
        }
    }

    distance(b) {
        return Math.sqrt((b.x - this.x) * (b.x - this.x) + (b.y - this.y) * (b.y - this.y));
    }

    detectCollision(b) {

    }
}
class Ball {
    constructor(color, pos, vel) {
        this.pos = pos;
        this.vel = vel;
        this.radius = 25;
        this.color = color;
    }

    draw() {
        canvas.ctx.beginPath();
        canvas.ctx.arc(this.pos.x, this.pos.y, this.radius, 0, Math.PI * 2, true);
        canvas.ctx.closePath();
        canvas.ctx.fillStyle = this.color;
        canvas.ctx.fill();
    }

    update() {
        this.pos.x += this.vel.x;
        this.pos.y += this.vel.y;

        // this.vel = Vector.mult(this.vel, 0.985);

        if (this.pos.y + this.vel.y > canvas.height || this.pos.y + this.vel.y < 0) {
            this.vel.y = -this.vel.y;
        }
        if (this.pos.x + this.vel.x > canvas.width || this.pos.x + this.vel.x < 0) {
            this.vel.x = -this.vel.x;
        }
    }

    detectCollision(b) {
        let num1 = Vector.dot(Vector.subtract(this.vel, b.vel), Vector.subtract(this.pos, b.pos));
        let den1 = Vector.subtract(this.pos, b.pos).mod();
        den1 = den1 * den1;

        let num2 = Vector.dot(Vector.subtract(b.vel, this.vel), Vector.subtract(b.pos, this.pos));
        let den2 = Vector.subtract(b.pos, this.pos).mod();
        den2 = den2 * den2;

        this.vel = Vector.subtract(this.vel, Vector.mult(Vector.subtract(this.pos, b.pos), num1 / den1));
        b.vel = Vector.subtract(b.vel, Vector.mult(Vector.subtract(b.pos, this.pos), num2 / den2));

    }
}
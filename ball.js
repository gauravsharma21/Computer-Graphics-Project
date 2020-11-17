var friction = true;

class Ball {
    constructor(color, pos, vel) {
        this.pos = pos;
        this.vel = vel;
        this.radius = 20;
        this.color = color;
        this.visible = true;
        this.moving = true;
    }

    draw() {
        if (!this.visible) {
            this.moving = false;
            return;
        }
        var grd = canvas.ctx.createRadialGradient(this.pos.x, this.pos.y, 8, this.pos.x, this.pos.y, 30);
        grd.addColorStop(0, this.color);
        grd.addColorStop(1, "black");

        canvas.ctx.beginPath();
        canvas.ctx.arc(this.pos.x, this.pos.y, this.radius, 0, Math.PI * 2, true);
        canvas.ctx.closePath();
        canvas.ctx.fillStyle = grd;
        canvas.ctx.fill();
    }

    update() {
        if (!this.visible) {
            this.moving = false;
            return;
        }

        if (this.vel.mod() < 0.1) {
            this.vel = new Vector(0, 0);
            this.moving = false;
        } else {
            this.moving = true;
        }
        this.pos.x += this.vel.x;
        this.pos.y += this.vel.y;

        if (friction)
            this.vel = Vector.mult(this.vel, 0.985);

        if (this.pos.y + this.radius + this.vel.y > canvas.height - 60 || this.pos.y - this.radius + this.vel.y < 60) {
            this.vel.y = -this.vel.y;
        }
        if (this.pos.x + this.radius + this.vel.x > canvas.width - 60 || this.pos.x - this.radius + this.vel.x < 60) {
            this.vel.x = -this.vel.x;
        }
    }

    detectCollision(b) {
        if (!this.visible || !b.visible) return;

        let num1 = Vector.dot(Vector.subtract(this.vel, b.vel), Vector.subtract(this.pos, b.pos));
        let den1 = Vector.subtract(this.pos, b.pos).mod();
        den1 = den1 * den1;

        let num2 = Vector.dot(Vector.subtract(b.vel, this.vel), Vector.subtract(b.pos, this.pos));
        let den2 = Vector.subtract(b.pos, this.pos).mod();
        den2 = den2 * den2;

        this.vel = Vector.subtract(this.vel, Vector.mult(Vector.subtract(this.pos, b.pos), num1 / den1));
        b.vel = Vector.subtract(b.vel, Vector.mult(Vector.subtract(b.pos, this.pos), num2 / den2));


        let normal = Vector.subtract(this.pos, b.pos);
        let dist = normal.mod();
        let mtd = Vector.mult(normal, (2 * this.radius - dist) / dist);

        this.pos = Vector.add(this.pos, Vector.mult(mtd, 1 / 2));
        b.pos = Vector.subtract(b.pos, Vector.mult(mtd, 1 / 2));
    }

    shoot(power, rotation) {
        let powerv = new Vector(-1 * Math.cos(rotation), -1 * Math.sin(rotation));
        powerv = Vector.mult(powerv, power / 100);
        this.vel = Vector.subtract(this.vel, powerv);
    }

    respawn() {
        this.pos = new Vector(305, 310);
        this.vel = new Vector(0, 0);
        this.moving = false;
        this.visible = true;
    }
}
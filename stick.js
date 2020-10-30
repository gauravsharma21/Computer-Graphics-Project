class Stick {
    constructor(pos, onShoot) {
        this.origin = pos;
        this.pos = new Vector(0, 0);
        this.rotation = 0;
        this.power = 0;
        this.onShoot = onShoot;
        this.lock = false;
    }

    draw() {
        if (this.lock) return;
        canvas.ctx.save();
        canvas.ctx.fillStyle = "brown";
        canvas.ctx.translate(this.origin.x, this.origin.y);
        canvas.ctx.rotate(this.rotation);
        canvas.ctx.fillRect(this.pos.x, this.pos.y, 200, 15);
        canvas.ctx.translate(-1 * this.origin.x, -1 * this.origin.y);
        canvas.ctx.restore();
    }

    update() {
        if (this.lock) return;
        let num = mouse._position.y - this.origin.y;
        let den = mouse._position.x - this.origin.x;
        this.rotation = Math.atan2(num, den);

        if (mouse._left.down) {
            if (this.power < 1000) {
                this.pos.x++;
                this.power += 10;
            }
        } else if (this.power > 0) {
            this.onShoot(this.power, this.rotation);
            this.pos = new Vector(0, 0);
            this.power = 0;
        }
    }

    reposition(pos) {
        this.origin = pos;
    }
}
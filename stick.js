class Stick {
    constructor(pos, onShoot) {
        this.origin = pos;
        this.pos = new Vector(0, 0);
        this.rotation = 0;
        this.power = 0;
        this.onShoot = onShoot;
        this.lock = false;
        this.clicked = false;
        this.sound = new sound("poolballhit.mp3")
    }

    draw() {
        if (this.lock) return;
        canvas.ctx.save();
        canvas.ctx.fillStyle = "#855103";
        canvas.ctx.translate(this.origin.x, this.origin.y);
        canvas.ctx.rotate(this.rotation);
        canvas.ctx.beginPath();
        canvas.ctx.moveTo(-1 * this.pos.x, 4);
        canvas.ctx.lineTo(-1 * this.pos.x - 400, 8);
        canvas.ctx.arc(-1 * this.pos.x - 400, 0, 8, Math.PI / 2, -Math.PI / 2);
        canvas.ctx.lineTo(-1 * this.pos.x - 400, -8)
        canvas.ctx.lineTo(-1 * this.pos.x, -4);
        canvas.ctx.arc(-1 * this.pos.x, 0, 4, Math.PI / 2, -Math.PI / 2, true);
        canvas.ctx.closePath()
        canvas.ctx.fill();
        canvas.ctx.beginPath()
        canvas.ctx.setLineDash([10, 3]);
        canvas.ctx.strokeStyle = "white"
        canvas.ctx.moveTo(0, 0);
        canvas.ctx.lineTo(600, 0);
        canvas.ctx.stroke();
        canvas.ctx.translate(-1 * this.origin.x, -1 * this.origin.y);
        canvas.ctx.restore();
    }

    update() {
        if (this.lock) return;
        let cvs = document.getElementById("myCanvas")
        let num = mouse._position.y - cvs.offsetTop - this.origin.y;
        let den = mouse._position.x - cvs.offsetLeft - this.origin.x;
        this.rotation = Math.atan2(num, den);
        if (mouse._left.down) {
            if (this.power < 1500) {
                this.pos.x++;
                this.power += 20;
            }
            this.clicked = true;
        } else if (this.power > 0) {
            this.sound.play()
            if (this.clicked === true) {
                moves++;
                this.clicked = false;
            }
            this.onShoot(this.power, this.rotation);
            this.pos = new Vector(0, 0);
            this.power = 0;
        }
    }

    reposition(pos) {
        this.origin = pos;
    }
}
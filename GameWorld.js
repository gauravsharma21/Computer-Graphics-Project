class GameWorld {

    constructor() {
        this.pockets = [];
        this.balls = [];
        let pockets = this.pockets;
        let balls = this.balls;
        this.whiteball = new Ball('white', new Vector(100, 420), new Vector(0, 0));
        this.stick = new Stick(new Vector(this.whiteball.pos.x, this.whiteball.pos.y), this.whiteball.shoot.bind(this.whiteball));
        this.done = false;

        pockets.push(new Vector(40, 40));
        pockets.push(new Vector(canvas.width / 2, 40));
        pockets.push(new Vector(canvas.width - 40, 40));
        pockets.push(new Vector(40, canvas.height - 40));
        pockets.push(new Vector(canvas.width / 2, canvas.height - 40));
        pockets.push(new Vector(canvas.width - 40, canvas.height - 40));

        balls.push(new Ball('yellow', new Vector(100, 320), new Vector(0, 0)));
        balls.push(new Ball('yellow', new Vector(150, 340), new Vector(0, 0)));
        balls.push(new Ball('yellow', new Vector(190, 380), new Vector(0, 0)));
        balls.push(new Ball('yellow', new Vector(230, 390), new Vector(0, 0)));
        balls.push(new Ball('yellow', new Vector(270, 400), new Vector(0, 0)));
        balls.push(new Ball('yellow', new Vector(310, 420), new Vector(0, 0)));
        balls.push(new Ball('yellow', new Vector(350, 440), new Vector(0, 0)));
        balls.push(new Ball('red', new Vector(100, 140), new Vector(0, 0)));
        balls.push(new Ball('red', new Vector(150, 180), new Vector(0, 0)));
        balls.push(new Ball('red', new Vector(190, 100), new Vector(0, 0)));
        balls.push(new Ball('red', new Vector(230, 80), new Vector(0, 0)));
        balls.push(new Ball('red', new Vector(270, 300), new Vector(0, 0)));
        balls.push(new Ball('red', new Vector(310, 340), new Vector(0, 0)));
        balls.push(new Ball('red', new Vector(350, 380), new Vector(0, 0)));

        balls.push(new Ball('black', new Vector(400, 420), new Vector(0, 0)));
        balls.push(this.whiteball);
    }

    drawSockets(pos) {
        canvas.ctx.fillStyle = 'black'
        canvas.ctx.beginPath();
        canvas.ctx.arc(pos.x, pos.y, 25, 0, 2 * Math.PI);
        canvas.ctx.fill();
        canvas.ctx.closePath();
    }

    draw() {
        let game_score = 0;
        for (let i = 0; i < 16; i++) {
            if (this.balls[i].visible == false) {
                if (this.balls[i].color == 'yellow') game_score += 10;
                else if (this.balls[i].color == 'red') game_score += 20;
                else if (this.balls[i].color == 'black') game_score += 50;
                else {
                    game_score -= 10;
                    this.whiteball.respawn();
                }
            }
        }

        document.getElementById("score").innerHTML = "Score:" + game_score;

        for (let i = 0; i < 16; i++) {
            for (let j = i + 1; j < 16; j++) {
                if (Vector.subtract(Vector.add(this.balls[i].pos, this.balls[i].vel), Vector.add(this.balls[j].pos, this.balls[j].vel)).mod() <= 2 * this.balls[i].radius) {
                    this.balls[i].detectCollision(this.balls[j]);
                }
            }
        }

        let moving = false;

        for (let i = 0; i < 16; i++) {
            if (this.balls[i].moving) {
                moving = true;
                break;
            }
        }

        if (!moving) {
            this.stick.lock = false;
            this.stick.reposition(new Vector(this.whiteball.pos.x, this.whiteball.pos.y));
        } else {
            this.stick.lock = true;
        }

        canvas.ctx.fillStyle = '#19e044';
        canvas.ctx.fillRect(40, 40, canvas.width - 80, canvas.height - 80);
        this.pockets.forEach((pocket) => {
            this.drawSockets(pocket);
        });

        this.balls.forEach((ball) => {
            ball.draw();
        })

        this.pockets.forEach((pocket) => {
            this.balls.forEach((ball) => {
                if (Vector.distance(ball.pos, pocket) < 35) {
                    ball.visible = false;
                }
            })
        })

        this.stick.draw();

    }

    update() {
        this.balls.forEach((ball) => {
            ball.update();
            ball.draw();
        })
        this.stick.update();
    }
}
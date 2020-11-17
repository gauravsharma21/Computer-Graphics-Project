class GameWorld {

    constructor() {
        this.pockets = [];
        this.balls = [];
        let pockets = this.pockets;
        let balls = this.balls;
        this.gameover = false;
        this.penalties = 0;
        this.whiteball = new Ball('white', new Vector(305, 310), new Vector(0, 0));
        this.stick = new Stick(new Vector(this.whiteball.pos.x, this.whiteball.pos.y), this.whiteball.shoot.bind(this.whiteball));
        this.done = false;

        pockets.push(new Vector(70, 70));
        pockets.push(new Vector(canvas.width / 2, 40));
        pockets.push(new Vector(canvas.width - 70, 70));
        pockets.push(new Vector(70, canvas.height - 70));
        pockets.push(new Vector(canvas.width / 2, canvas.height - 40));
        pockets.push(new Vector(canvas.width - 70, canvas.height - 70));

        balls.push(new Ball('red', new Vector(550, 310), new Vector(0, 0)));
        balls.push(new Ball('yellow', new Vector(585, 330), new Vector(0, 0)));
        balls.push(new Ball('red', new Vector(620, 350), new Vector(0, 0)));
        balls.push(new Ball('yellow', new Vector(655, 370), new Vector(0, 0)));
        balls.push(new Ball('red', new Vector(690, 390), new Vector(0, 0)));
        balls.push(new Ball('yellow', new Vector(585, 290), new Vector(0, 0)));
        balls.push(new Ball('red', new Vector(620, 270), new Vector(0, 0)));
        balls.push(new Ball('yellow', new Vector(655, 250), new Vector(0, 0)));
        balls.push(new Ball('red', new Vector(690, 230), new Vector(0, 0)));
        balls.push(new Ball('yellow', new Vector(690, 270), new Vector(0, 0)));
        balls.push(new Ball('red', new Vector(690, 310), new Vector(0, 0)));
        balls.push(new Ball('yellow', new Vector(690, 350), new Vector(0, 0)));
        balls.push(new Ball('red', new Vector(620, 310), new Vector(0, 0)));
        balls.push(new Ball('yellow', new Vector(655, 290), new Vector(0, 0)));

        balls.push(new Ball('#211c1c', new Vector(655, 330), new Vector(0, 0)));
        balls.push(this.whiteball);
    }

    drawSockets(pos) {
        canvas.ctx.fillStyle = 'black'
        canvas.ctx.beginPath();
        canvas.ctx.arc(pos.x, pos.y, 30, 0, 2 * Math.PI);
        canvas.ctx.fill();
        canvas.ctx.closePath();
    }

    draw() {
        let game_score = 0;
        for (let i = 0; i < 16; i++) {
            if (this.balls[i].visible == false) {
                if (this.balls[i].color == 'yellow') game_score += 10;
                else if (this.balls[i].color == 'red') game_score += 20;
                else if (this.balls[i].color == '#211c1c') game_score += 50;
                else {
                    this.penalties++;
                    this.whiteball.respawn();
                }
            }
        }
        this.gameover = true;
        for (let i = 0; i < 15; i++) {
            if (this.balls[i].visible === true) {
                this.gameover = false;
            } else if (this.balls[i].visible === false && this.balls[i].color === "#211c1c") {
                this.gameover = true;
            }
        }

        if (this.gameover === true) {
            canvas.clear()
            canvas.ctx.font = "80px Arial";
            canvas.ctx.fillStyle = "white"
            canvas.ctx.fillText("GAME OVER", 320, 340);
            document.getElementById("button").style.display = "block";
            return;
        } else {
            document.getElementById("button").style.display = "none";
        }

        game_score -= 10 * this.penalties;

        document.getElementById("score").innerHTML = "SCORE: " + game_score + "&nbsp; &nbsp; &nbsp;MOVES: " + moves;

        for (let i = 0; i < 16; i++) {
            for (let j = i + 1; j < 16; j++) {
                if (Vector.subtract(Vector.add(this.balls[i].pos, this.balls[i].vel), Vector.add(this.balls[j].pos, this.balls[j].vel)).mod() < 2 * this.balls[i].radius) {
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
            this.stick.reposition(new Vector(this.whiteball.pos.x, this.whiteball.pos.y), this.whiteball.shoot.bind(this.whiteball));
        } else {
            this.stick.lock = true;
        }

        canvas.ctx.beginPath()
        canvas.ctx.rect(40, 40, canvas.width - 80, canvas.height - 80);
        this.pockets.forEach((pocket) => {
            this.drawSockets(pocket);
        });

        this.balls.forEach((ball) => {
            ball.draw();
        })

        this.pockets.forEach((pocket) => {
            this.balls.forEach((ball) => {
                if (Vector.distance(ball.pos, pocket) <= 45) {
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
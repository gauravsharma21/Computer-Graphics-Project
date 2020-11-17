class Game {

    constructor() {
        this.gameWorld = new GameWorld();
    }

    eventLoop() {
        canvas.clear();
        this.gameWorld.update();
        this.gameWorld.draw();

        requestAnimationFrame(this.eventLoop.bind(this));
    }

    start() {
        this.eventLoop();
    }

}

var moves = 0;
let PoolGame = new Game();
PoolGame.start();
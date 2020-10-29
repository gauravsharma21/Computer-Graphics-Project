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

let PoolGame = new Game();
PoolGame.start();
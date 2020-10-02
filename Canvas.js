class Canvas {
    constructor() {
        this.canvas = document.getElementById('myCanvas');
        this.ctx = this.canvas.getContext("2d");
        this.height = this.canvas.height;
        this.width = this.canvas.width;
    }

    clear() {
        this.ctx.clearRect(0, 0, this.width, this.height);
    }
}

let canvas = new Canvas();
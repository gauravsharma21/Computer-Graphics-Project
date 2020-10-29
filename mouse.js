handleMouseMove = (evt) => {
    let x = evt.pageX;
    let y = evt.pageY;
    mouse._position = new Vector(x, y);
};

class MouseHandler {
    constructor() {
        this._left = new ButtonState();
        this._middle = new ButtonState();
        this._right = new ButtonState();
        this._position = new Vector(0, 0);

        document.onmousemove = handleMouseMove;
        document.onmousedown = (evt) => {
            handleMouseMove(evt);
            if (evt.which === 1) {
                if (!this._left.down)
                    this._left.pressed = true;
                this._left.down = true;
            } else if (evt.which === 2) {
                if (!this._middle.down)
                    this._middle.pressed = true;
                this._middle.down = true;
            } else if (evt.which === 3) {
                if (!this._right.down)
                    this._right.pressed = true;
                this._right.down = true;
            }
        }
        document.onmouseup = (evt) => {
            handleMouseMove(evt);

            if (evt.which === 1)
                this._left.down = false;
            else if (evt.which === 2)
                this._middle.down = false;
            else if (evt.which === 3)
                this._right.down = false;
        }

    }
    reset() {
        this.left.pressed = false;
        this.middle.pressed = false;
        this.right.pressed = false;
    }
}

let mouse = new MouseHandler();
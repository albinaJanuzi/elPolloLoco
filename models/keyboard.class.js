class Keyboard {
    LEFT = false;
    RIGHT = false;
    SPACE = false;
    D = false;//up

    constructor() {
        this.bindKeyEvents();
    }

    bindKeyEvents() {
        this.bindKeyStart();
        this.bindKeyEnd();
    }

    bindKeyEnd() {
        window.addEventListener('keyup', (event) => {
            if (event.keyCode == 39) {
                keyboard.RIGHT = false;
            }
            if (event.keyCode == 37) {
                keyboard.LEFT = false;
            }
            if (event.keyCode == 32) {
                keyboard.SPACE = false;
            }
            if (event.keyCode == 68) {
                keyboard.D = false;
            }
        });
    }

    bindKeyStart() {
        window.addEventListener('keydown', (event) => {
            if (event.keyCode == 39) {
                keyboard.RIGHT = true;
            }
            if (event.keyCode == 37) {
                keyboard.LEFT = true;
            }
            if (event.keyCode == 32) {
                keyboard.SPACE = true;
            }
            if (event.keyCode == 68) {
                keyboard.D = true;
            }
        });
    }
}

/**
 * @class Keyboard
 * 
 * The `Keyboard` class manages keyboard and touch input events for controlling the player.
 * It tracks key presses and releases, as well as touch interactions on specific buttons.
 */
class Keyboard{
    LEFT = false;
    RIGHT = false;
    SPACE = false;
    D = false;

    /**
     * Constructor initializes event listeners for keyboard and touch input.
     */
    constructor() {
        this.bindKeyEvents();
        this.bindTouchEvents();
    }
   
     /**
     * Binds keyboard event listeners for key presses and releases.
     */
    bindKeyEvents() {
        this.bindKeyStart();
        this.bindKeyEnd();
    }

    /**
     * Binds touch event listeners for detecting touch-based controls.
     */
    bindTouchEvents() {
        this.bindTouchStart();
        this.bindTouchEnd();
    }

     /**
     * Adds an event listener to detect touch start events on control buttons.
     * Updates the corresponding key state when a button is touched.
     */
    bindTouchStart() {
        window.addEventListener("touchstart", (e) => {
            if (e.target.id == "btnRight") {
                keyboard.RIGHT = true;
            }
            if (e.target.id == "btnLeft") {
                keyboard.LEFT = true;
            }
            if (e.target.id == "btnJump") {
                keyboard.SPACE = true;
            }
            if (e.target.id == "btnThrow") {
                keyboard.D = true;
            }
        });
    }

    /**
     * Adds an event listener to detect touch end events on control buttons.
     * Resets the corresponding key state when the button is released.
     */
    bindTouchEnd() {
        window.addEventListener("touchend", (e) => {
            if (e.target.id == "btnRight") {
                keyboard.RIGHT = false;
            }
            if (e.target.id == "btnLeft") {
                keyboard.LEFT = false;
            }
            if (e.target.id == "btnJump") {
                keyboard.SPACE = false;
            }
            if (e.target.id == "btnThrow") {
                keyboard.D = false;
            }
        });
    }

     /**
     * Adds an event listener to detect when keys are released.
     * Resets the corresponding key state when a key is lifted.
     */
    bindKeyEnd() {
        window.addEventListener('keyup', (event) => {
            if (event.keyCode == 39) {// Right arrow key
                keyboard.RIGHT = false;
            }
            if (event.keyCode == 37) {// Left arrow key
                keyboard.LEFT = false;
            }
            if (event.keyCode == 32) { // Space key
                keyboard.SPACE = false;
            }
            if (event.keyCode == 68) {// "D" key
                keyboard.D = false;
            }
        });
    }

    /**
     * Adds an event listener to detect when keys are pressed.
     * Updates the corresponding key state when a key is pressed down.
     */
    bindKeyStart() {
        window.addEventListener('keydown', (event) => {
            if (event.keyCode == 39) {// Right arrow key
                keyboard.RIGHT = true;
            }
            if (event.keyCode == 37) {// Left arrow key
                keyboard.LEFT = true;
            }
            if (event.keyCode == 32) {// Space key
                keyboard.SPACE = true;
            }
            if (event.keyCode == 68) {// "D" key
                keyboard.D = true;
            }
        });
    }

}
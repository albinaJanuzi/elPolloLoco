/**
 * @class Cloud
 * @extends MovableObject
 * 
 * The Cloud class represents a cloud object in the game. It extends the MovableObject class and
 * is responsible for moving horizontally across the screen at a specific speed.
 */
class Cloud extends MovableObject{
    y = 20;
    width = 500;
    height = 250;

    /**
     * Creates a new Cloud instance.
     * Initializes the cloud's image, position, and starts the cloud movement.
     */
    constructor(){
        super().loadImage('img/5_background/layers/4_clouds/1.png');
        this.x = Math.random() * 500;// Zahl zwischen 0 und 500
        this.animate();
    }

    /**
     * Starts the cloud movement animation.
     * Calls the `moveLeft` method to initiate horizontal movement.
     */
    animate(){
       this.moveLeft();
    }

    /**
     * Moves the cloud to the left by decreasing its x-position.
     * The cloud's position is updated at a fixed interval (60 FPS).
     */
    moveLeft(){
        setInterval(() => {
            this.x -= this.speed;
         }, 1000/60);
    }
}
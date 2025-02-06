/**
 * @class Coin
 * @extends MovableObject
 * 
 * The Coin class represents a collectible coin in the game. It extends the MovableObject class and
 * is responsible for displaying an animated coin image that can be collected by the player.
 */
class Coin extends MovableObject{
    IMAGES_GROUND = [
        'img/8_coin/coin_1.png',
        'img/8_coin/coin_2.png'
    ];

    height = 100;
    width = 100;
    offset = {
         top: 20,
        bottom: 20,
        left: 20,
        right: 20,
    };

    /**
     * Creates a new Coin instance.
     * Initializes the coin's position, image, and starts the animation.
     * 
     * @param {number} x - The x-coordinate for the coin's position.
     */
    constructor(x) {
        super().loadImage('img/8_coin/coin_1.png');
        this.loadImages(this.IMAGES_GROUND);
        this.x = x;
        this.y = 30 + Math.random() * 200;
        this.animate();
    }

    /**
     * Starts the animation of the coin.
     * The coin image alternates between two states at a fixed interval (500ms).
     */
    animate() {
        setInterval(() => { 
            this.playAnimation(this.IMAGES_GROUND);
        }, 500);
    }
}
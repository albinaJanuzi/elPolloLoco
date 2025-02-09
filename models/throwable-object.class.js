/**
 * @class ThrowableObject
 * 
 * Represents throwable objects in the game, such as salsa bottles.
 * This class extends `MovableObject` and includes animations for throwing and splashing.
 */
class ThrowableObject extends MovableObject{
    speedY = 25;

    IMAGES_THROW = [
        'img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png'
    ];

    IMAGES_SPLASH = [
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png'
    ];

     /**
     * Creates a throwable object at the specified position and starts the throw action.
     * 
     * @param {number} x - The starting x-coordinate of the object.
     * @param {number} y - The starting y-coordinate of the object.
     */
    constructor(x, y) {
        super().loadImage('img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png');
        this.loadImages(this.IMAGES_THROW);
        this.loadImages(this.IMAGES_SPLASH);
        this.x = x;
        this.y = y;
        this.height = 60;
        this.width = 50;
        this.throw();
    }

    /**
     * Makes the throwable object move forward and play its rotation animation.
     * It also applies gravity, causing the object to fall over time.
     */
    throw() {
        this.applyGravity();
        this.throwBottle = setInterval(() => {
            this.x += 10;
            this.playAnimation(this.IMAGES_THROW);
        }, 25);
    }
    
    /**
     * Stops the throwing motion and plays the splash animation when the object hits the ground.
     */
    animateSplash() {
        this.speedY = 0;
        clearInterval(this.throwBottle);
        this.playAnimation(this.IMAGES_SPLASH);
    }
}
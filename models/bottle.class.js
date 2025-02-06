/**
 * @class Bottle
 * @extends MovableObject
 * 
 * The Bottle class represents a bottle object in the game. 
 * It extends the MovableObject class, inheriting movement-related properties and methods.
 */
class Bottle extends MovableObject {

    IMAGES_GROUND = [
        'img/6_salsa_bottle/1_salsa_bottle_on_ground.png',
        'img/6_salsa_bottle/2_salsa_bottle_on_ground.png'
    ];

    y = 378;
    height = 60;
    width = 60;
    offset = {
        top: 10,
        bottom: 10,
        left: 15,
        right: 10,
    };
    isExploded = false;

    /**
     * Creates a new Bottle instance.
     * The bottle is assigned a random x-position within a defined range.
     */
    constructor() {
        super().loadImage('img/6_salsa_bottle/1_salsa_bottle_on_ground.png');
        this.loadImages(this.IMAGES_GROUND);
        this.x = 250 + Math.random() * 2600;
        this.animate();
    }

    /**
     * Animates the bottle by switching between images at a fixed interval.
     */
    animate() {
        setInterval(() => {
            this.playAnimation(this.IMAGES_GROUND);
        }, 500);
    }
}
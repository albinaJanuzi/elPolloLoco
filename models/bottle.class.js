// The Bottle class extends MovableObject, inheriting its properties and methods
class Bottle extends MovableObject {
   
    // Array containing the images of the bottle when it's on the ground
    IMAGES_GROUND = [
        'img/6_salsa_bottle/1_salsa_bottle_on_ground.png',
        'img/6_salsa_bottle/2_salsa_bottle_on_ground.png'
    ];

    y = 378; // Default y-position of the bottle on the ground

    // Dimensions of the bottle.
    height = 60;
    width = 60;

    // Defines an offset for collision detection 
    offset = {
        top: 10,
        bottom: 10,
        left: 15,
        right: 10,
    };

    isExploded = false; // Flag to check if the bottle has exploded.

    /**
     * Constructor initializes the bottle object.
     */

    constructor() {
        // Call the parent class constructor and load the default image.
        super().loadImage('img/6_salsa_bottle/1_salsa_bottle_on_ground.png'); // Load all images for the bottle's animation.
        this.x = 250 + Math.random() * 2600; // Set a random x-position for the bottle within a range (250 to 2850).
        this.animate(); // Start the animation loop.
    }

    /**
     * Animates the bottle by switching between images in IMAGES_GROUND every 500ms.
     */
    animate() {
        setInterval(() => {
            this.playAnimation(this.IMAGES_GROUND);
        }, 500);
    }
}
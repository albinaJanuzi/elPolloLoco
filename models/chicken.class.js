/**
 * @class Chicken
 * @extends MovableObject
 * 
 * The Chicken class represents an enemy chicken character in the game. 
 * It extends the MovableObject class, providing movement and collision functionality.
 * This class handles the chicken's animation, movement, health, and death behavior.
 */
class Chicken extends MovableObject {
    /** @type {number} Random multiplier for the chicken's height and y-position. */
    multiplier = Math.random() * 50;
    speedY = 10;
    health = 100;
    offset = {
        top: 0,
        bottom: 5,
        left: 0,
        right: 0,
    };

    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
    ];

    IMAGES_DEAD = [
        'img/3_enemies_chicken/chicken_normal/2_dead/dead.png'
    ];

    cackle_sound = new Audio('audio/chickenCackle.mp3?' + new Date().getTime());  // Cache busting

    /**
     * Creates a new Chicken instance.
     * Initializes the chicken's image, sound effects, random properties, and animations.
     */
    constructor() {
        super().loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.loadAllImages();
        this.setRandomProperties();
        this.animate();
        this.preloadAudio();

        sounds.push(this.cackle_sound); // Add to global sounds array
    }

    /**
     * Preloads the chicken cackle sound to avoid delay when played.
     */
    preloadAudio() {
        this.cackle_sound.load(); // Preload the audio to avoid delay
    }

    /**
     * Loads all the image assets for the chicken's walking and dead animations.
     */
    loadAllImages() {
        [this.IMAGES_WALKING, this.IMAGES_DEAD].forEach(images => this.loadImages(images));
    }

    /**
     * Sets random properties for the chicken's position, size, and movement speed.
     */
    setRandomProperties() {
        this.x = 500 + Math.random() * 2000;
        this.y = 350 - this.multiplier;
        this.height = 80 + this.multiplier;
        this.speed = 0.15 + Math.random() * 0.5;
    }

    /**
     * Starts the chicken's animation and movement loop.
     */
    animate() {
        this.moveChicken();
        this.checkDead();
    }

    /**
     * Moves the chicken left and plays the walking animation.
     */
    moveChicken() {
        this.startInterval(() => this.moveLeft(), 1000 / 60, 'walkingChicken');
        this.startInterval(() => this.playAnimation(this.IMAGES_WALKING), 150, 'walkingChickenAnimation');
    }

    /**
     * Starts an interval for a given action and interval time.
     * @param {Function} action - The action to perform.
     * @param {number} interval - The interval time in milliseconds.
     * @param {string} name - The name of the interval for later reference.
     */
    startInterval(action, interval, name) {
        this[name] = setInterval(action, interval);
    }

    /**
     * Checks if the chicken is dead and handles its death behavior.
     */
    checkDead() {
        setInterval(() => {
            if (!this.isDead()) return;
            this.handleDeath();
        }, 50);
    }

    /**
     * Handles the chicken's death by playing the death animation and sound.
     */
    handleDeath() {
        this.loadImage(this.IMAGES_DEAD);
        this.stopMovement();
        this.cackle_sound.play();  // Play the sound when the chicken dies
        setTimeout(() => this.y += this.speedY, 500);
    }

    /**
     * Stops the chicken's movement by clearing the intervals.
     */
    stopMovement() {
        clearInterval(this.walkingChickenAnimation);
        clearInterval(this.walkingChicken);
    }
}

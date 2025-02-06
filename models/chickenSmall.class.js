/**
 * @class ChickenSmall
 * @extends MovableObject
 * 
 * The ChickenSmall class represents a small enemy chicken character in the game. 
 * It extends the MovableObject class and handles walking, animation, death behavior, 
 * and the associated sound effects for the chicken.
 */
class ChickenSmall extends MovableObject {
    y = 360;
    height = 65; 
    width = 55;
    health = 100;
    speedY = 10;
    offset = {
        top: 5,
        bottom: 5,
        left: 5,
        right: 5,
    };

    cackle_sound = new Audio('audio/chickenCackle.mp3?' + new Date().getTime()); // Cache-busting

    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/3_w.png'
    ];
    IMAGES_DEAD = [
        'img/3_enemies_chicken/chicken_small/2_dead/dead.png'
    ];


    /**
     * Creates a new ChickenSmall instance.
     * Initializes the chicken's image, sound effects, random properties, and animations.
     */
    constructor() {
        super().loadImage('img/3_enemies_chicken/chicken_small/1_walk/1_w.png');
        this.initChicken(); // Initialize the chicken properties and sound
        this.animate();
    }

    /**
     * Initializes the chicken's properties and sound effects.
     */
    initChicken() {
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_DEAD);
        this.x = 700 + Math.random() * 2000;
        this.speed = 0.15 + Math.random() * 0.5;
        sounds.push(this.cackle_sound); // Add cackle sound to global sounds
    }

    /**
     * Starts the chicken's animation and movement loop.
     */
    animate() {
        this.moveChicken();
        this.checkDead();
    }

    /**
     * Moves the chicken by starting its walking movement and animation.
     */
    moveChicken() {
        this.startWalking();
        this.startWalkingAnimation();
    }

    /**
     * Starts the walking movement interval for the chicken.
     */
    startWalking() {
        this.walkingChicken = setInterval(() => {
            this.moveLeft();
        }, 1000 / 60);
    }

    /**
     * Starts the walking animation interval for the chicken.
     */
    startWalkingAnimation() {
        this.walkingChickenAnimation = setInterval(() => {
            this.playAnimation(this.IMAGES_WALKING);
        }, 150);
    }

    /**
     * Checks if the chicken is dead and handles its death.
     */
    checkDead() {
        setInterval(() => {
            if (this.isDead()) {
                this.handleDeath(); // Delegate the death handling to another method
            }
        }, 50);
    }

    /**
     * Handles all actions related to the chicken's death.
     * - Stops movement and animation
     * - Plays the cackle sound
     * - Applies a death effect (falling)
     */
    handleDeath() {
        this.loadImage(this.IMAGES_DEAD);
        this.stopMovement(); // Stop movement and animation
        this.playCackleSound(); // Play the cackle sound when chicken dies
        this.applyDeathEffect(); // Apply death effect after a delay
    }

    /**
     * Stops the chicken's movement and animation.
     */
    stopMovement() {
        clearInterval(this.walkingChicken); // Stop movement
        clearInterval(this.walkingChickenAnimation); // Stop animation
    }

    /**
     * Applies a death effect, making the chicken fall after a short delay.
     */
    applyDeathEffect() {
        setTimeout(() => {
            this.y += this.speedY; // Apply death effect
        }, 500);
    }

    /**
     * Plays the cackle sound if it is not already playing.
     */
    playCackleSound() {
        if (this.shouldPlaySound()) {
            this.cackle_sound.play();
            this.cackle_sound.onended = () => {
                this.resetCackleSound(); // Reset after the sound ends
            };
        }
    }

    /**
     * Checks if the cackle sound should be played.
     * @returns {boolean} True if the sound should play, false otherwise.
     */
    shouldPlaySound() {
        return this.cackle_sound.paused || this.cackle_sound.currentTime === 0;
    }

    /**
     * Resets the cackle sound after it finishes playing.
     */
    resetCackleSound() {
        this.cackle_sound.pause();
        this.cackle_sound.currentTime = 0; 
    }
}

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

    constructor() {
        super().loadImage('img/3_enemies_chicken/chicken_small/1_walk/1_w.png');
        this.initChicken(); // Initialize the chicken properties and sound
        this.animate();
    }

    // Handle initialization tasks
    initChicken() {
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_DEAD);
        this.x = 700 + Math.random() * 2000;
        this.speed = 0.15 + Math.random() * 0.5;
        sounds.push(this.cackle_sound); // Add cackle sound to global sounds
    }

    animate() {
        this.moveChicken();
        this.checkDead();
    }

    moveChicken() {
        this.startWalking();
        this.startWalkingAnimation();
    }

    // Handle the walking movement interval
    startWalking() {
        this.walkingChicken = setInterval(() => {
            this.moveLeft();
        }, 1000 / 60);
    }

    // Handle the walking animation interval
    startWalkingAnimation() {
        this.walkingChickenAnimation = setInterval(() => {
            this.playAnimation(this.IMAGES_WALKING);
        }, 150);
    }

    checkDead() {
        setInterval(() => {
            if (this.isDead()) {
                this.handleDeath(); // Delegate the death handling to another method
            }
        }, 50);
    }

    // Handle all actions related to death
    handleDeath() {
        this.loadImage(this.IMAGES_DEAD);
        this.stopMovement(); // Stop movement and animation
        this.playCackleSound(); // Play the cackle sound when chicken dies
        this.applyDeathEffect(); // Apply death effect after a delay
    }

    // Stop movement and animation
    stopMovement() {
        clearInterval(this.walkingChicken); // Stop movement
        clearInterval(this.walkingChickenAnimation); // Stop animation
    }

    // Handle death effect after a delay
    applyDeathEffect() {
        setTimeout(() => {
            this.y += this.speedY; // Apply death effect
        }, 500);
    }

    // Play the cackle sound if it's not already playing
    playCackleSound() {
        if (this.shouldPlaySound()) {
            this.cackle_sound.play();
            this.cackle_sound.onended = () => {
                this.resetCackleSound(); // Reset after the sound ends
            };
        }
    }

    // Check if the sound should be played
    shouldPlaySound() {
        return this.cackle_sound.paused || this.cackle_sound.currentTime === 0;
    }

    // Reset the sound after it ends
    resetCackleSound() {
        this.cackle_sound.pause();
        this.cackle_sound.currentTime = 0; // Reset to the beginning for future use
    }
}

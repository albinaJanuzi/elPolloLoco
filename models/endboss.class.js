/**
 * @class Endboss
 * 
 * The `Endboss` class represents the final boss enemy in the game. 
 * It extends `MovableObject` and manages animations, movement, and interactions.
 */
class Endboss extends MovableObject {
    y = 5;
    height = 450;
    width = 350;
    speed = 20;
    health = 100;
    firstContact = false;
    offset = {
        top: 80,
        bottom: 15,
        left: 20,
        right: 10,
    };
    bossAppear_sound = new Audio('audio/boss_appears.mp3');

    IMAGES_ALERT = [
        'img/4_enemie_boss_chicken/2_alert/G5.png',
        'img/4_enemie_boss_chicken/2_alert/G6.png',
        'img/4_enemie_boss_chicken/2_alert/G7.png',
        'img/4_enemie_boss_chicken/2_alert/G8.png',
        'img/4_enemie_boss_chicken/2_alert/G9.png',
        'img/4_enemie_boss_chicken/2_alert/G10.png',
        'img/4_enemie_boss_chicken/2_alert/G10.png',
        'img/4_enemie_boss_chicken/2_alert/G11.png',
        'img/4_enemie_boss_chicken/2_alert/G12.png'
    ];
    IMAGES_WALK = [
        'img/4_enemie_boss_chicken/1_walk/G1.png',
        'img/4_enemie_boss_chicken/1_walk/G2.png',
        'img/4_enemie_boss_chicken/1_walk/G3.png',
        'img/4_enemie_boss_chicken/1_walk/G4.png'
    ];
    IMAGES_ATTACK = [
        'img/4_enemie_boss_chicken/3_attack/G13.png',
        'img/4_enemie_boss_chicken/3_attack/G14.png',
        'img/4_enemie_boss_chicken/3_attack/G15.png',
        'img/4_enemie_boss_chicken/3_attack/G16.png',
        'img/4_enemie_boss_chicken/3_attack/G17.png',
        'img/4_enemie_boss_chicken/3_attack/G18.png',
        'img/4_enemie_boss_chicken/3_attack/G19.png',
        'img/4_enemie_boss_chicken/3_attack/G20.png'
    ];
    IMAGES_HURT = [
        'img/4_enemie_boss_chicken/4_hurt/G21.png',
        'img/4_enemie_boss_chicken/4_hurt/G22.png',
        'img/4_enemie_boss_chicken/4_hurt/G23.png'
    ];
    IMAGES_DEAD = [
        'img/4_enemie_boss_chicken/5_dead/G24.png',
        'img/4_enemie_boss_chicken/5_dead/G25.png',
        'img/4_enemie_boss_chicken/5_dead/G26.png'
    ];


    /**
     * Constructor initializes the boss by loading images and starting animations.
     */
    constructor() {
        super().loadImage(this.IMAGES_ALERT[0]);
        this.loadAllImages();
        sounds.push(this.bossAppear_sound);
        this.x = 3000;
        this.animateEndboss();
    }

    /**
    * Loads all images required for boss animations.
    */
    loadAllImages() {
        this.loadImages(this.IMAGES_ALERT);
        this.loadImages(this.IMAGES_WALK);
        this.loadImages(this.IMAGES_ATTACK);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);
    }

    /**
    * Starts the animation loop for the boss.
    */
    animateEndboss() {
        setInterval(() => {
            this.handleAnimation();
        }, 200);
    }

    /**
    * Handles the boss animations based on its current state.
    */
    handleAnimation() {
        if (this.isHurt() && !this.isDead()) {
            this.handleHurt();
        } else if (this.isDead()) {
            this.handleDeath();
        } else if (this.firstContact) {
            this.bossAppears();
        } else {
            this.handleAlert();
        }
    }

    /**
     * Plays the hurt animation.
     */
    handleHurt() {
        this.playAnimation(this.IMAGES_HURT);
    }

    /**
    * Handles the boss's death sequence, stopping movement and playing the death animation.
    */
    handleDeath() {
        this.speed = 0;
        let deathInterval = setInterval(() => {
            this.playAnimation(this.IMAGES_DEAD);
        }, 200); // Faster animation (100ms instead of default 200ms)

        setTimeout(() => {
            clearInterval(deathInterval); // Stop animation after 1 second
            winGame();
        }, 2000); // End boss death sequence in 1 second
    }

    /**
    * Plays the alert animation when the boss is first seen.
    */
    handleAlert() {
        this.playAnimation(this.IMAGES_ALERT);
    }

    /**
     * Starts the boss's appearance sequence, playing sound and moving towards the player.
     */
    bossAppears() {
        this.bossAppear_sound.play();
        this.playAnimation(this.IMAGES_WALK);
        this.moveLeft();
        setTimeout(() => {
            this.bossAppear_sound.pause();
        }, 5000);
    }
}
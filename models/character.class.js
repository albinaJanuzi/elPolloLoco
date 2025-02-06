class Character extends MovableObject {

    y = 72;
    height = 370;
    width = 130;
    speed = 10;
    offset = {
        top: 140,
        bottom: 15,
        left: 20,
        right: 20,
    };
    world;
    walk_sound = new Audio('./audio/walking.mp3');
    jump_sound = new Audio('audio/jump.mp3');
    hurt_sound = new Audio('audio/hurt.mp3');

    IMAGES_IDLE = [
        'img/2_character_pepe/1_idle/idle/I-1.png',
        'img/2_character_pepe/1_idle/idle/I-2.png',
        'img/2_character_pepe/1_idle/idle/I-3.png',
        'img/2_character_pepe/1_idle/idle/I-4.png',
        'img/2_character_pepe/1_idle/idle/I-5.png',
        'img/2_character_pepe/1_idle/idle/I-6.png',
        'img/2_character_pepe/1_idle/idle/I-7.png',
        'img/2_character_pepe/1_idle/idle/I-8.png',
        'img/2_character_pepe/1_idle/idle/I-9.png',
        'img/2_character_pepe/1_idle/idle/I-10.png'
    ];

    IMAGES_LONG_IDLE = [
        'img/2_character_pepe/1_idle/long_idle/I-11.png',
        'img/2_character_pepe/1_idle/long_idle/I-12.png',
        'img/2_character_pepe/1_idle/long_idle/I-13.png',
        'img/2_character_pepe/1_idle/long_idle/I-14.png',
        'img/2_character_pepe/1_idle/long_idle/I-15.png',
        'img/2_character_pepe/1_idle/long_idle/I-16.png',
        'img/2_character_pepe/1_idle/long_idle/I-17.png',
        'img/2_character_pepe/1_idle/long_idle/I-18.png',
        'img/2_character_pepe/1_idle/long_idle/I-19.png',
        'img/2_character_pepe/1_idle/long_idle/I-20.png'
    ];

    IMAGES_WALKING = [
        '../img/2_character_pepe/2_walk/W-21.png',
        '../img/2_character_pepe/2_walk/W-22.png',
        '../img/2_character_pepe/2_walk/W-23.png',
        '../img/2_character_pepe/2_walk/W-24.png',
        '../img/2_character_pepe/2_walk/W-25.png',
        '../img/2_character_pepe/2_walk/W-26.png'
    ];

    IMAGES_JUMPING = [
        'img/2_character_pepe/3_jump/J-31.png',
        'img/2_character_pepe/3_jump/J-32.png',
        'img/2_character_pepe/3_jump/J-33.png',
        'img/2_character_pepe/3_jump/J-34.png',
        'img/2_character_pepe/3_jump/J-35.png',
        'img/2_character_pepe/3_jump/J-36.png',
        'img/2_character_pepe/3_jump/J-37.png',
        'img/2_character_pepe/3_jump/J-38.png',
        'img/2_character_pepe/3_jump/J-39.png'
    ];

    IMAGES_DEAD = [
        'img/2_character_pepe/5_dead/D-51.png',
        'img/2_character_pepe/5_dead/D-52.png',
        'img/2_character_pepe/5_dead/D-53.png',
        'img/2_character_pepe/5_dead/D-54.png',
        'img/2_character_pepe/5_dead/D-55.png',
        'img/2_character_pepe/5_dead/D-56.png',
        'img/2_character_pepe/5_dead/D-57.png'
    ];

    IMAGES_HURT = [
        'img/2_character_pepe/4_hurt/H-41.png',
        'img/2_character_pepe/4_hurt/H-42.png',
        'img/2_character_pepe/4_hurt/H-43.png'
    ];


    constructor() {
        super().loadImage('../img/2_character_pepe/2_walk/W-21.png');
        this.loadAllImages();
        this.applyGravity();
        this.animate();
        this.loadSounds();
    }

    loadAllImages() {
        [this.IMAGES_IDLE, this.IMAGES_LONG_IDLE, this.IMAGES_WALKING,
        this.IMAGES_JUMPING, this.IMAGES_HURT, this.IMAGES_DEAD].forEach(images => this.loadImages(images));
    }

    loadSounds() {
        sounds.push(this.walk_sound, this.jump_sound, this.hurt_sound);
    }

    animate() {
        this.moveCharacter();
        this.animateCharacter();
    }

    moveCharacter() {
        setInterval(() => {
            this.handleMovement();
            this.world.camera_x = -this.x + 100;
        }, 1000 / 60);
    }

    handleMovement() {
        this.walk_sound.pause();

        if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
            this.moveRightWithSound(false);
        }
        if (this.world.keyboard.LEFT && this.x > 100) {
            this.moveLeftWithSound(true);
        }
        if (this.world.keyboard.SPACE && !this.isAboveGround()) {
            this.jumpWithSound();
        }
    }

    moveRightWithSound(direction) {
        this.moveRight();
        this.otherDirection = direction;
        this.walk_sound.play();
    }

    moveLeftWithSound(direction) {
        this.moveLeft();
        this.otherDirection = direction;
        this.walk_sound.play();
    }

    jumpWithSound() {
        this.jump();
        this.jump_sound.play();
    }

    animateCharacter() {
        setInterval(() => {
            this.handleAnimation();
        }, 100);
    }

    handleAnimation() {
        if (this.isHurt()) return this.playWithSound(this.IMAGES_HURT, this.hurt_sound);
        if (this.isDead()) return this.handleDeath();
        if (this.isAboveGround()) return this.updateAndPlay(this.IMAGES_JUMPING);
        if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) return this.updateAndPlay(this.IMAGES_WALKING);
        if (this.sleepTime()) return this.playAnimation(this.IMAGES_LONG_IDLE);

        this.playAnimation(this.IMAGES_IDLE);
    }

    playWithSound(images, sound) {
        this.playAnimation(images);
        sound.play();
    }

    handleDeath() {
        this.playAnimation(this.IMAGES_DEAD);
        this.walk_sound.pause();
        loseGame();
    }

    updateAndPlay(images) {
        this.updateMoveTime();
        this.playAnimation(images);
    }

    updateMoveTime() {
        let currentTime = new Date().getTime();
        this.lastMoveTime = currentTime;
    }

    sleepTime() {
        let passedTime = new Date().getTime() - this.lastMoveTime;
        return passedTime > 8000;
    }

    jump() {
        this.speedY = 30;
    }
}
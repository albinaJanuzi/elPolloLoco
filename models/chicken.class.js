class Chicken extends MovableObject {
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

    constructor() {
        super().loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.loadAllImages();
        this.setRandomProperties();
        this.animate();
        this.preloadAudio();

        sounds.push(this.cackle_sound); // Add to global sounds array
    }

    preloadAudio() {
        this.cackle_sound.load(); // Preload the audio to avoid delay
    }

    loadAllImages() {
        [this.IMAGES_WALKING, this.IMAGES_DEAD].forEach(images => this.loadImages(images));
    }

    setRandomProperties() {
        this.x = 500 + Math.random() * 2000;
        this.y = 350 - this.multiplier;
        this.height = 80 + this.multiplier;
        this.speed = 0.15 + Math.random() * 0.5;
    }

    animate() {
        this.moveChicken();
        this.checkDead();
    }

    moveChicken() {
        this.startInterval(() => this.moveLeft(), 1000 / 60, 'walkingChicken');
        this.startInterval(() => this.playAnimation(this.IMAGES_WALKING), 150, 'walkingChickenAnimation');
    }

    startInterval(action, interval, name) {
        this[name] = setInterval(action, interval);
    }

    checkDead() {
        setInterval(() => {
            if (!this.isDead()) return;
            this.handleDeath();
        }, 50);
    }

    handleDeath() {
        this.loadImage(this.IMAGES_DEAD);
        this.stopMovement();
        this.cackle_sound.play();  // Play the sound when the chicken dies
        setTimeout(() => this.y += this.speedY, 500);
    }

    stopMovement() {
        clearInterval(this.walkingChickenAnimation);
        clearInterval(this.walkingChicken);
    }
}

class ChickenSmall extends MovableObject {
    y = 370;
    height = 55;
    width = 55;
    health = 100;
    speedY = 10;
    offset = {
        top: 5,
        bottom: 5,
        left: 5,
        right: 5,
    };
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
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_DEAD);
        this.x = 700 + Math.random() * 2000;
        this.speed = 0.15 + Math.random() * 0.5;
        this.animate();
    }

    animate() {
        this.moveChicken();
    }

    moveChicken() {
        this.walkingChicken = setInterval(() => {
            this.moveLeft();
        }, 1000 / 60);

        this.walkingChickenAnimation = setInterval(() => {
            this.playAnimation(this.IMAGES_WALKING);
        }, 150);
    }
}
class Chicken extends MovableObject {
    y = 360;
    height = 55;
    width = 70;
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

    constructor() {
        super().loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_DEAD);
        this.x = 200 + Math.random() * 1500;// Zahl zwischen 200 und 700
        this.speed = 0.15 + Math.random() * 0.5; //Alle Chicken andere speed, Math.random zahlen zwischen 0 und 1
        this.animate();
    }

    animate() {
        this.moveChicken();
        this.checkDead();
    }

    moveChicken() {
        this.walkingChicken = setInterval(() => {
            this.moveLeft();
        }, 1000 / 60); 
        
        this.walkingChickenAnimation = setInterval(() => {
            this.playAnimation(this.IMAGES_WALKING);
        }, 150);
    }

    checkDead() {
        setInterval(() => {
            if (this.isDead()) {
                this.loadImage(this.IMAGES_DEAD);
                clearInterval(this.walkingChickenAnimation)
                clearInterval(this.walkingChicken)
                setTimeout(() => {
                    this.y += this.speedY;
                }, 500);
            };
        }, 50);
    }
}
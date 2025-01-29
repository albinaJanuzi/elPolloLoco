class Chicken extends MovableObject{
    y = 360;
    height = 55;
    width = 70;
    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
    ];

    IMAGES_DEAD = [
        'img/3_enemies_chicken/chicken_normal/2_dead/dead.png'
    ];

    constructor(){
        super().loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.loadImages(this.IMAGES_WALKING);
        this.x = 200 + Math.random() * 1500;// Zahl zwischen 200 und 700
        this.speed = 0.15 + Math.random() * 0.5; //Alle Chicken andere speed, Math.random zahlen zwischen 0 und 1
        this.animate();
    }

    animate(){
        setInterval(() =>{
            this.moveLeft();
        }, 1000/60);

        setInterval(() => {
            this.playAnimation(this.IMAGES_WALKING);
    }, 200);
    }
}
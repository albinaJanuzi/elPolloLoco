class Coin extends MovableObject{
    IMAGES_GROUND = [
        'img/8_coin/coin_1.png',
        'img/8_coin/coin_2.png'
    ];

    height = 80;
    width = 80;
    offset = {
        top: 20,
        bottom: 20,
        left: 20,
        right: 20,
    };

    constructor(x) {
        super().loadImage('img/8_coin/coin_1.png');
        this.loadImages(this.IMAGES_GROUND);
        this.x = x;
        this.y = 30 + Math.random() * 200;
        this.animate();
    }

    animate() {
        setInterval(() => { 
            this.playAnimation(this.IMAGES_GROUND);
        }, 500);
    }
}
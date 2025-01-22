class Cloud extends MovableObject{
    y = 20;
    width = 500;
    height = 250;
    speed = 0.15;

    constructor(){
        super().loadImage('img/5_background/layers/4_clouds/1.png');
        this.x = Math.random() * 500;// Zahl zwischen 0 und 500
        this.animate();
    }

    animate(){
        setInterval(() => {
       this.x -= this.speed;
    }, 1000/60);
    }
}
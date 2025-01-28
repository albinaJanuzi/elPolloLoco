class MovableObject {
    x = 120;
    y = 280;
    img;
    height = 150;
    width = 100;
    imageCache = {};
    currentImage = 0;
    speed = 0.15;
    otherDirection = false;
    speedY = 0;
    acceleration = 2.5;
    energy = 100;
    lastHit = 0;

    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 25);// x25 pro sek.
    }

    //Ist der Character in Boden?
    isAboveGround() {
        return this.y < 180;
    }

    loadImage(path) {
        this.img = new Image(); // gleich wie document.getElementbyId
        this.img.src = path;
    }

    draw(ctx){
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

    drawFrame(ctx){
        if (this instanceof Character || this instanceof Chicken){//draw Frame nur für Character und Chicken (nicht für Clouds, oder background)
            ctx.beginPath();
            ctx.lineWidth = '5';
            ctx.strokeStyle = 'blue';
            ctx.rect(this.x, this.y, this.width, this.height);
            ctx.stroke();
        }
    }

    isColliding(mo){// is Colliding(chicken)
        return this.x + this.width > mo.x &&
        this.y + this.height > mo.y &&
        this.x < mo.x &&
        this.y < mo.y + mo.height;
    }

    hit(){
        this.energy -= 5;
        if (this.energy < 0) {//Energy geht nicht unter 0
            this.energy = 0;
        }else{
            this.lastHit = new Date().getTime();
        }
    }

    isHurt(){
        //let timepassed = new Date().getTime() - this.lastHit; // Difference in ms
        let timepassed = (new Date().getTime() - this.lastHit) / 1000;
        timepassed - timepassed / 1000; // Difference in s
        return timepassed < 0.8;
    }

    isDead(){
        return this.energy == 0;
    }

    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            img.style = 'transform: scaleX(-1)'
            this.imageCache[path] = img;
        });
    }

    playAnimation(images) {
        let i = this.currentImage % images.length;//i=0,1,2,3,4,5,0,1,2,3..., weil let i=6 % 6
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    moveRight() {
        this.x += this.speed;
    }

    moveLeft() {
            this.x -= this.speed;   
    }

    jump() {
        this.speedY = 30;
    }
}
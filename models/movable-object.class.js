class MovableObject extends DrawableObject{
    speed = 0.15;
    otherDirection = false;
    speedY = 0;
    acceleration = 2.5;
    energy = 100;
    bottles = 0;
    coins = 0;
    lastHit = 0;
    
    offset = {
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
    };

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
        if(this instanceof ThrowableObject){//Throwable Objects müssen immer wieder fallen
            return true;
        }else{
            return this.y < 180;
        }
        
    }

    isColliding(mo) {
        return this.x + this.width - this.offset.right > mo.x + mo.offset.left &&  
            this.y + this.height - this.offset.bottom > mo.y + mo.offset.top && 
            this.x + this.offset.left < mo.x + mo.width - mo.offset.right && 
            this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom;
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
        let timepassed = (new Date().getTime() - this.lastHit)/1000;
        timepassed - timepassed / 1000; // Difference in s
        return timepassed < 1;
    }

    isDead(){
        return this.energy == 0;
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
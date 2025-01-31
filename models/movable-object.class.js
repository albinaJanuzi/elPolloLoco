class MovableObject extends DrawableObject{
    speed = 0.15;
    otherDirection = false;
    speedY = 0;
    acceleration = 2.5;
    health = 100;
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
            // Only apply gravity if the character is in the air or falling
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
    
            // Reset speedY if the character hits the ground (adjust as needed for your game)
            if (this.y >= 350) { // Example ground level (350), change as per your game
                this.y = 350; // Set to ground level
                this.speedY = 0; // Reset vertical speed after landing
            }
        }, 1000 / 25);
    }

    //Ist der Character in Boden?
    isAboveGround() {
        if (this instanceof ThrowableObject) { // Throwable Objects always fall
            return true;
        } else {
            return this.y < 180; // Adjust this threshold as needed
        }
    }

    isColliding(mo) {
        return this.x + this.width - this.offset.right > mo.x + mo.offset.left &&  
            this.y + this.height - this.offset.bottom > mo.y + mo.offset.top && 
            this.x + this.offset.left < mo.x + mo.width - mo.offset.right && 
            this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom;
    }

    hit(){
        this.health -= 5;
        if (this.health < 0) {//health geht nicht unter 0
            this.health = 0;
        }else{
            this.lastHit = new Date().getTime();
        }
        if (this instanceof Endboss) {
            this.health -= 20;
        }
    }

    isHurt(){
        //let timepassed = new Date().getTime() - this.lastHit; // Difference in ms
        let timepassed = (new Date().getTime() - this.lastHit)/1000;
        timepassed - timepassed / 1000; // Difference in s
        return timepassed < 1;
    }

    isDead(){
        return this.health == 0;
    }

    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
    
        if (this.imageCache[path]) {
            this.img = this.imageCache[path];
        } else {
            console.error("Image not found in cache:", path);
        }
        
        this.currentImage++;
    }

    moveRight() {
        this.x += this.speed;
    }

    moveLeft() {
            this.x -= this.speed;   
    }

    jump() {
        if (this.isAboveGround()) {
            return; // Don't jump if already in the air
        }
        this.speedY = 30; // Adjust jump strength
    }

    recoverHealth() {
        let healthRegen = 20;
        let newHealth = this.health + healthRegen;
        if (newHealth >= 100) {
            this.health = 100
        } else this.health += 20;
    }
}
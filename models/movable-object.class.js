/**
 * @class MovableObject
 * 
 * The `MovableObject` class represents all game objects that can move and interact with gravity.
 * It provides methods for movement, collision detection, health management, and animations.
 * This class extends `DrawableObject`, inheriting its properties and methods.
 */
class MovableObject extends DrawableObject{
    speed = 0.15;
    otherDirection = false;
    speedY = 0;
    accleration = 2.5;
    health = 100;
    coins = 0;
    bottles = 0;
    lastHit = 0;

    offset = {
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
    };

    /**
     * Applies gravity to the object, making it fall unless it's on the ground.
     */
    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.accleration;
            }
            if (this.y > 72 && this instanceof Character) {
                this.y = 72;
            }
        }, 1000 / 25);
    }

     /**
     * Checks if the object is above the ground.
     * 
     * @returns {boolean} - Returns `true` if the object is in the air.
     */
    isAboveGround() {
        if ((this instanceof ThrowableObject)) { 
            return true;
        } else {
            return this.y < 72;
        }
    }

     /**
     * Checks if this object is colliding with another `MovableObject`.
     * 
     * @param {MovableObject} mo - Another movable object to check collision with.
     * @returns {boolean} - Returns `true` if a collision is detected.
     */
    isColliding(mo) {
        return this.x + this.width - this.offset.right > mo.x + mo.offset.left &&  
            this.y + this.height - this.offset.bottom > mo.y + mo.offset.top && 
            this.x + this.offset.left < mo.x + mo.width - mo.offset.right && 
            this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom;
    }

    /**
     * Reduces the object's health when hit. If it's an `Endboss`, the damage is increased.
     */
    hit() {
        this.health -= 5;
        if (this.health < 0) {
            this.health = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
        if (this instanceof Endboss) {
            this.health -= 20;
        }
    }

    /**
     * Recovers health by a fixed amount, up to a maximum of 100.
     */
    recoverHealth() {
        let healthRegen = 20;
        let newHealth = this.health + healthRegen;
        if (newHealth >= 100) {
            this.health = 100
        } else this.health += 20;
    }

     /**
     * Checks if the object was recently hit.
     * 
     * @returns {boolean} - Returns `true` if the object is still in its hurt state.
     */
    isHurt() {
        let timePassed = new Date().getTime() - this.lastHit; 
        timePassed = timePassed / 1000; 
        return timePassed < 1;
    }

     /**
     * Checks if the object's health is depleted.
     * 
     * @returns {boolean} - Returns `true` if the object is dead.
     */
    isDead() {
        return this.health == 0;
    }

     /**
     * Plays an animation by cycling through an array of image paths.
     * 
     * @param {string[]} images - An array of image paths for animation frames.
     */
    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

     /**
     * Moves the object to the right based on its speed.
     */
    moveRight() {
        this.x += this.speed;
    }

     /**
     * Moves the object to the left based on its speed.
     */
    moveLeft() {
        this.x -= this.speed;
    }

      /**
     * Makes the object jump by setting its vertical speed.
     */
    jump() {
        this.speedY = 30;
    }

}
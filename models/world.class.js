/**
 * @class World
 * 
 * Represents the game world, including the character, enemies, collectibles, 
 * and environmental elements. Handles game logic such as collisions, animations, 
 * and inventory management.
 */
class World {
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    coinsInventory = 0;
    bottlesInventory = 0;
    lastThrowTime = 0;
    level = level1;
    character = new Character();
    endboss = new Endboss();
    healthBar = new HealthBar();
    coinsBar = new CoinsBar();
    bottlesBar = new BottlesBar();
    bossHealthBar = new EndbossHealthBar();
    throwableObjects = [];


    collectBottle_sound = new Audio('audio/collecting_bottle.mp3');
    collectCoin_sound = new Audio('audio/collecting_coin.mp3');
    breakBottle_sound = new Audio('audio/breaking_bottle.mp3');
  
    /**
     * Initializes the game world and starts the game loop.
     * 
     * @param {HTMLCanvasElement} canvas - The canvas element for rendering.
     * @param {Keyboard} keyboard - The keyboard input handler.
     */
    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.pushSounds();
        this.draw();
        this.setWorld();
        this.run();
    }

    /**
     * Adds game sounds to a global sound array.
     */
    pushSounds(){
        sounds.push(this.collectBottle_sound);
        sounds.push(this.collectCoin_sound);
        sounds.push(this.breakBottle_sound);
    }

    /**
     * Links the character to the game world.
     */
    setWorld() {
        this.character.world = this;
    }

    /**
     * Starts game logic such as collision detection and throwing mechanics.
     */
    run() {
        setInterval(() => this.checkCollisions(), 40);
    
        setInterval(() => {
            this.checkCollisionThrowableObj();
            this.checkThrowBottle();
            this.checkCoinsReward();
        }, 1000 / 20);
    }

    /**
     * Checks if a bottle can be thrown and executes the action.
     */
    checkThrowBottle() {
        if (this.canThrowBottle()) {
            this.throwBottle();
        }
    }
    
    /**
     * Determines if the player can throw a bottle.
     * 
     * @returns {boolean} - Whether the player can throw a bottle.
     */
    canThrowBottle() {
        const currentThrowTime = new Date().getTime();
        return this.keyboard.D && this.bottlesInventory > 0 && currentThrowTime - this.lastThrowTime >= 750;
    }
    
    /**
     * Creates and throws a bottle.
     */
    throwBottle() {
        let bottle = new ThrowableObject(this.character.x + 100, this.character.y + 100);
        this.throwableObjects.push(bottle);
        this.bottlesInventory -= 20;
        this.bottlesBar.setPercentage(this.bottlesInventory);
        this.lastThrowTime = new Date().getTime();
    }

    /**
     * Checks all collision types.
     */
    checkCollisions() {
        this.collisionEnemy();
        this.collisionEndboss();
        this.collisionCoins();
        this.collisionBottles();
    }

    /**
     * Checks for bottle collisions with enemies, the endboss, or the ground.
     */
    checkCollisionThrowableObj() {
        this.checkBottleCollideWithEnemy();
        this.checkBottleCollideWithEndboss();
        this.checkBottleCollideWithGround();
    }

    /**
     * Handles collision between bottles and enemies.
     */
    checkBottleCollideWithEnemy() {
        this.throwableObjects.forEach(bottle => {
            this.level.enemies.forEach(enemy => {
                if (bottle.isColliding(enemy) && !bottle.isExploded) {
                    this.handleBottleCollisionWithEnemy(bottle, enemy);
                }
            });
        });
    }
    
     /**
     * Handles bottle collision with enemies.
     */
    handleBottleCollisionWithEnemy(bottle, enemy) {
        bottle.isExploded = true;
        bottle.animateSplash();
        this.breakBottle_sound.play();
        // Remove the bottle after a short delay
        setTimeout(() => {
            this.throwableObjects.splice(this.throwableObjects.indexOf(bottle), 1);
        }, 80);
        
        this.deleteEnemy(enemy);
    }

    checkBottleCollideWithEndboss() {
        this.throwableObjects.forEach(bottle => {
            if (bottle.isColliding(this.endboss) && !bottle.isExploded) {
                this.handleBottleCollisionWithEndboss(bottle);
            }
        });
    }
    
    /**
     * Handles bottle collision with the endboss.
     */
    handleBottleCollisionWithEndboss(bottle) {
        bottle.isExploded = true;
        bottle.animateSplash(bottle);
        this.collideEndbossSound();
        
        this.endboss.hit();
        this.bossHealthBar.setPercentage(this.endboss.health);
        
        // Remove the bottle after a short delay
        setTimeout(() => {
            this.throwableObjects.splice(this.throwableObjects.indexOf(bottle), 1);
        }, 80);
    }

    /**
     * Plays the sound effect when a bottle hits the endboss.
     */
    collideEndbossSound(){
        this.breakBottle_sound.play();
    }

     /**
     * Handles bottle collision with the ground.
     */
    checkBottleCollideWithGround() {
        this.throwableObjects.forEach(bottle => {
            if (bottle.y > 374) {
                bottle.animateSplash();
                this.breakBottle_sound.play();
                setTimeout(() => {
                    this.throwableObjects.splice(bottle, 1);
                }, 500);
            }
        });
    }

     /**
     * Handles enemy collision with the character.
     */
    collisionEnemy() {
        this.level.enemies.forEach(enemy => {
            if (this.character.isColliding(enemy)) {
                this.handleEnemyCollision(enemy);
            }
        });
    }
    
    /**
     * Handles what happens when the character collides with an enemy.
     */
    handleEnemyCollision(enemy) {
        if (this.character.isAboveGround() && this.character.speedY <= 0) {
            this.deleteEnemy(enemy);
            this.character.jump();
        } else {
            this.character.hit();
            this.healthBar.setPercentage(this.character.health);
        }
    }

    /**
     * Removes an enemy from the game.
     */
    deleteEnemy(enemy) {
        enemy.health = 0;
        setTimeout(() => {
            let index = this.level.enemies.indexOf(enemy);
            this.level.enemies.splice(index, 1);
        }, 1500);
    }

     /**
     * Handles collision between the character and the endboss.
     */
    collisionEndboss() {
        if (this.character.isColliding(this.endboss)) {
            this.character.hit();
            this.healthBar.setPercentage(this.character.health);
        }
    }

    /**
     * Handles collision between the character and coins.
     */
    collisionCoins() {
        this.level.coins.forEach(coin => {
            if (this.character.isColliding(coin)) {
                this.collectCoin(coin);
            }
        });
    }
    
     /**
     * Adds the collected coin to inventory.
     */
    collectCoin(coin) {
        this.coinsInventory += 20;
        this.collectCoin_sound.play();
        this.coinsBar.setPercentage(this.coinsInventory);
        this.removeCoinFromLevel(coin);
    }
    
    /**
     * Removes the coin from the level.
     */
    removeCoinFromLevel(coin) {
        const coinIndex = this.level.coins.indexOf(coin);
        if (coinIndex > -1) {
            this.level.coins.splice(coinIndex, 1);
        }
    }

    /**
     * Checks if the player has collected enough coins to recover health.
     * If the player has at least 100 coins and health is below 100,
     * the coins inventory is reset, health is recovered, and the UI is updated.
     */
    checkCoinsReward() {
        if (this.coinsInventory >= 100 && this.character.health < 100) {
            this.coinsInventory = 0;
            this.character.recoverHealth();
            this.coinsBar.setPercentage(this.coinsInventory);
            this.healthBar.setPercentage(this.character.health);
        }
    }

     /**
     * Handles collision detection between the player and bottles.
     * If a collision is detected and the bottles inventory is below 100,
     * the player collects the bottle, the sound effect is played,
     * the UI is updated, and the bottle is removed from the level.
     */
    collisionBottles() {
        this.level.bottles.forEach(bottle => {
            if (this.character.isColliding(bottle)) {
                if (this.bottlesInventory < 100) {
                    this.bottlesInventory += 20;
                    this.collectBottle_sound.play();
                    this.bottlesBar.setPercentage(this.bottlesInventory);
                    let bottleIndex = this.level.bottles.indexOf(bottle);
                    this.level.bottles.splice(bottleIndex, 1);
                }
            }
        });
    }

     /**
     * Clears the canvas and redraws all game elements.
     * The camera movement is managed to ensure proper rendering.
     * Uses requestAnimationFrame to create a game loop.
     */
    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.level.backgroundObjects);
        this.addLevelObjects();
        this.ctx.translate(-this.camera_x, 0);
        this.addBars();
        this.ctx.translate(this.camera_x, 0);
        this.ctx.translate(-this.camera_x, 0);

        let self = this;
        requestAnimationFrame(function () {
            self.draw();
        });
    }

    /**
     * Adds all level objects to the map, including clouds, coins, bottles,
     * the player character, the boss, enemies, and throwable objects.
     */
    addLevelObjects() {
        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.level.coins);
        this.addObjectsToMap(this.level.bottles);
        this.addToMap(this.character);
        this.addToMap(this.endboss);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.throwableObjects);
    }

     /**
     * Adds the UI bars (health bar, coin bar, bottle bar) to the map.
     * Also adds the boss health bar when the boss fight starts.
     */
    addBars() {
        this.addToMap(this.healthBar);
        this.addToMap(this.coinsBar);
        this.addToMap(this.bottlesBar);
        this.addBossHealthBar();
    }

     /**
     * Displays the boss health bar when the player reaches a certain position.
     * If the player's x-position is beyond 2500, the boss encounter is triggered.
     */
    addBossHealthBar() {
        if (this.character.x >= 2500) {
            this.endboss.firstContact = true;
        }
        if (this.endboss.firstContact == true) {
            this.addToMap(this.bossHealthBar);
        }
    }

    /**
     * Adds an array of objects to the map by iterating through them.
     * Calls addToMap() for each object.
     */
    addObjectsToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o);
        });
    }

     /**
     * Adds a single object to the map and handles its rendering.
     * If the object is facing the other direction, it flips the image before drawing.
     */
    addToMap(mo) {
        if (mo.otherDirection) {
            this.flipImage(mo);
        }
        mo.draw(this.ctx);
        if (mo.otherDirection) {
            this.flipImageBack(mo);
        }
    }

    /**
     * Flips an image horizontally before drawing it to the canvas.
     */
    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }

    /**
     * Restores the original position of an image after it has been flipped.
     */
    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }
}
class World {
    character = new Character();
    level = level1;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    statusBar = new StatusBar();
    coinsBar = new CoinsBar();
    bottlesBar = new BottlesBar();
    bossHealthBar = new EndbossHealthBar();
    throwableObjects = [];
    collectedCoins = 0;
    collectedBottles = 0;
    lastThrowTime = 0;
    endboss; // Add this line

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.endboss = this.level.enemies.find(enemy => enemy instanceof Endboss); // Find the endboss
        this.draw();
        this.setWorld();
        this.run();
    }


    setWorld() {
        this.character.world = this;
    }

    run(){
        setInterval(() => {
            this.checkCollisions();
            this.checkThrowObjects();
            this.checkThrowBottle();
            this.checkCoins();
            this.checkBossActivation();

        }, 100);
        
    }
    collisionEnemy() {
        this.level.enemies.forEach(enemy => {
            if (this.character.isColliding(enemy)) {
                if (enemy instanceof Endboss) {
                    // If colliding with Endboss, character takes damage instead
                    this.character.hit();
                    this.statusBar.setPercentage(this.character.health);
                } else if (this.character.isAboveGround() && this.character.speedY <= 0) {
                    // If jumping on a normal enemy, defeat it
                    this.deleteEnemy(enemy);
                    this.character.jump();
                } else {
                    // If touching a normal enemy without jumping, take damage
                    this.character.hit();
                    this.statusBar.setPercentage(this.character.health);
                }
            }
        });
    }
    

    checkBossActivation() {
        let endboss = this.level.enemies.find(enemy => enemy instanceof Endboss);
        if (endboss && this.character.x > 2000) { // Adjust threshold if needed
            endboss.firstContact = true;
        }
    }

    checkThrowBottle() {
        const currentThrowTime = new Date().getTime();
        if (this.keyboard.D && this.collectedBottles > 0 && currentThrowTime - this.lastThrowTime >= 750) {
            let bottle = new ThrowableObject(this.character.x + 100, this.character.y + 100);
            this.throwableObjects.push(bottle);
            this.collectedBottles -= 20;
            this.bottlesBar.setPercentage(this.collectedBottles);
            this.lastThrowTime = currentThrowTime;
        }
    }

    checkCollisions(){
        this.collisionEnemy();
        this.collisionBottles();
        this.collisionCoins();
        this.collisionEndboss();
    }

    checkThrowObjects(){
        this.checkBottleCollideWithEnemy();
        this.checkBottleCollideWithGround();
        this.checkBottleCollideWithEndboss();
    }

    checkBottleCollideWithEnemy() {
        this.throwableObjects.forEach((bottle) => {
            this.level.enemies.forEach((enemy) => {
                if (bottle.isColliding(enemy) && !bottle.isExploded) {
                    bottle.isExploded = true;
                    bottle.animateSplash();
                    setTimeout(() => {
                        this.throwableObjects.splice(bottle, 1);
                    }, 80);
    
                    if (enemy instanceof Endboss) {
                        // Increment hit counter for Endboss
                        enemy.hitCounter = (enemy.hitCounter || 0) + 1;
                        if (enemy.hitCounter >= 4) {
                            this.deleteEnemy(enemy);
                        }
                    } else {
                        // Kill regular enemies (chickens) on the first hit
                        this.deleteEnemy(enemy);
                    }
                }
            });
        });
    }

    checkBottleCollideWithEndboss() {
        this.throwableObjects.forEach((bottle) => {
            if (bottle.isColliding(this.endboss) && !bottle.isExploded) {
                bottle.isExploded = true;
                bottle.animateSplash(bottle);
                this.endboss.hit();  // Decrease health of Endboss
                this.bossHealthBar.setPercentage(this.endboss.health);  // Update health bar
    
                setTimeout(() => {
                    this.throwableObjects.splice(this.throwableObjects.indexOf(bottle), 1); // Properly remove the bottle
                }, 80);
    
                // Delete Endboss after 4 hits
                if (this.endboss.hitCounter >= 4) {
                    this.deleteEnemy(this.endboss);
                }
            }
        });
    }
    

    checkBottleCollideWithGround() {
        this.throwableObjects.forEach(bottle => {
            if (bottle.y > 374) {
                bottle.animateSplash();
                setTimeout(() => {
                    this.throwableObjects.splice(bottle, 1);
                }, 500);
            }
        });
    }

    deleteEnemy(enemy) {
        enemy.health = 0;
        setTimeout(() => {
            let index = this.level.enemies.indexOf(enemy);
            this.level.enemies.splice(index, 1);
        }, 1500);
    }

    collisionBottles() {
        this.level.bottles.forEach(bottle => {
            if (this.character.isColliding(bottle)) {
                if (this.collectedBottles < 100) {
                    this.collectedBottles += 20;
                    this.bottlesBar.setPercentage(this.collectedBottles);
                    let bottleIndex = this.level.bottles.indexOf(bottle);
                    this.level.bottles.splice(bottleIndex, 1);
                }
            }
        });
    }


    collisionCoins() {
        this.level.coins.forEach(coin => {
            if (this.character.isColliding(coin)) {
                this.collectedCoins += 20;
                this.coinsBar.setPercentage(this.collectedCoins);
                let coinIndex = this.level.coins.indexOf(coin);
                this.level.coins.splice(coinIndex, 1);
            }
        });
    }

    collisionEndboss() {
        if (this.endboss && this.character.isColliding(this.endboss)) {
            this.character.hit(); // Character takes damage
            this.statusBar.setPercentage(this.character.health);
        }
    }

    checkCoins() {
        if (this.collectedCoins >= 100 && this.character.health < 100) {
            this.collectedCoins = 0;
            this.character.recoverHealth();
            this.coinsBar.setPercentage(this.collectedCoins);
            this.statusBar.setPercentage(this.character.health);

        }
    }
    
    addBossHealthBar() {
        if (this.endboss && this.character.x >= 2500) { // When the character reaches the Endboss
            this.endboss.firstContact = true;
        }
        if (this.endboss && this.endboss.firstContact) {
            this.addToMap(this.bossHealthBar); // Draw the health bar if Endboss is present
        }
    }
    
    //Draw() wird immer wieder aufgerufen
    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);//canvas löschen

        this.ctx.translate(this.camera_x, 0);//kamera nach links schieben
        this.addObjectsToMap(this.level.backgroundObjects);//fügen Backgroud Objects to Map
        this.addObjectsToMap(this.throwableObjects);
        this.addObjectsToMap(this.level.bottles);
        this.addObjectsToMap(this.level.coins);

        this.ctx.translate(-this.camera_x, 0);
        //Space for fixed objects
        this.addToMap(this.statusBar);
        this.addToMap(this.coinsBar);
        this.addToMap(this.bottlesBar);
        this.addBossHealthBar();
        this.ctx.translate(this.camera_x, 0);

        this.addToMap(this.character);//fügen Character to Map
        this.addObjectsToMap(this.level.enemies);//fügen Enemies to Map
        this.addObjectsToMap(this.level.clouds);//fügen Clouds to Map

        this.ctx.translate(-this.camera_x, 0);//kamera wieder nach rechts schieben
        

        //Draw wird immer wieder aufgerufen
        let self = this;
        requestAnimationFrame(function () {
            self.draw();//hier drin benutzen wir self = this, der wort this wird nicht erkannt
        });
    }

    addObjectsToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o);
        });
    }

    addToMap(mo) {//mo für movable-object
        if (mo.otherDirection) {//mirror Image
            this.flipImage(mo);
        }

        mo.draw(this.ctx);
        mo.drawFrame(this.ctx);

        if (mo.otherDirection) {//mirror Image : false
           this.flipImageBack(mo);
        }
    }

    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }

    flipImageBack(mo){
        mo.x = mo.x * -1;
        this.ctx.restore();
    }


}
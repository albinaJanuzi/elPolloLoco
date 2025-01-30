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
                    this.deleteEnemy(enemy);
                }
            });
        });
    }

    checkBottleCollideWithEndboss() {
        this.throwableObjects.forEach((bottle) => {
            if (bottle.isColliding(this.endboss) && !bottle.isExploded) {
                bottle.isExploded = true;
                bottle.animateSplash();
                this.endboss.hit();
                this.bossHealthBar.setPercentage(this.endboss.health);
                setTimeout(() => {
                    this.throwableObjects.splice(bottle, 1);
                }, 80);
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



    collisionEnemy(){
        this.level.enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy)) {
                this.character.hit();
                this.statusBar.setPercentage(this.character.energy);
            }
        });
    }

    collisionEndboss() {
        let endboss = this.level.enemies.find(enemy => enemy instanceof Endboss);
        if (endboss && this.character.isColliding(endboss)) {
            this.character.hit();
            this.healthBar.setPercentage(this.character.health);
        }
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

    checkCoins() {
        if (this.collectedCoins >= 100 && this.character.health < 100) {
            this.collectedCoins = 0;
            this.character.recoverHealth();
            this.coinsBar.setPercentage(this.collectedCoins);
            this.statusBar.setPercentage(this.character.health);

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
        this.ctx.translate(this.camera_x, 0);

        this.addToMap(this.character);//fügen Character to Map
        this.addObjectsToMap(this.level.enemies);//fügen Enemies to Map
        this.addObjectsToMap(this.level.clouds);//fügen Clouds to Map

        this.ctx.translate(-this.camera_x, 0);//kamera wieder nach rechts schieben
        this.addBossHealthBar();

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


addBossHealthBar() {
    if (this.endboss && this.character.x >= 2500) {
        this.endboss.firstContact = true;
    }
    if (this.endboss && this.endboss.firstContact == true) {
        this.addToMap(this.bossHealthBar);
    }
}

}
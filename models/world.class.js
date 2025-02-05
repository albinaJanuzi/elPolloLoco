class World {
    character = new Character();
    endboss = new Endboss();
    level = level1;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    healthBar = new HealthBar();
    coinsBar = new CoinsBar();
    bottlesBar = new BottlesBar();
    bossHealthBar = new EndbossHealthBar();
    throwableObjects = [];
    coinsInventory = 0;
    bottlesInventory = 0;
    lastThrowTime = 0;

    collectBottle_sound = new Audio('audio/collecting_bottle.mp3');
    collectCoin_sound = new Audio('audio/collecting_coin.mp3');
    breakBottle_sound = new Audio('audio/breaking_bottle.mp3');
    cackle_sound = new Audio('audio/chickenCackle.mp3');

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        sounds.push(this.collectBottle_sound);
        sounds.push(this.collectCoin_sound);
        sounds.push(this.breakBottle_sound);
        sounds.push(this.cackle_sound);
        this.draw();
        this.setWorld();
        this.run();
    }

    setWorld() {
        this.character.world = this;
    }

    run() {
        setInterval(() => { this.checkCollisions(); }, 40);
        setInterval(() => { this.checkCollisionThrowableObj(); }, 1000 / 20);
        setInterval(() => { this.checkThrowBottle(); }, 1000 / 20);
        setInterval(() => { this.checkCoinsReward(); }, 1000 / 20);
    }

    checkThrowBottle() {
        const currentThrowTime = new Date().getTime();
        if (this.keyboard.D && this.bottlesInventory > 0 && currentThrowTime - this.lastThrowTime >= 750) {
            let bottle = new ThrowableObject(this.character.x + 100, this.character.y + 100);
            this.throwableObjects.push(bottle);
            this.bottlesInventory -= 20;
            this.bottlesBar.setPercentage(this.bottlesInventory);
            this.lastThrowTime = currentThrowTime;
        }
    }

    checkCollisions() {
        this.collisionEnemie();
        this.collisionEndboss();
        this.collisionCoins();
        this.collisionBottles();
    }

    checkCollisionThrowableObj() {
        this.checkBottleCollideWithEnemy();
        this.checkBottleCollideWithEndboss();
        this.checkBottleCollideWithGround();
    }

    checkBottleCollideWithEnemy() {
        this.throwableObjects.forEach((bottle) => {
            this.level.enemies.forEach((enemy) => {
                if (bottle.isColliding(enemy) && !bottle.isExploded) {
                    bottle.isExploded = true;
                    bottle.animateSplash();
                    this.breakBottle_sound.play();
                    this.cackle_sound.play();
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
                bottle.animateSplash(bottle);
                this.breakBottle_sound.play();
                this.cackle_sound.play();
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
                this.breakBottle_sound.play();
                setTimeout(() => {
                    this.throwableObjects.splice(bottle, 1);
                }, 500);
            }
        });
    }

    collisionEnemie() {
        this.level.enemies.forEach(enemy => {
            if (this.character.isColliding(enemy)) {
                if (this.character.isAboveGround() && this.character.speedY <= 0) {
                    this.cackle_sound.play();
                    this.deleteEnemy(enemy);
                    this.character.jump();
                }
                else {
                    this.character.hit();
                    this.healthBar.setPercentage(this.character.health);
                }
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

    collisionEndboss() {
        if (this.character.isColliding(this.endboss)) {
            this.character.hit();
            this.healthBar.setPercentage(this.character.health);
        }
    }

    collisionCoins() {
        this.level.coins.forEach(coin => {
            if (this.character.isColliding(coin)) {
                this.coinsInventory += 20;
                this.collectCoin_sound.play();
                this.coinsBar.setPercentage(this.coinsInventory);
                let coinIndex = this.level.coins.indexOf(coin);
                this.level.coins.splice(coinIndex, 1);
            }
        });
    }

    checkCoinsReward() {
        if (this.coinsInventory >= 100 && this.character.health < 100) {
            this.coinsInventory = 0;
            this.character.recoverHealth();
            this.coinsBar.setPercentage(this.coinsInventory);
            this.healthBar.setPercentage(this.character.health);

        }
    }

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

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.level.backgroundObjects);
        this.addLevelObjects();
        this.ctx.translate(-this.camera_x, 0);
        this.addLevelBars();
        this.ctx.translate(this.camera_x, 0);
        this.ctx.translate(-this.camera_x, 0);

        let self = this;
        requestAnimationFrame(function () {
            self.draw();
        });
    }

    addLevelObjects() {
        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.level.coins);
        this.addObjectsToMap(this.level.bottles);
        this.addToMap(this.character);
        this.addToMap(this.endboss);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.throwableObjects);
    }

    addLevelBars() {
        this.addToMap(this.healthBar);
        this.addToMap(this.coinsBar);
        this.addToMap(this.bottlesBar);
        this.addBossHealthBar();
    }

    addBossHealthBar() {
        if (this.character.x >= 2500) {
            this.endboss.firstContact = true;
        }
        if (this.endboss.firstContact == true) {
            this.addToMap(this.bossHealthBar);
        }
    }

    addObjectsToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o);
        });
    }

    addToMap(mo) {
        if (mo.otherDirection) {
            this.flipImage(mo);
        }
        mo.draw(this.ctx);
        if (mo.otherDirection) {
            this.flipImageBack(mo);
        }
    }

    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }

    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }
}
class World {
    character = new Character();
    level = level1;
    canvas;
    ctx;//abkürzung von context
    keyboard;
    camera_x = 0;

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.checkCollisions();
    }

    setWorld() {
        this.character.world = this;
    }

    checkCollisions(){
        setInterval(() => {
            this.level.enemies.forEach((enemy) => {
                if (this.character.isColliding(enemy)) {
                    this.character.energy -= 5;
                    console.log('Collision with Character, energy ', this.character.energy);
                    
                }
                
            });
        }, 200);
    }

    //Draw() wird immer wieder aufgerufen
    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);//canvas löschen
        this.ctx.translate(this.camera_x, 0);//kamera nach links schieben
        this.addObjectsToMap(this.level.backgroundObjects);//fügen Backgroud Objects to Map
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
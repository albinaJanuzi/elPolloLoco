class World{
    character = new Character();
    enemies = level1.enemies;
    clouds = level1.clouds;
    backgroundObjects = level1.backgroundObjects;
    canvas;
    ctx;//abkürzung von context
    keyboard;
    camera_x = 0; 

    constructor(canvas, keyboard){
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
    }

    setWorld(){
        this.character.world = this;
    }

    //Draw() wird immer wieder aufgerufen
    draw(){
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);//canvas löschen
        this.ctx.translate(this.camera_x, 0);//kamera nach links schieben
        this.addObjectsToMap(this.backgroundObjects);//fügen Backgroud Objects to Map
        this.addToMap(this.character);//fügen Character to Map
        this.addObjectsToMap(this.enemies);//fügen Enemies to Map
        this.addObjectsToMap(this.clouds);//fügen Clouds to Map
        this.ctx.translate(-this.camera_x, 0);//kamera wieder nach rechts schieben
        

        //Draw wird immer wieder aufgerufen
        let self = this;
        requestAnimationFrame(function(){
        self.draw();//hier drin benutzen wir self = this, der wort this wird nicht erkannt
    });
    }

    addObjectsToMap(objects){
        objects.forEach(o => {
            this.addToMap(o);
        });
    }

    addToMap(mo){//mo für movable-object
        if (mo.otherDirection) {//mirror Image
            this.ctx.save();
            this.ctx.translate(mo.width, 0);
            this.ctx.scale(-1, 1);
            mo.x = mo.x * -1;
        }
        this.ctx.drawImage(mo.img, mo.x, mo.y, mo.width, mo.height);
        if (mo.otherDirection) {//mirror Image : false
            mo.x = mo.x * -1;
            this.ctx.restore();
        }
    }
}
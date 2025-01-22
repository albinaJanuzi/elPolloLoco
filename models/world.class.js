class World{
    character = new Character();
    enemies = [
    new Chicken(),
    new Chicken(),
    new Chicken(),
    ];
    clouds = [
        new Cloud()
    ];
    backgroundObjects = [
        new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 0)
    ];
    canvas;
    ctx;//abkürzung von context

    constructor(canvas){
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.draw();
    }

    draw(){
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);//löschen

        this.addToMap(this.character);//fügen Character to Map
        this.addObjectsToMap(this.enemies);//fügen Enemies to Map
        this.addObjectsToMap(this.clouds);//fügen Clouds to Map
        this.addObjectsToMap(this.backgroundObjects);//fügen Backgroud Objects to Map

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
        this.ctx.drawImage(mo.img, mo.x, mo.y, mo.width, mo.height);
    }
}
class World{
    character = new Character();
    enemies = [
    new Chicken(),
    new Chicken(),
    new Chicken(),
    ];
    canvas;
    ctx;//abkürzung von context

    constructor(canvas){
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.draw();
    }

    draw(){
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.drawImage(this.character.img, this.character.x, this.character.y, this.character.width, this.character.height);
        let self = this;
        //Draw wird immer wieder aufgerufen
        requestAnimationFrame(function(){
        self.draw();//hier drin benutzen wir self = this, der wort this wird nicht erkannt
    });
    }
}
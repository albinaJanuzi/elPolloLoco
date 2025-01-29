class DrawableObject{
    img;
    imageCache = {};
    currentImage = 0;
    x = 120;
    y = 280;
    height = 150;
    width = 100;


loadImage(path) {
    this.img = new Image(); // gleich wie document.getElementbyId
    this.img.src = path;
}

draw(ctx){
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
}

drawFrame(ctx){
    if (this instanceof Character || this instanceof Chicken || this instanceof ChickenSmall
        || this instanceof Endboss || this instanceof ThrowableObject || this instanceof Bottle
        || this instanceof Coin){//draw Frame nur für Character und Chicken (nicht für Clouds, oder background)
        ctx.beginPath();
        ctx.lineWidth = '5';
        ctx.strokeStyle = 'blue';
        ctx.rect(this.x, this.y, this.width, this.height);
        ctx.stroke();
    }
}

/**
 * 
 * @param {Array} arr - ['img/image1.png, 'img/image2.png', ...]
 */
loadImages(arr) {
    arr.forEach((path) => {
        let img = new Image();
        img.src = path;
        img.style = 'transform: scaleX(-1)'
        this.imageCache[path] = img;
    });
}

}

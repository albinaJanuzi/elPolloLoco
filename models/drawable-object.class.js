class DrawableObject{
    img;
    imageCache = {};
    currentImage = 0;
    x = 120;
    y = 280;
    height = 150;
    width = 100;


    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
        this.img.onload = () => console.log(`Loaded: ${path}`);
        this.img.onerror = () => console.error(`Error loading image: ${path}`);
    }

    draw(ctx) {
        if (this.img && this.img.complete) { 
            ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
        } else {
            console.error("Image not loaded yet:", this);
        }
    }

drawFrame(ctx) {
    if (this instanceof Character || this instanceof Chicken || this instanceof ChickenSmall
        || this instanceof Endboss || this instanceof ThrowableObject || this instanceof Bottle
        || this instanceof Coin) {

        // Draw blue frame
        ctx.beginPath();
        ctx.lineWidth = '3';
        ctx.strokeStyle = 'blue';
        ctx.rect(this.x, this.y, this.width, this.height);
        ctx.stroke();

        // Draw red frame
        ctx.beginPath();
        ctx.lineWidth = '3';
        ctx.strokeStyle = 'red';
        ctx.rect(
            this.x + this.offset.left,
            this.y + this.offset.top,
            this.width - this.offset.right - this.offset.left,
            this.height - this.offset.bottom - this.offset.top
        );
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
        img.onload = () => console.log(`Loaded: ${path}`);
        img.onerror = () => console.error(`Error loading image: ${path}`);
        this.imageCache[path] = img;
    });
}

}

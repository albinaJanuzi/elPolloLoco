/**
 * @class DrawableObject
 * 
 * The `DrawableObject` class serves as a base class for objects that can be drawn on the canvas. 
 * It handles loading images, drawing the object on the canvas, and drawing the bounding box (for debugging purposes).
 */
class DrawableObject {
    img;
    x = 120;
    y = 280;
    height = 150;
    width = 100;
    imageCache = {};
    currentImage = 0;

    /**
     * Loads an image from the given path and assigns it to the `img` property.
     * 
     * @param {string} path - The file path of the image to load.
     */
    loadImage(path) {
        this.img = new Image(); 
        this.img.src = path;
    }

    /**
     * Draws the object on the given canvas context.
     * 
     * @param {CanvasRenderingContext2D} ctx - The canvas 2D context to draw the object on.
     */
    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

    /**
     * Draws the bounding box of the object (used for debugging purposes).
     * Only draws the bounding box if the object is an instance of one of the specified classes.
     * 
     * @param {CanvasRenderingContext2D} ctx - The canvas 2D context to draw the bounding box on.
     */
    drawFrame(ctx) {
        if (this.isDrawableObject()) {
            this.drawBoundingBox(ctx);
        }
    }

    /**
     * Checks whether the object is one of the specified drawable objects (used for bounding box drawing).
     * 
     * @returns {boolean} - Returns true if the object is an instance of one of the specified classes.
     */
    isDrawableObject() {
        // Check if the object is one of the specified classes
        return this instanceof Character || this instanceof Chicken || this instanceof ChickenSmall
            || this instanceof Endboss || this instanceof ThrowableObject || this instanceof Bottle
            || this instanceof Coin;
    }

    /**
     * Draws the bounding box around the object.
     * This is used for debugging to visualize the object's collision box.
     * 
     * @param {CanvasRenderingContext2D} ctx - The canvas 2D context to draw the bounding box on.
     */
    drawBoundingBox(ctx) {
        // Draw the bounding box around the object
        ctx.beginPath();
        ctx.lineWidth = '1';
        ctx.strokeStyle = 'red';
        ctx.rect(
            this.x + this.offset.left,
            this.y + this.offset.top,
            this.width - this.offset.right - this.offset.left,
            this.height - this.offset.bottom - this.offset.top
        );
        ctx.stroke();
    }

    /**
     * Loads multiple images into the `imageCache` for later use.
     * 
     * @param {string[]} arr - An array of image file paths.
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

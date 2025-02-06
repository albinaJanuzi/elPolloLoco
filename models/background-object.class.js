/**
 * Reperesents a background element 
 * @class  
 */
class BackgroundObject extends MovableObject{

    width = 720;
    height = 480;

    /**
     * Creates a new BackgroundObject instance.
     * @param {string} imagePath - The file path to the background image.
     * @param {number} x - The x-coordinate position of the background object.
     */
    constructor(imagePath, x){
        super().loadImage(imagePath);
        this.x = x;
        this.y = 480 - this.height;//480-400 (480 Canvas height)
    }
}
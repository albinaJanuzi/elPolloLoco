// The BackgroundObject class extends the MovableObject class, inheriting its properties and methods.
class BackgroundObject extends MovableObject{

    width = 720;
    height = 480;

    /**
     * Constructor to create a new background object.
     * @param {string} imagePath - The file path of the background image.
     * @param {number} x - The x-coordinate position of the background object.
     */

    constructor(imagePath, x){
        super().loadImage(imagePath); // Call the constructor of the parent class (MovableObject) and load the image.
        this.x = x;  // Set the x position of the background object.
        this.y = 480 - this.height; // Position the background at the bottom of the 480px canvas. Since its height is also 480px, it starts at y = 0.
    }
}
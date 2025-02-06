/**
 * @class EndbossHealthBar
 * 
 * The `EndbossHealthBar` class manages the visual representation of the health bar for an "Endboss."
 * It loads images based on the health percentage and updates the health bar accordingly.
 */
class EndbossHealthBar extends DrawableObject{
    percentage = 100;

    IMAGES_LIVE = [
        'img/7_statusbars/2_statusbar_endboss/blue/blue0.png',
        'img/7_statusbars/2_statusbar_endboss/blue/blue20.png',
        'img/7_statusbars/2_statusbar_endboss/blue/blue40.png',
        'img/7_statusbars/2_statusbar_endboss/blue/blue60.png',
        'img/7_statusbars/2_statusbar_endboss/blue/blue80.png',
        'img/7_statusbars/2_statusbar_endboss/blue/blue100.png',
    ];

    /**
     * Constructor that initializes the health bar and sets its initial properties.
     */
    constructor() {
        super();
        this.initObject(); 
    }
    
    /**
     * Initializes the Endboss health bar by loading the images and setting the default properties.
     */
    initObject() {
        this.loadImages(this.IMAGES_LIVE);
        this.x = 500;
        this.y = 0;
        this.width = 200;
        this.height = 60;
        this.setPercentage(100);
    }

    /**
     * Sets the health percentage and updates the image to match the health bar's state.
     * 
     * @param {number} percentage - The health percentage (0 to 100).
     */
    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.IMAGES_LIVE[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }
 
    /**
     * Resolves which image index to use based on the current health percentage.
     * 
     * @returns {number} The index of the image to use.
     */
    resolveImageIndex() {
        if (this.percentage == 100) {
            return 5;
        } else if (this.percentage > 80) {
            return 4;
        } else if (this.percentage > 60) {
            return 3;
        } else if (this.percentage > 40) {
            return 2;
        } else if (this.percentage > 20) {
            return 1;
        } else {
            return 0;
        }
    }
}
/**
 * @class CoinsBar
 * @extends DrawableObject
 * 
 * The CoinsBar class represents a status bar that tracks the number of coins the player has collected. 
 * The bar updates its appearance based on the percentage of coins collected and is drawn on the screen.
 */
class CoinsBar extends DrawableObject{
    IMAGES_COINS = [
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/0.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/20.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/40.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/60.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/80.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/100.png'
    ];

    percentage = 0;

    /**
     * Creates a new CoinsBar instance, initializing the status bar images and properties.
     */
    constructor() {
        super();
        this.loadImages(this.IMAGES_COINS);
        this.setInitialProperties();
    }

    /**
     * Initializes the CoinsBar's position, size, and starting coin percentage.
     */
    setInitialProperties() {
        this.x = 20;
        this.y = 50;
        this.width = 200;
        this.height = 60;
        this.setPercentage(0);
    }

    /**
     * Updates the coin status bar to reflect the current percentage.
     * The image representing the bar is changed according to the percentage.
     * 
     * @param {number} percentage - The new coin percentage (0-100).
     */
    setPercentage(percentage) {//set Status Bar image
        this.percentage = percentage;
        let path = this.IMAGES_COINS[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }
    
    /**
     * Determines which image to display based on the current coin percentage.
     * 
     * @returns {number} The index of the image corresponding to the coin percentage.
     */
    resolveImageIndex() {//Percentage image
        if (this.percentage >= 100) {
            return 5;
        } else if (this.percentage >= 80) {
            return 4;
        } else if (this.percentage >= 60) {
            return 3;
        } else if (this.percentage >= 40) {
            return 2;
        } else if (this.percentage >= 20) {
            return 1;
        } else {
            return 0;
        }
    }
}
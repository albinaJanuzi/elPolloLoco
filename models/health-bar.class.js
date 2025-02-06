/**
 * @class HealthBar
 * 
 * The `HealthBar` class manages the player's health bar, visually representing the player's health status.
 * It dynamically updates the displayed health level based on the player's current health percentage.
 */
class HealthBar extends DrawableObject{
    IMAGES_LIVE = [
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/0.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/20.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/40.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/60.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/80.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/100.png'
    ];

    percentage = 100;

     /**
     * Constructor initializes the health bar.
     */
    constructor() {
        super();
        this.initialize();
    }
    
     /**
     * Initializes the health bar by loading images and setting its default properties.
     */
    initialize() {
        this.loadImages(this.IMAGES_LIVE);
        this.x = 20;
        this.y = 0;
        this.width = 200;
        this.height = 60;
        this.setPercentage(100);
    }

    /**
     * Updates the health percentage and changes the displayed image accordingly.
     * 
     * @param {number} percentage - The current health percentage (0 to 100).
     */
    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.IMAGES_LIVE[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }

     /**
     * Determines the correct image index based on the current health percentage.
     * 
     * @returns {number} The index of the corresponding health image.
     */
    resolveImageIndex() {
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
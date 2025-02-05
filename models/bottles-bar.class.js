// The BottlesBar class extends DrawableObject, inheriting its properties and methods.
class BottlesBar extends DrawableObject{
    // Array containing the images for different bottle bar percentage levels.
    IMAGES_BOTTLES = [
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/0.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/20.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/40.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/60.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/80.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/100.png'
    ];

    percentage = 0;

    /**
     * Constructor initializes the bottle bar object.
     */
    constructor() {
        // Call the parent class constructor to initialize common properties.
        super();
        this.loadImages(this.IMAGES_BOTTLES);  // Load images for the bottle bar.
        this.x = 20;
        this.y = 100;
        this.width = 200;
        this.height = 60;
        this.setPercentage(0); // Set the initial percentage (starting at 0%).
    }

    /**
     * Sets the percentage for the bottle bar and updates the displayed image accordingly.
     * @param {number} percentage - The percentage value (0 to 100).
     */
    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.IMAGES_BOTTLES[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }
    
    /**
     * Determines the appropriate image index based on the percentage.
     * @returns {number} The index of the image for the current percentage.
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
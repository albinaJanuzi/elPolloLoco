/**
 * @class BottlesBar
 * @extends DrawableObject
 * 
 * The BottlesBar class represents a status bar that visually displays the number of collected bottles.
 * It extends the DrawableObject class, allowing it to be rendered on the screen.
 */
class BottlesBar extends DrawableObject {
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
     * Creates a new BottlesBar instance.
     * Initializes the bar position, size, and default image.
     */
    constructor() {
        super();
        this.loadImages(this.IMAGES_BOTTLES);
        this.x = 20;
        this.y = 100;
        this.width = 200;
        this.height = 60;
        this.setPercentage(0);
    }

    /**
     * Updates the bottle bar display based on the given percentage.
     * 
     * @param {number} percentage - The percentage value to set (0-100).
     */
    setPercentage(percentage) {//set BAR-Percentage
        this.percentage = percentage;
        let path = this.IMAGES_BOTTLES[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }

    /**
     * Determines the correct image index based on the current percentage.
     * 
     * @returns {number} The index of the corresponding image in IMAGES_BOTTLES.
     */
    resolveImageIndex() {//Percentage Image
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
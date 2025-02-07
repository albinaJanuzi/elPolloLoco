/**
 * @class Level
 * 
 * The `Level` class represents a game level, containing various objects such as enemies, collectibles, and background elements.
 * It initializes and manages these elements within the level.
 */
class Level{
    bottles;
    coins;
    enemies;
    clouds;
    backgroundObjects;
    level_end_x = 3100;

     /**
     * Creates a new level instance and initializes its objects.
     * 
     * @param {Array} bottles - An array of bottle objects placed in the level.
     * @param {Array} coins - An array of coin objects placed in the level.
     * @param {Array} enemies - An array of enemy objects appearing in the level.
     * @param {Array} clouds - An array of cloud objects used in the background.
     * @param {Array} backgroundObjects - An array of background elements (e.g., scenery).
     */
    constructor(bottles, coins, enemies, clouds, backgroundObjects) {
        this.bottles = bottles;
        this.coins = coins;
        this.enemies = enemies;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
    }

}


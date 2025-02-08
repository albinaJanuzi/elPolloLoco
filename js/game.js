let canvas, ctx, world;
let keyboard = new Keyboard();
let sounds = [];
let isMuted = false;

background_sound = new Audio('audio/background.mp3');
win_sound = new Audio('audio/win.mp3');
lose_sound = new Audio('audio/lose.mp3');

background_sound.loop = true;
background_sound.volume = 0.1;

/**
 * Starts the game, initializes the level, and checks mute status.
 */
function startGame() {
    startGameElement();
    initLevel();
    initGame();
    checkIsMuted(); 
    playBackgroundSound();
    checkMobileDevice();
    sounds.push(background_sound, win_sound, lose_sound);
}

/**
 * Plays the background sound if the game is not muted.
 */
function playBackgroundSound(){
if (!isMuted) {
    background_sound.play();
}
}

/**
 * Hides the start screen and shows necessary game elements.
 */
function startGameElement(){
    document.getElementById('startScreen').classList.add('d-none'); // This hides the start screen
    document.getElementById('winScreen').classList.add('d-none');
    document.getElementById('loseScreen').classList.add('d-none');
    document.getElementById('mobileController').classList.remove('d-none');
    document.getElementById('iconBar').classList.remove('d-none');
}

/**
 * Initializes the game world.
 */
function initGame() {
    canvas = document.getElementById('canvas');
    canvas.classList.remove('d-none');
    world = new World(canvas, keyboard);
}

/**
 * Called when the player loses the game.
 */
function loseGame() {
    loseGameElement();
    clearAllIntervals();
    background_sound.pause();
    if (!isMuted) {
        lose_sound.play();
    }
    stopCackleSound();  // Stop the cackle sound when the game is lost
}

/**
 * Updates the UI when the game is lost.
 */
function loseGameElement(){
    document.getElementById('canvas').classList.add('d-none');
    document.getElementById('loseScreen').classList.remove('d-none');
    document.getElementById('mobileController').classList.add('d-none');
    document.getElementById('iconBar').classList.add('d-none');
}

/**
 * Called when the player wins the game.
 */
function winGame() {
    winGameElement();
    clearAllIntervals();
    background_sound.pause();
    if (!isMuted) {
        win_sound.play();
    }
    stopCackleSound();
}

/**
 * Stops the chicken cackling sound if it is active.
 */
function stopCackleSound() {
    sounds.forEach(sound => {
        if (sound instanceof Audio && sound.src.includes('chickenCackle.mp3')) {
            sound.pause(); 
            sound.currentTime = 0; 
        }
    });
}

/**
 * Updates the UI when the game is won.
 */
function winGameElement(){
    document.getElementById('canvas').classList.add('d-none');
    document.getElementById('winScreen').classList.remove('d-none');
    document.getElementById('mobileController').classList.add('d-none');
    document.getElementById('iconBar').classList.add('d-none');
}

window.addEventListener('resize', checkMobileDevice)

/**
 * Checks if the device is a mobile device and adjusts controls accordingly.
 */
function checkMobileDevice() {
    let canvas = document.getElementById('canvas');
    if (window.matchMedia("(any-pointer: coarse)").matches && !canvas.classList.contains('d-none')) {
        document.getElementById('mobileController').classList.remove('d-none');
    } else {
        document.getElementById('mobileController').classList.add('d-none');
    }
}

/**
 * Displays the game information panel.
 */
function showGameInfos() {
    document.getElementById('gameInfo').classList.remove('d-none');
}

/**
 * Hides the game information panel.
 */
function hideGameInfos() {
    document.getElementById('gameInfo').classList.add('d-none');
}

/**
 * Returns to the main menu.
 */
function backToMenu() {
    backToMenuElement();
    clearAllIntervals();
    backToMenuPauseSound();
}

/**
 * Pauses all sounds when returning to the main menu.
 */
function backToMenuPauseSound(){
    background_sound.pause();
    win_sound.pause();
    lose_sound.pause();
}

/**
 * Updates UI elements to return to the main menu.
 */
function backToMenuElement(){
    document.getElementById('canvas').classList.add('d-none');
    document.getElementById('mobileController').classList.add('d-none');
    document.getElementById('startScreen').classList.remove('d-none');
    document.getElementById('loseScreen').classList.add('d-none');
    document.getElementById('winScreen').classList.add('d-none');
    document.getElementById('iconBar').classList.add('d-none');
}

/**
 * Updates the mute state and stores it in local storage.
 * @param {boolean} mute - Indicates whether the sound should be muted.
 */
function updateMuteState(mute) {
    isMuted = mute;
    localStorage.setItem('isMuted', mute.toString());
    
    sounds.forEach(sound => {
        sound.muted = mute;
    });

    document.getElementById('soundOn').classList.toggle('d-none', mute);
    document.getElementById('soundOff').classList.toggle('d-none', !mute);
}

/**
 * Checks the mute status from local storage and updates it.
 */
function checkIsMuted() {
    const storedMuteState = localStorage.getItem('isMuted') === 'true';
    updateMuteState(storedMuteState);

 
    if (!isMuted && background_sound.paused) {
        background_sound.play();
    }
}

/**
 * Mutes the sound.
 */
function soundOff() {
    updateMuteState(true);
}

/**
 * Unmutes the sound.
 */
function soundOn() {
    updateMuteState(false);
    if (background_sound.paused) {
        background_sound.play();
    }
}

/**
 * Switches to fullscreen mode.
 */
function fullScreen() {
    canvas.requestFullscreen();
}

/**
 * Clears all active interval functions.
 */
function clearAllIntervals() {
    for (let i = 1; i < 99999; i++) window.clearInterval(i);
}
let canvas, ctx, world;
let keyboard = new Keyboard();
let sounds = [];
let isMuted = false;

background_sound = new Audio('audio/background.mp3');
win_sound = new Audio('audio/win.mp3');
lose_sound = new Audio('audio/lose.mp3');

background_sound.loop = true;
background_sound.volume = 0.1;

function startGame() {
    startGameElement();
    initLevel();
    initGame();
    checkIsMuted(); 
    playBackgroundSound();
    sounds.push(background_sound, win_sound, lose_sound);
}

function playBackgroundSound(){
if (!isMuted) {
    background_sound.play();
}
}

function startGameElement(){
    document.getElementById('startScreen').classList.add('d-none'); // This hides the start screen
    document.getElementById('winScreen').classList.add('d-none');
    document.getElementById('loseScreen').classList.add('d-none');
    document.getElementById('mobileController').classList.remove('d-none');
    document.getElementById('iconBar').classList.remove('d-none');
}

function initGame() {
    canvas = document.getElementById('canvas');
    canvas.classList.remove('d-none');
    world = new World(canvas, keyboard);
}

function loseGame() {
    loseGameElement();
    clearAllIntervals();
    background_sound.pause();
    if (!isMuted) {
        lose_sound.play();
    }
    stopCackleSound();  // Stop the cackle sound when the game is lost
}
function loseGameElement(){
    document.getElementById('canvas').classList.add('d-none');
    document.getElementById('loseScreen').classList.remove('d-none');
    document.getElementById('mobileController').classList.add('d-none');
    document.getElementById('iconBar').classList.add('d-none');
}

function winGame() {
    winGameElement();
    clearAllIntervals();
    background_sound.pause();
    if (!isMuted) {
        win_sound.play();
    }
    stopCackleSound();
}

function stopCackleSound() {
    sounds.forEach(sound => {
        if (sound instanceof Audio && sound.src.includes('chickenCackle.mp3')) {
            sound.pause(); // Stop the sound
            sound.currentTime = 0; // Reset to the start
        }
    });
}

function winGameElement(){
    document.getElementById('canvas').classList.add('d-none');
    document.getElementById('winScreen').classList.remove('d-none');
    document.getElementById('mobileController').classList.add('d-none');
    document.getElementById('iconBar').classList.add('d-none');
}


function checkOrientation() {
    let deviceNotice = document.getElementById('deviceNotice');

    if (window.matchMedia("(any-pointer: coarse)").matches) { // Prüft, ob ein Touchscreen-Gerät verwendet wird
        if (window.innerWidth < window.innerHeight) {
            deviceNotice.style.display = 'flex';
        } else {
            deviceNotice.style.display = 'none';
        }
    } else {
        deviceNotice.style.display = 'none'; // Falls es kein mobiles Gerät ist, die Nachricht ausblenden
    }
}

// Event-Listener für Bildschirmrotation
window.addEventListener('resize', checkOrientation);
window.addEventListener('load', checkOrientation);


function showGameInfos() {
    document.getElementById('gameInfo').classList.remove('d-none');
}

function hideGameInfos() {
    document.getElementById('gameInfo').classList.add('d-none');
}

function backToMenu() {
    backToMenuElement();
    clearAllIntervals();
    backToMenuPauseSound();
}

function backToMenuPauseSound(){
    background_sound.pause();
    win_sound.pause();
    lose_sound.pause();
}

function backToMenuElement(){
    document.getElementById('canvas').classList.add('d-none');
    document.getElementById('mobileController').classList.add('d-none');
    document.getElementById('startScreen').classList.remove('d-none');
    document.getElementById('loseScreen').classList.add('d-none');
    document.getElementById('winScreen').classList.add('d-none');
    document.getElementById('iconBar').classList.add('d-none');
}

function updateMuteState(mute) {
    isMuted = mute;
    localStorage.setItem('isMuted', mute.toString());
    
    sounds.forEach(sound => {
        sound.muted = mute;
    });

    document.getElementById('soundOn').classList.toggle('d-none', mute);
    document.getElementById('soundOff').classList.toggle('d-none', !mute);
}

function checkIsMuted() {
    const storedMuteState = localStorage.getItem('isMuted') === 'true';
    updateMuteState(storedMuteState);

    // Play background sound only if it's unmuted and paused
    if (!isMuted && background_sound.paused) {
        background_sound.play();
    }
}

function soundOff() {
    updateMuteState(true);
}

function soundOn() {
    updateMuteState(false);

    // Ensure the background sound plays when unmuted
    if (background_sound.paused) {
        background_sound.play();
    }
}

function fullScreen() {
    canvas.requestFullscreen();
}

function clearAllIntervals() {
    for (let i = 1; i < 99999; i++) window.clearInterval(i);
}
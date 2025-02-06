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
    checkMobileDevice();
    checkIsMuted();

    background_sound.play();
    sounds.push(background_sound, win_sound, lose_sound);
}

function startGameElement(){
    document.getElementById('startScreen').classList.add('d-none');
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
    lose_sound.play();
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
    win_sound.play();
}

function winGameElement(){
    document.getElementById('canvas').classList.add('d-none');
    document.getElementById('winScreen').classList.remove('d-none');
    document.getElementById('mobileController').classList.add('d-none');
    document.getElementById('iconBar').classList.add('d-none');
}

window.addEventListener('resize', checkMobileDevice);

function checkMobileDevice() {
    let canvas = document.getElementById('canvas');
    if (window.matchMedia("(any-pointer: coarse)").matches && !canvas.classList.contains('d-none')) {
        document.getElementById('mobileController').classList.remove('d-none');
    } else {
        document.getElementById('mobileController').classList.add('d-none');
    }
}

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

function checkIsMuted() {
    if (isMuted == true) {
        sounds.forEach(sound => {
            sound.muted = true;
        });
    } else if (isMuted == false) {
        sounds.forEach(sound => {
            sound.muted = false;
        });
    }
}

function soundOff() {
    isMuted = true;
    document.getElementById('soundOn').classList.add('d-none');
    document.getElementById('soundOff').classList.remove('d-none');
    sounds.forEach(sound => {
        sound.muted = true;
    });
}

function soundOn() {
    isMuted = false;
    document.getElementById('soundOff').classList.add('d-none');
    document.getElementById('soundOn').classList.remove('d-none');
    sounds.forEach(sound => {
        sound.muted = false;
    })
}

function fullScreen() {
    canvas.requestFullscreen();
}

function clearAllIntervals() {
    for (let i = 1; i < 99999; i++) window.clearInterval(i);
}
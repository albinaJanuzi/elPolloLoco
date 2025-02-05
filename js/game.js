let canvas;
let ctx;
let world;
let keyboard = new Keyboard();
let sounds = [];
background_sound = new Audio('audio/background.mp3');
win_sound = new Audio('audio/win.mp3');
lose_sound = new Audio('audio/lose.mp3');
background_sound.loop = true;
background_sound.volume = 0.1;//10%-100 Lautstärke



function startGame() {
    document.getElementById('startScreen').classList.add('d-none');
    document.getElementById('winScreen').classList.add('d-none');
    document.getElementById('loseScreen').classList.add('d-none');
    document.getElementById('mobileHud').classList.remove('d-none');
    
    initLevel();
    initGame();
    checkMobileDevice();

    background_sound.play();
    sounds.push(background_sound);
    sounds.push(win_sound);
    sounds.push(lose_sound);
}

function initGame() {
    canvas = document.getElementById('canvas');
    canvas.classList.remove('d-none');
    world = new World(canvas, keyboard);
}

function loseGame() {
    document.getElementById('canvas').classList.add('d-none');
    document.getElementById('loseScreen').classList.remove('d-none');
    document.getElementById('mobileHud').classList.add('d-none');
    for (let i = 1; i < 99999; i++) window.clearInterval(i);//this helps to get to a new game
    background_sound.pause();
    lose_sound.play();
}

function winGame() {
    document.getElementById('canvas').classList.add('d-none');
    document.getElementById('winScreen').classList.remove('d-none');
    document.getElementById('mobileHud').classList.add('d-none');
    for (let i = 1; i < 99999; i++) window.clearInterval(i);//this helps to get to a new game
    background_sound.pause();
    win_sound.play();
}


function checkMobileDevice() {
    let canvas = document.getElementById('canvas');
    if (window.matchMedia("(any-pointer: coarse)").matches && !canvas.classList.contains('d-none')) {
        document.getElementById('mobileHud').classList.remove('d-none');
    } else {
        document.getElementById('mobileHud').classList.add('d-none');
    }
}

function showGameInfos() {
    document.getElementById('gameInfo').classList.remove('d-none');
}

function hideGameInfos() {
    document.getElementById('gameInfo').classList.add('d-none');
}

function backToMenu() {
    document.getElementById('canvas').classList.add('d-none');
    document.getElementById('mobileHud').classList.add('d-none');
    document.getElementById('startScreen').classList.remove('d-none');
    document.getElementById('loseScreen').classList.add('d-none');
    document.getElementById('winScreen').classList.add('d-none');
    for (let i = 1; i < 99999; i++) window.clearInterval(i);
    this.background_sound.pause();
    this.win_sound.pause();
    this.lose_sound.pause();
}




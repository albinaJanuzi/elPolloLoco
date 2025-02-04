let canvas;
let ctx;
let world;
let keyboard = new Keyboard();
let sounds = [];
let isMuted = false;


function startGame() {
    document.getElementById('startScreen').classList.add('d-none');
    document.getElementById('winScreen').classList.add('d-none');
    document.getElementById('loseScreen').classList.add('d-none');
    document.getElementById('mobileHud').classList.remove('d-none');
    
    initLevel();
    initGame();
    checkMobileDevice();
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
}

function winGame() {
    document.getElementById('canvas').classList.add('d-none');
    document.getElementById('winScreen').classList.remove('d-none');
    document.getElementById('mobileHud').classList.add('d-none');
    for (let i = 1; i < 99999; i++) window.clearInterval(i);//this helps to get to a new game
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
    document.getElementById('howToPlay').classList.remove('d-none');
}

function hideGameInfos() {
    document.getElementById('howToPlay').classList.add('d-none');
}




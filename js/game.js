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
    document.getElementById('iconBar').classList.remove('d-none');
 
    
    initLevel();
    initGame();



}

function initGame() {
    canvas = document.getElementById('canvas');
    canvas.classList.remove('d-none');
    world = new World(canvas, keyboard);
}

function loseGame() {
    document.getElementById('canvas').classList.add('d-none');
    document.getElementById('iconBar').classList.add('d-none');
    document.getElementById('loseScreen').classList.remove('d-none');
    for (let i = 1; i < 99999; i++) window.clearInterval(i);
}

function winGame() {
    document.getElementById('canvas').classList.add('d-none');
    document.getElementById('iconBar').classList.add('d-none');
    document.getElementById('winScreen').classList.remove('d-none');
    for (let i = 1; i < 99999; i++) window.clearInterval(i);
}







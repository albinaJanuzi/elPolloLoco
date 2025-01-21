let canvas;
let ctx; // abkürzung context

let world = new World();

function init(){
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');
    console.log('My character is ', world.character);
}
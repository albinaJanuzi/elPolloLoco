let canvas;
let ctx; // abkürzung context
let character = new MovableObject();

function init(){
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');
    console.log('My character is ',character);
}
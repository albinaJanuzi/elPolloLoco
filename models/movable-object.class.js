class MovableObject  {
    x = 120;
    y = 400;
    img;

    loadImage(path){
        this.img = new Image(); // gleich wie document.getElementbyId
        this.img.src = path;
    }

    moveRight(){
        console.log('Moving right');
    }

    moveLeft(){

    }
}
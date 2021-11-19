var canvas = document.getElementById("canvas");
var ctx = canvas.getContext('2d');
var frame_num = 120;

width = window.innerWidth - 100;
height = window.innerHeight - 100;


var dino = {
    //
    x: 10,
    y: 200,
    width: 50,
    height: 50,
    draw() {
        ctx.fillStyle = 'red
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}


class Cactus {
    constructor() {
        this.x = 200
        this.y = 500
        this.width = 50
        this.height = 50
    }
    
    draw() {
        ctx.fillStyle = 'green';
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}



var timer = 0;
var cactus_list = [];

function animateFrames() {
    requestAnimationFrame(animateFrames);
    
    // clear all drawn thing
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    timer += 1; // increase the timer
    
    if (timer % frame_num === 0) {
        var cactus = new Cactus();
        cactus_list.push(cactus);
        cactus.draw();
    }
    
    cactus_list.forEach(() => {
        //TODO
    })
    
    //
    dino.draw();
}


animateFrames();

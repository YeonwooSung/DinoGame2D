var canvas = document.getElementById("canvas");
var ctx = canvas.getContext('2d');

ctx.width = window.innerWidth - 100;
ctx.height = window.innerHeight - 100;

var isJumping = false;
var jump_height_limit = 200;
var jump_time_limit = 200;
var timer_jump = 0;
var timer = 0;
var frame_num = 120;
var cactus_list = [];
var animation;


var dino = {
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
        
        //TODO ctx.drawImage(img, this.x, this.y)
    }
}



function animateFrames() {
    animation = requestAnimationFrame(animateFrames);
    
    // clear all drawn thing
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    timer += 1; // increase the timer
    
    // 일정 시간마다 장애물 추가
    if (timer % frame_num === 0) {
        var cactus = new Cactus();
        cactus_list.push(cactus);
    }
    
    cactus_list.forEach((a, i, o) => {
        if (a.x < 0) o.splice(i, 1)
        
        a.x -= 1; // decrease the x axis of obstacle
        
        isCollided(dino, a);
        a.draw(); // draw the obstacle
    })
    
    // check if the dino is jumping up
    if (isJumping) {
        dino.y -= 1;
        timer_jump += 1;
    }
    
    // check if the dino should fall down
    if (!isJumping && dino.y < jump_height_limit) {
        dino.y += 1;
    }
    
    // check if jump timer exceeds the time limit
    if (timer_jump > jump_time_limit) {
        isJumping = false;
        timer_jump = 0;
    }
    //
    dino.draw();
}


animateFrames();


document.addEventListener('keydown', function (e) {
    if (e.code == 'Space') isJumping = true;
});


// 충돌확인
function isCollided(playable, obstacle) {
    var x_diff = obstacle.x - (dino.x + dino.width);
    var y_diff = obstacle.y - (dino.y + dino.height);
    
    if (x_diff < 0 && y_diff < 0) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        // game over
        cancelAnimationFrame(animation);
    }
}

let canvas = document.querySelector("#canvas");
let ctx = canvas.getContext("2d");
let height = canvas.height;
let width = canvas.width;

const BALL_SIZE = 5;
let ballPosition = { x: 20, y: 30}; 

let xSpeed = 4 
let ySpeed = 2 

function draw(){
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, width, height);

    ctx.fillStyle = "white";
    ctx.fillRect(ballPosition.x, ballPosition.y, BALL_SIZE, BALL_SIZE);
}


function update(){
    ballPosition.x += xSpeed;
    ballPosition.y += ySpeed;
} 


function checkCollision(){
    let left = ballPosition.x;
    let right = ballPosition.x + BALL_SIZE;
    let top = ballPosition.y;
    let bottom = ballPosition.y + BALL_SIZE; 

    if(left < 0 || right > width){
    xSpeed = -xSpeed;
    }
    if(top < 0 || bottom > height){
    ySpeed = -ySpeed;
    }
}


function gameLoop(){ 
    draw();
    update();
    checkCollision(); 

    setTimeout(gameLoop, 30); 
} 


gameLoop(); 






let canvas = document.querySelector("#canvas");
let ctx = canvas.getContext("2d");
let height = canvas.height;
let width = canvas.width;

const MAX_COMPUTER_SPEED = 2; 

const BALL_SIZE = 5;
let ballPosition; 

let xSpeed; 
let ySpeed;

function initBall(){
    ballPosition = { x: 20, y: 30}; 
    xSpeed = 4;
    ySpeed = 2;
} 


const PADDLE_WIDTH = 5;
const PADDLE_HEIGHT = 20;
const PADDLE_OFFSET = 10; 

let leftPaddleTop = 10; 
let rightPaddleTop = 30; 

let leftScore = 0;
let rightScore = 0; 
let gameOver = false; 

document.addEventListener("mousemove", e=>{
    rightPaddleTop = e.y - canvas.offsetTop
}); 


function draw(){
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, width, height);

    ctx.fillStyle = "white";
    ctx.fillRect(ballPosition.x, ballPosition.y, BALL_SIZE, BALL_SIZE);

    ctx.fillRect(
    PADDLE_OFFSET,
    leftPaddleTop,
    PADDLE_WIDTH,
    PADDLE_HEIGHT
    );

    ctx.fillRect(
    width - PADDLE_OFFSET,
    rightPaddleTop,
    PADDLE_WIDTH,
    PADDLE_HEIGHT
    );
    
    ctx.strokeStyle = "white";
    ctx.font = "30px monospace"; 
    ctx.textAlign = "left"; 
    ctx.strokeText(leftScore.toString(), 50, 50);
    ctx.textAlign = "right"; 
    ctx.strokeText(rightScore.toString(), width-50, 50); 
}

function drawGameOver(){ 
    ctx.fillStyle = "white";
    ctx.font = "30px monospace";
    ctx.textAlign = "center";
    ctx.fillText("Game Over", width / 2, height / 2);

}

function followBall(){
    let ball = { 
    top : ballPosition.y,
    bottom : ballPosition.y + BALL_SIZE
    };

    let leftPaddle = { 
    top: leftPaddleTop,
    bottom : leftPaddleTop + PADDLE_HEIGHT
    }; 

    if (leftPaddle.top > ball.top){
    leftPaddleTop -= MAX_COMPUTER_SPEED;
    }else if(leftPaddle.bottom < ball.bottom){
    leftPaddleTop += MAX_COMPUTER_SPEED;
    }
} 


function update(){
    ballPosition.x += xSpeed;
    ballPosition.y += ySpeed;
} 

function checkPaddleCollision(ball, paddle){ 
    return (
        paddle.right > ball.left && 
        paddle.left < ball.right && 
        paddle.top < ball.bottom && 
        paddle.bottom > ball.top 
    ); 
} 


function adjuctAngle(distanceFromTop, distanceFromBottom){
    console.log(`top: ${distanceFromTop}, bottom: ${distanceFromBottom}`)
    if(distanceFromTop < 5){
        console.log("Top Hit!");
        ySpeed -= 0.5; 
    }else if(distanceFromBottom < -5){ 
        console.log("Bottom Hit!");
        ySpeed += 0.5; 
    } 

} 


function checkCollision(){
    let ball = { 
        left : ballPosition.x,
        right : ballPosition.x + BALL_SIZE,
        top : ballPosition.y,
        bottom : ballPosition.y + BALL_SIZE
    }
    

    let leftPaddle = { 
    left : PADDLE_OFFSET,
    right : PADDLE_OFFSET + PADDLE_WIDTH,
    top : leftPaddleTop,
    bottom : leftPaddleTop +  PADDLE_HEIGHT
    }

    let rightPaddle = { 
    left : width - PADDLE_OFFSET - PADDLE_WIDTH,
    right : width - PADDLE_OFFSET,
    top : rightPaddleTop, 
    bottom : rightPaddleTop + PADDLE_HEIGHT
    } 

    if(checkPaddleCollision(ball, leftPaddle)) { 
        let distanceFromTop = ball.top - leftPaddle.top; 
        let distanceFromBottom = ball.bottom - leftPaddle.bottom; 
        adjuctAngle(distanceFromTop, distanceFromBottom); 
        xSpeed = Math.abs(xSpeed);
    }

    if(checkPaddleCollision(ball, rightPaddle)) { 
        let distanceFromTop = ball.top - rightPaddle.top; 
        let distanceFromBottom = ball.bottom - rightPaddle.bottom; 
        adjuctAngle(distanceFromTop, distanceFromBottom); 
        xSpeed = -Math.abs(xSpeed);
    }

    if(ball.left < 0){
    rightScore ++;
    initBall()
    }

    if(ball.right > width){
    leftScore ++;
    initBall()
    }

    if(ball.top < 0 || ball.bottom > height){
    ySpeed = -ySpeed;
    }

    if (leftScore > 1|| rightScore > 1) { 
    gameOver = true; 
    }
}


function gameLoop(){ 
    draw();
    update();
    followBall();
    checkCollision(); 
    if(gameOver){
    draw()
    drawGameOver()
    }else {
    setTimeout(gameLoop, 30); 
    }
} 

initBall();
gameLoop(); 






const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");


class SnakePart{
    constructor(newX,newY){
        this.x = newX;
        this.y = newY;
    }
}



let speed = 7;
let tileCount = 25;
let tileSize = canvas.width/tileCount-2; 

//snake variables
let headX = 12;
let headY = 12;
const snakeParts = [];
let taillength = 1;


let xVelocity=0; 
let yVelocity=0;

//apple variables
let appleX = 5;
let appleY = 5;

let score = 0;
let difficulty = "Easy";

const gulpSound = new Audio("gulp.mp3");

//game loop
function drawGame(){

    changeSnakePosition();
    let result = isGameOver();
    if(result){
        return;
    }//end if

    clearScreen();
    
    checkAppleCollision();
    drawSnake();
    drawApple();

    drawScore();
    drawDifficulty();
    setTimeout(drawGame, 1000/speed);
    
}

function isGameOver(){
    let gameOver = false;

    if(yVelocity === 0 && xVelocity === 0){
        return false;
    }//end if


    //left wall collision
    if(headX < 0){
        gameOver = true;
    }//endif

    
    //right wall collision
    else if(headX === tileCount){
        gameOver = true;
    }//endif
    

    //top wall collision
    else if(headY < 0){
        gameOver = true;
    }//endif

    //top wall collision
    if(headY === tileCount){
        gameOver = true;
    }//endif

    for(let i = 0; i < snakeParts.length; i++){
        let part = snakeParts[i];
        if(part.x === headX && part.y === headY){
            gameOver = true;
            break;
        }//endif

    }//end if


    if(gameOver){
        //Create gradient for fill style
        var gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
        gradient.addColorStop("0", "magenta");
        gradient.addColorStop("0.5", "blue");
        gradient.addColorStop("1.0", "red");
        //Fill with gradient
        ctx.fillStyle = gradient;
        ctx.font = "50px Verdana";
        
        ctx.fillText("Game Over!", canvas.width/3.7, canvas.height/2.2);
    }//endif


    return gameOver;
}//end GameOver

function drawDifficulty(){
    //easy
    if(score < 10){  
        ctx.fillStyle = "green";
        ctx.font = "10px Verdana";
        ctx.fillText("Difficulty: " + difficulty, 5, 10);
    }

    //medium
    else  if(score >= 10 && score < 20){  
        difficulty = "medium";
        ctx.fillStyle = "orange";
        ctx.font = "10px Verdana";
        ctx.fillText("Difficulty: " + difficulty, 5, 10);
    }

    //hard
    else if(score >= 20){  
        difficulty = "hard";
        ctx.fillStyle = "red";
        ctx.font = "10px Verdana";
        ctx.fillText("Difficulty: " + difficulty, 5, 10);
    }
    
}//end drawDifficulty

function drawScore(){
    ctx.fillStyle = "white";
    ctx.font = "10px Verdana";
    ctx.fillText("Score: " + score, canvas.width-50, 10);
}

function clearScreen(){
    ctx.fillStyle = "black";
    ctx.fillRect(0,0,canvas.width, canvas.height);
}

function drawSnake(){
    
    
    //body of snake
    ctx.fillStyle = "green";
    for(let i = 0; i < snakeParts.length; i++){
        let part = snakeParts[i];
        ctx.fillRect(part.x * tileCount, part.y * tileCount, tileSize, tileSize);
    }
    

    //similar to stack, the tail is pushed next to the head
    snakeParts.push(new SnakePart(headX, headY));
    if(snakeParts.length > taillength){
        snakeParts.shift();
    }

    //head
    ctx.fillStyle = "orange";
    ctx.fillRect(headX * tileCount, headY * tileCount, tileSize,tileSize);
}

function changeSnakePosition(){
    headX = headX + xVelocity;
    headY = headY + yVelocity;
}

function drawApple(){
    ctx.fillStyle = "red";
    ctx.fillRect(appleX * tileCount , appleY * tileCount, tileSize, tileSize )
}


function checkAppleCollision(){
    //apple and head of the snake are in the same position
    if(appleX == headX && appleY == headY ){
        appleX = Math.floor(Math.random() * tileCount);
        appleY = Math.floor(Math.random() * tileCount);
        taillength++;
        score++;
        gulpSound.play();
        if(score >= 3){
            speed = speed + 0.3;
        }//endif
    }
}


document.body.addEventListener("keydown",keyDown);



function keyDown(event){
    //up
    if(event.keyCode == 38) {
        //already moving down
        if(yVelocity == 1){
            return;
        }
       yVelocity = -1;
       xVelocity = 0;
    }

    //down
    if(event.keyCode == 40)
    {
        //already moving up
        if(yVelocity == -1){
            return;
        }
        yVelocity = 1;
        xVelocity = 0;
    }

    //left
    if(event.keyCode == 37)
    {
        //already moving right
        if(xVelocity == 1){
            return;
        }
        yVelocity = 0;
        xVelocity = -1
    }

    //right
    if(event.keyCode == 39)
    {
        //already moving left
        if(xVelocity == -1){
            return;
        }
        yVelocity = 0;
        xVelocity = 1;
    }
    
}



drawGame();
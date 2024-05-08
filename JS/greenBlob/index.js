const canvas = document.getElementById("gameArea");
const ctx = canvas.getContext("2d");

//              Variables
let x = 100;
let y = 100;
let radius = 50;
let upPressed = false;
let downPressed = false;
let leftPressed = false;
let rightPressed = false;
let increaseSize = false;
let decreaseSize = false;
let speed = 10;

//                  Functions
//Game Loop
function drawGame(){
    requestAnimationFrame(drawGame);
    clearScreen();
    inputs();
    boundaryCheck();
    drawGreenBlob();
}

function boundaryCheck(){
    //top boundary
    if(y < radius)
    {
        y = radius;
    }

    //bottom boundary
    if(y > canvas.height - radius)
    {
        y = canvas.height-radius;
    }

    //left boundary
    if(x < radius)
    {
        x = radius;
    }

    //right boundary
    if(x > canvas.width - radius)
    {
        x = canvas.width-radius;
    }
}

function inputs(){
    //Moving Up
    if(upPressed)
    {
        y = y - speed;
    }

    //Moving Down
    if(downPressed)
    {
        y = y + speed;
    }

    //Moving Left
    if(leftPressed)
    {
        x = x - speed;
    }

    //Moving Right
    if(rightPressed)
    {
        x = x + speed;
    }

    if(increaseSize)
    {
        if(radius < 150)
        {
            radius = radius + 2;
        }
    }

    if(decreaseSize)
    {
        if(radius > 10)
        {
            radius = radius - 2;
        }
    }
}

function drawGreenBlob(){
    ctx.fillStyle = "green";
    if(upPressed)
    {
        ctx.fillStyle = "red";
    }

    if(downPressed)
    {
        ctx.fillStyle = "blue";
    }

    if(leftPressed)
    {
        ctx.fillStyle = "yellow";
    }

    if(rightPressed)
    {
        ctx.fillStyle = "purple";
    }

    
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI*2);
    ctx.fill();
}

function clearScreen(){
    ctx.fillStyle = "black";
    ctx.fillRect(0,0, canvas.width,canvas.height);
}

document.body.addEventListener("keydown",keyDown);
document.body.addEventListener("keyup", keyUp);

function keyDown(event){

    //up
    if(event.keyCode == 38)
    {
        upPressed = true;
    }

    //down
    if(event.keyCode == 40)
    {
        downPressed = true;
    }

    //left
    if(event.keyCode == 37)
    {
        leftPressed = true;
    }

    //right
    if(event.keyCode == 39)
    {
        rightPressed = true;
    }

    //x increase size
    if(event.keyCode == 88)
    {
        increaseSize = true;
    }

    //z - decrease size
    if(event.keyCode == 90)
    {
        decreaseSize = true;
    }
}

function keyUp(event){
     
    //up
    if(event.keyCode == 38)
    {
        upPressed = false;
    }

    //down
    if(event.keyCode == 40)
    {
        downPressed = false;
    }

    //left
    if(event.keyCode == 37)
    {
        leftPressed = false;
    }

    //right
    if(event.keyCode == 39)
    {
        rightPressed = false;
    }

    //x increase size
    if(event.keyCode == 88)
    {
        increaseSize = false;
    }

    //z - decrease size
    if(event.keyCode == 90)
    {
        decreaseSize = false;
    }
}

drawGame();
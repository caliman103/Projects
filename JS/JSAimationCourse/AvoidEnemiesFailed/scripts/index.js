/** @type {HTMLCanvasElement} */

//Shortcut for console.log
function log(value) {
    console.log(value)
}


//Get the required elements from the html file
const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')

//Set dimensions of canvas
const CANVAS_WIDTH = canvas.width = 1200
const CANVAS_HEIGHT = canvas.height = 600

//managing gameplay
let gameFrame = 0
let old = new Date().getTime();
let now
let deltaTime = 0

//boolean variables to manage the player moving
let upPressed = false;
let downPressed = false;
let leftPressed = false;
let rightPressed = false;
let zKeyPressed = false
let xKeyPressed = false
let spacePressed = false
let isPaused = true
let canPause = true

//Create instance of player object defined in player.js
let player = new Player()


//Setting up enemies
let numberOfEnemies = 0
let enemiesArray = []
let direction
let xPos
let level = 0



addEventListener('load', function() {
    //function to run game loop
    function play() {
        inputs()
        if(!isPaused) {
            //calculate delta time
        deltaTime =  getDeltaTime() * Math.pow(10, -12)

        //clear the canvas each iteration of the game loop
        ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)

        if(enemiesArray.length == 0) addEnemies()
        
        enemiesArray.forEach((enemy, index) => {
            enemy.collisionCheck(player)
            if(enemy.isDead) enemiesArray.splice(index, 1)
            enemy.update()
            enemy.draw()
        })

        //log(enemiesArray.length)
        //Player funcitons
        player.update()
        player.draw()

        gameFrame++

        
        }
        requestAnimationFrame(play)
    }//end play

    function getDeltaTime() {
        now = new Date().getTime()
        return old = now    
    }

    function addEnemies() {
        numberOfEnemies = Math.floor(Math.random() * 46 + 4)
        
        for(var i = 0 ;i < numberOfEnemies; i++ ) {
            level = Math.floor(Math.random() * 2)
            direction = Math.floor(Math.random() * 2)
            direction == 0 ? xPos = (Math.random() * 600 + CANVAS_WIDTH) : xPos = Math.random() * -800
            enemiesArray.push(new Enemy(level, direction, xPos))
        }
    }

    document.body.addEventListener("keydown",keyDown);
    document.body.addEventListener("keyup", keyUp);

    function inputs() {
        if(spacePressed) {
            if(canPause) {
                isPaused === true ? isPaused = false : isPaused = true
                canPause = false
                pauseTimer()
            }
        }//end spacePressed
    }

    function pauseTimer() {
        setTimeout(function() {
            canPause = true
        }, 400)
    }

    function keyDown(event) {
        //up
        if(event.keyCode == 38) {
            upPressed = true;
        }

        //down
        if(event.keyCode == 40) {
            downPressed = true;
        }

        //left
        if(event.keyCode == 37) {
            leftPressed = true;
        }

        //right
        if(event.keyCode == 39) {
            rightPressed = true;
        }

        //z
        if(event.keyCode == 90) {
            zKeyPressed = true
        }

        //x
        if(event.keyCode == 88) {
            xKeyPressed = true
        }

        //space
        if(event.keyCode == 32) {
            spacePressed = true
        }

    }//end keyDOwn

    function keyUp(event){  
        //up
        if(event.keyCode == 38) {
            upPressed = false;
        }

        //down
        if(event.keyCode == 40) {
            downPressed = false;
        }

        //left
        if(event.keyCode == 37) {
            leftPressed = false;
        }

        //right
        if(event.keyCode == 39) {
            rightPressed = false;
        }

        //z
        if(event.keyCode == 90) {
            zKeyPressed = false
        }

        //x
        if(event.keyCode == 88) {
            xKeyPressed = false
        }

        //space
        if(event.keyCode == 32) {
            spacePressed = false
        }

    }//end keyUp 

    //play the game
    play()
})

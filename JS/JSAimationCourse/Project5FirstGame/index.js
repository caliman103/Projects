/** @type {HTMLCanvasElement} */
function log(value) {
    console.log(value)
}
const taegetCanvas = document.getElementById('collisionCanvas')
const targetCtx = targetCanvas.getContext('2d')

targetCanvas.width = window.innerWidth
targetCanvas.height = window.innerHeight

const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')

canvas.width = window.innerWidth
canvas.height = window.innerHeight

const collisionCanvas = document.getElementById('collisionCanvas')
const collisionCtx = collisionCanvas.getContext('2d')

collisionCanvas.width = window.innerWidth
collisionCanvas.height = window.innerHeight



ctx.font = '50px Impact'
ctx.textAlign = 'center'

let score = 0
let highscore = 0
let timeToNextEnemy = 0
let mustBegin = true
let lives = 0
let enemyInterval = 500
let lastTime = 0
let enemytype = 0
let gameTime = 0


let target = new Image()



let enemies = []

class Enemy {
    constructor(type, time) {
        this.type = type
        this.image = new Image()
        if(type === 0) { 
            this.spriteWidth = 271
            this.sprightHeight = 194
            this.sizeModifier = Math.random() * 0.1 + 0.4
            this.width = this.spriteWidth * this.sizeModifier
            this.height = this.sprightHeight * this.sizeModifier
            this.directionX = Math.random() * 3 + 3 * (gameTime * 0.0002)
            this.directionY = Math.random() * 5 -2.5 
            this.image.src = 'raven.png'
            this.frameX = 0
            this.maxFrame = 4
        } else if(type === 1) {
            this.spriteWidth = 282
            this.sprightHeight = 282
            this.sizeModifier = Math.random() * 0.1 + 0.4
            this.width = this.spriteWidth * this.sizeModifier
            this.height = this.sprightHeight * this.sizeModifier
            this.directionX = Math.random() * 5 + 3.3 * (gameTime * 0.0005)
            this.directionY = Math.random() * 2.5 -2.5 
            this.image.src = 'beeSpriteSheet.png'
            this.frameX = 0
            this.maxFrame = 11
        }
        this.markedForDeletion = false
        this.x = canvas.width
        this.y = Math.random() * (canvas.height - this.height)
        this.timeSinceFlap = 0
        this.flapInterval = 350/this.directionX
        this.randomColours = [Math.floor(Math.random() * 255),Math.floor(Math.random() * 255), Math.floor(Math.random() * 255)]
        this.colour = 'rgb(' + this.randomColours[0] + ',' + this.randomColours[1] + ',' + this.randomColours[2] + ')'
    }//end constructor

    update(deltaTime) {
        if(this.y < -20 || this.y > (canvas.height - this.height)  ) {
            this.directionY *= -1
        }
        this.x -= this.directionX
        this.y += this.directionY
        if(this.x < 0 - this.width) {
            this.markedForDeletion = true
            // gameOver = true
            lives--
        }
        this.timeSinceFlap += deltaTime
        if(this.timeSinceFlap > this.flapInterval) {
            if(this.frameX > this.maxFrame) this.frameX = 0
            else this.frameX++
            this.timeSinceFlap = 0
        }
    }

    draw() {
        collisionCtx.fillStyle = this.colour
        collisionCtx.fillRect(this.x, this.y, this.width, this.height)
        ctx.drawImage(this.image, this.frameX * this.spriteWidth, 0, this.spriteWidth, this.sprightHeight, this.x, this.y, this.width, this.height)
        
    }
}//end Raven


let explosions = []

class Explosion {
    constructor(x, y, size) {
        this.image = new Image()
        this.image.src = 'boom.png'
        this.spriteWidth = 200
        this.sprightHeight = 179 
        this.size = size
        this.x = x
        this.y = y
        this.frameX = 0
        this.sound = new Audio()
        this.sound.src = 'boom.wav'
        this.timeSinceLastFrame = 0
        this.frameInterval = 200
        this.markedForDeletion
    }//end constructor

    update(deltaTime) {
        if(this.frameX === 0) this.sound.play()
        this.timeSinceLastFrame += deltaTime
        if(this.timeSinceLastFrame > this.frameInterval) {
            this.frameX++
            this.timeSinceLastFrame = 0
        }
        if(this.frameX > 5) this.markedForDeletion = true
    }//end update

    draw() {
        ctx.drawImage(this.image, this.frameX * this.spriteWidth, 0, this.spriteWidth, this.sprightHeight, this.x, this.y - this.size/4, this.size, this.size)
    }
}//end explosion



function drawScore() {
    ctx.fillStyle = 'black'
    if(highscore <= score) highscore = score 
    ctx.fillText('Highscore : ' + highscore, 150, 55)
    ctx.fillStyle = 'white'
    ctx.fillText('Highscore : ' + highscore, 153, 57)

    ctx.fillStyle = 'black'
    ctx.fillText('Score : ' + score, 104, 112)
    ctx.fillStyle = 'white'
    ctx.fillText('Score : ' + score, 108, 114)

    ctx.fillStyle = 'black'
    ctx.fillText('Lives : ' + lives, 99, 170)
    ctx.fillStyle = 'white'
    ctx.fillText('Lives : ' + lives, 103, 172)
}

function restartTimer() {
    mustBegin = true
}

function restartGame() {
    enemies.splice(0, enemies.length)
    explosions.splice(0, explosions.length)
    lives = 5
    score = 0
    mustBegin = false
    gameTime = 0
}

function drawGameOver() {
    ctx.fillStyle = 'black'
    ctx.fillText ('GAME OVER, your score is ' + score, canvas.width/2, canvas.height/2)
    ctx.fillStyle = 'white'
    ctx.fillText ('GAME OVER, your score is ' + score, canvas.width/2 + 3, canvas.height/2 + 3)
}

function drawPlayAgain() {
    ctx.fillStyle = 'black'
    if(highscore === 0) {
        ctx.fillText ('Click to play', canvas.width/2, canvas.height/2)
        ctx.fillStyle = 'white'
        ctx.fillText ('Click to play', canvas.width/2 + 3, canvas.height/2 + 3) 
    }
    else if( highscore > 0) {
        ctx.fillText ('Click to play again', canvas.width/2, canvas.height/2)
        ctx.fillStyle = 'white'
        ctx.fillText ('Click to play again', canvas.width/2 + 3, canvas.height/2 + 3)
    }
    
}

window.addEventListener('click', function(e) {
    if(mustBegin === true) {
        setTimeout(restartGame, 800);
    }
    else {
        const detectPixelColour = collisionCtx.getImageData(e.x, e.y, 1, 1)
        const pixelColour = detectPixelColour.data

        enemies.forEach(enemy => {
            if(enemy.randomColours[0] === pixelColour[0] && enemy.randomColours[1] === pixelColour[1] && enemy.randomColours[2] === pixelColour[2]) {
                //detects collision by colour
                enemy.type === 0 ? score++ : score += 2
                enemy.markedForDeletion = true
                if(score % 50 === 0 && timeToNextEnemy > 340) timeToNextEnemy -= 30
                
                explosions.push(new Explosion(enemy.x, enemy.y, enemy.width))
            }
        })
    }
    
})


window.addEventListener('mousemove', function(e) {
    target.src = 'target_icon.png'
    targetCtx.clearRect(0, 0, taegetCanvas.width, targetCanvas.height)
    targetCtx.drawImage(target, e.x - 35, e.y - 35, 70, 70)
})



function animate(timestamp) {
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    if(lives > 0 && mustBegin === false) {
        collisionCtx.clearRect(0, 0, canvas.width, canvas.height)
        let deltaTime = timestamp - lastTime
        lastTime = timestamp
        timeToNextEnemy += deltaTime 
        if(timeToNextEnemy > enemyInterval) {
            enemytype = Math.floor(Math.random() * 2)
            enemies.push(new Enemy(enemytype, timestamp))
            timeToNextEnemy = 0
            enemies.sort(function(a,b) {
                return a.width - b.width
            })
        }
        drawScore();
        //array literal
        [...enemies, ...explosions].forEach(object => object.update(deltaTime));
        [...enemies, ...explosions].forEach(object => object.draw());
        enemies = enemies.filter(object => !object.markedForDeletion)
        explosions = explosions.filter(object => !object.markedForDeletion)    
    }
    else{ 
        lives = 0
        drawScore()
        if(!mustBegin) {
            drawGameOver()
            setTimeout(restartTimer, 2000)
        }
        if(mustBegin) drawPlayAgain()
    }
    gameTime++
    requestAnimationFrame(animate)
}

animate(0)



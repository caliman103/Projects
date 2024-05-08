/** @type {HTMLCanvasElement} */

function log(value) {
    console.log(value)
}

const canvas = document.getElementById('canvas1')
const ctx = canvas.getContext('2d')

const CANVAS_WIDTH = canvas.width = 500
const CANVAS_HEIGHT = canvas.height = 740

const numberOfEnemies = 20
const enemiesArray = []

let gameFrame = 0;
   

class Enemy {
    constructor() {
        this.image = new Image()
        this.image.src = 'enemy4.png'
        this.speed = Math.random() * 4 + 1
        this.spriteWidth = 213
        this.spriteHeight = 213
        this.width = this.spriteWidth/3.5
        this.height = this.spriteHeight/3.5
        this.x = Math.random() * (CANVAS_WIDTH - this.width)
        this.y = Math.random() * (CANVAS_HEIGHT - this.height)
        this.newX = Math.random() * (CANVAS_WIDTH - this.width)
        this.newY = Math.random() * (CANVAS_HEIGHT - this.height)
        this.frame = 0
        this.flapSpeed = Math.floor(Math.random() * 3 + 1)
        this.interval = Math.floor(Math.random() * 200 + 50)

    }//end constructor

    update() {
        if(gameFrame % this.interval === 0) {
            this.newX = Math.random() * (CANVAS_WIDTH - this.width)
            this.newY = Math.random() * (CANVAS_HEIGHT - this.height)
        }

        let dx = this.x - this.newX
        let dy = this.y - this.newY

        this.x -= dx/50
        this.y -= dy/50

        //Enemy moved behind left edge of canvas so put it back to the right
        //makes it look like its continoulsy flying 
        if(this.x + this.width < 0) this.x = CANVAS_WIDTH


        if(gameFrame % this.flapSpeed === 0) {
            this.frame > 7 ? this.frame = 0 : this.frame++
        }
        //animate sprites
    }//end update

    draw() {
        ctx.drawImage(this.image, this.frame * this.spriteWidth, 0, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height)
    }//en draw
}//end enemythis

//create enemy objects using the numberOfEnemies variables
for(let i = 0; i < numberOfEnemies; i++) {
    enemiesArray.push(new Enemy())
}

function animate() {
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)

    //update and draw all enemies at once
    enemiesArray.forEach((enemy) =>
    {
        enemy.update()
        enemy.draw()
    })

    gameFrame++
    requestAnimationFrame(animate)
}//end animate

animate()

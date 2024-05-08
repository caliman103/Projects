1/** @type {HTMLCanvasElement} */

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
        this.image.src = 'enemy3.png'
        this.speed = Math.random() * 4 + 1
        this.spriteWidth = 218
        this.spriteHeight = 177
        this.width = this.spriteWidth/3.5
        this.height = this.spriteHeight/3.5
        this.x = Math.random() * (CANVAS_WIDTH - this.width)
        this.y = Math.random() * (CANVAS_HEIGHT - this.height)
        this.frame = 0
        this.flapSpeed = Math.floor(Math.random() * 3 + 1)
        this.angle = 0 //create wavy look on y axis
        this.angleSpeed = Math.random() * 2 + 1 
        //this.curve = Math.random() * 200 + 50
    }//end constructor

    update() {
        // this.x = this.curve * Math.sin(this.angle * Math.PI/270)  + (CANVAS_WIDTH/2 - this.width/2)

        //this one is used to let the enemies use the entire canvas
        this.x = canvas.width/2 * Math.sin(this.angle * Math.PI/90)  + (CANVAS_WIDTH/2 - this.width/2)
        
        //this.y = this.curve * Math.cos(this.angle * Math.PI/180)  + (CANVAS_HEIGHT/2 - this.height/2)
        this.y = canvas.height/2 * Math.cos(this.angle * Math.PI/180)  + (CANVAS_HEIGHT/2 - this.height/2)
        
        this.angle += this.angleSpeed
        //this.curve += 0.01

        //Enemy moved behind left edge of canvas so put it back to the right
        //makes it look like its continoulsy flying 
        if(this.x + this.width < 0) this.x = CANVAS_WIDTH


        if(gameFrame % this.flapSpeed === 0) {
            this.frame > 4 ? this.frame = 0 : this.frame++
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
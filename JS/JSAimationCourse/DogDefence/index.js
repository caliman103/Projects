import InputHandler from './inputHandler.js'
import Player from './player.js'
//Start Typing Log
function log(value) {
    console.log(value)
}

window.addEventListener('load', function() {
    
    /** @type {HTMLCanvasElement} */
    const canvas = document.getElementById('canvas')
    const ctx = canvas.getContext('2d')

    canvas.width = 1200
    canvas.height = 600

    let lastTime = 0

    class Game {
         constructor(ctx, width, height) {
            this.ctx = ctx
            this.width = width
            this.height = height
            this.gameFrame = 0
            this.input = new InputHandler()
            this.player = new Player(this.width, this.height)
            this.enemies = []
            this.numberOfEnemies = 0
        }//end constructor
 
        update(deltaTime){
            this.gameFrame++
            //ADD UPATE CODE
            this.player.update(this.input.keys, deltaTime)
        }//end update

        draw(){
            this.player.draw(this.ctx, this.gameFrame)
            /* this.enemies.forEach((enemy) =>{
                enemy.draw(this.ctx)
            })//end forEach */
            
        }//end draw

    }//end Game class

    const game = new Game(ctx, canvas.width, canvas.height)  

    function play(timeStamp){
        //Clear canvas each loop
        ctx.clearRect(0, 0, canvas.width, canvas.height)

        //Calculate deltaTime
        const deltaTime = timeStamp - lastTime
        lastTime = timeStamp

        game.update(deltaTime)
        game.draw()

        requestAnimationFrame(play)
    }//end play

    play(0)
})//end load event listener
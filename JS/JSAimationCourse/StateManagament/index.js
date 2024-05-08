import Player from './player.js';
import inputHandler from './input.js';
import { drawStatusText } from './utils.js';

//Shortcut fot console.log()
function log(value) {
    console.log(value)
}
window.addEventListener('load', function() {
    /** @type {HTMLCanvasElement} */
    document.getElementById('loading').style.display = 'none'

    const canvas = document.getElementById('canvas')
    const ctx = canvas.getContext('2d')

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    let lastTime = 0


    

    /* class Game {
         constructor(ctx, width, height) {
            this.ctx = ctx
            this.width = width
            this.height = height
            this.enemies = []
        }//end constructor

        update(deltaTime){
            //ADD UPATE CODE
        }//end update

        draw(){
            this.enemies.forEach((enemy) =>{
                enemy.draw(this.ctx)
            })//end forEach
        }//end draw

    }//end Game class */

    //const game = new Game(ctx, canvas.width, canvas.height)
    const player = new Player(canvas.width, canvas.height)
    

    const input = new inputHandler()

    function play(timeStamp){
        //Clear canvas each loop
        ctx.clearRect(0, 0, canvas.width, canvas.height)

        //Calculate deltaTime
        const deltaTime = timeStamp - lastTime
        lastTime = timeStamp

        /* game.update(deltaTime)
        game.draw() */

        player.update(input.lastKey)
        player.draw(ctx)

        drawStatusText(ctx, input, player)

        requestAnimationFrame(play)
    }//end play

    play(0)
})//end load event listener
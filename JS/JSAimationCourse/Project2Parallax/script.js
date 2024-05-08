//shortcut for log funcion
function log(value) {
    console.log(value)
}

//get elements from the html file
const canvas = document.getElementById('canvas1')
const ctx = canvas.getContext('2d')



//set up drawing board
const CANVAS_WIDTH = canvas.width = 800
const CANVAS_HEIGHT = canvas.height = 700

//Used to change scrolling speed of parallax 
let gameSpeed = 3

//used to calculate x position
//let gameFrame = 0

//Set up variables for the background images
const backgroundLayer1 = new Image()
const backgroundLayer2 = new Image()
const backgroundLayer3 = new Image()
const backgroundLayer4 = new Image()
const backgroundLayer5 = new Image()

//Get the source files for all of the images
backgroundLayer1.src = 'layer-1.png'
backgroundLayer2.src = 'layer-2.png'
backgroundLayer3.src = 'layer-3.png'
backgroundLayer4.src = 'layer-4.png'
backgroundLayer5.src = 'layer-5.png'


//only play game once everything is loaded
window.addEventListener('load', function() {
    //Getting stuff that will be used to change the speed from html file
    const slider = document.getElementById('slider')
    slider.value = gameSpeed;

    const showGameSpeed = document.getElementById('showGameSpeed')
    showGameSpeed.innerHTML = gameSpeed;

    slider.addEventListener('change', function(e) {
        gameSpeed = e.target.value
        showGameSpeed.innerHTML = gameSpeed;
    })

    class Layer {
        constructor(image, speedModifier) {
            this.x = 0
            this.y = 0
            this.width = 2400
            this.height = 700;   
            this.image = image
            this.speedModifier = speedModifier
            this.speed = gameSpeed * this.speedModifier
        }//end constructor

        //change the position of the image
        update() {
            this.speed = gameSpeed * this.speedModifier
        
            if(this.x < -2400) {
                this.x = 0
            }
            this.x = this.x -this.speed
            
            //this.x = (gameFrame * this.speed) % this.width
    
        }

        //draw the image onto the canvas
        draw() {
            ctx.drawImage(this.image, this.x, this.y, this.width, this.height)
            ctx.drawImage(this.image, this.x + this.width, this.y, this.width, this.height)
        }
    }//end Layer class

    const layer1 = new Layer(backgroundLayer1, 0.1)
    const layer2 = new Layer(backgroundLayer2, 0.2)
    const layer3 = new Layer(backgroundLayer3, 0.7)
    const layer4 = new Layer(backgroundLayer4, 0.8)
    const layer5 = new Layer(backgroundLayer5, 1.0)

    const gameObjects = [layer1, layer2, layer3, layer4, layer5]

    function animate() {
        ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)
        
        gameObjects.forEach((object) => {
            object.update()
            object.draw()
        })

        //gameFrame--

        //run game loop over and over
        requestAnimationFrame(animate)
    }//end animate

    animate()
})//end load



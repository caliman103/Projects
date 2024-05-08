//function to save time when using console.log
function log(value) {
    console.log(value)
}
let playerState = 'idle'
const dropdown = document.getElementById('animations')


dropdown.addEventListener('change', function(e){
    playerState = e.target.value
})

const canvas = document.getElementById('canvas1')
const ctx = canvas.getContext('2d')

//set the width and height if canwas to 600 px the cosnstant will be used in this script
const CANVAS_WIDTH = canvas.width = 600;
const CANVAS_HEIGHT = canvas.height = 600;

//Enables the use of images, the Image() constructor is the same as having an image tage in html
const playerImage = new Image()
playerImage.src = 'shadow_dog.png'

//used to get the dimensions of the spirtes from the spritesheet image
const SPRITE_WIDTH = 575//(6876/12) - 3 // divide width of entire file by number of columns
const SPRITE_HEIGHT = 523//(5230/10)    //divide height of entire file by number of rows

//These 2 variables will be used to manage speed of game
let gameFrame = 0
const staggerFrame = 3 

//container to manage sprite spreadsheet
let spriteAnimations = []
let animationStates = [
            {
                name: 'idle',
                frames : 7,
                reverse : false
                
            },
            {
                name: 'jump',
                frames : 7,
                reverse : false

            },
            {
                name: 'fall',
                frames : 7,
                reverse : false
            },
            {
                name: 'run',
                frames : 9,
                reverse : false
            },
            {
                name: 'dizzy',
                frames : 11,
                reverse : false
            },
            {
                name: 'sit',
                frames : 5,
                reverse : false
            },
            {
                name: 'roll',
                frames : 7,
                reverse : false
            },
            {
                name: 'bite',
                frames : 7,
                reverse : false
            },
            {
                name: 'ko',
                frames : 12,
                reverse : false
            },
            {
                name: 'getHit',
                frames : 4,
                reverse : false
            }
        ]

animationStates.forEach((state, index) => {
    let frames = {
        loc : []
    }

    for(let j = 0; j < state.frames; j++) {
        let positionX = j * SPRITE_WIDTH     //for skipping thru spreadsheet
        let positionY = index * SPRITE_HEIGHT
        frames.loc.push({x : positionX, y: positionY})
    }
    //Take the spriteAnimations array and adda key value pair to it. the key is the name in the of state
    //and the value if the frames object created in that iteration of the for each
    spriteAnimations[state.name] = frames
})

log(spriteAnimations)

//this is the animation loop
function animate() {
    //Each frame the screen will be cleared so this function will be used at the start. It takes four arguments
    //which make up the area to clear. it start from coordinate (0,0) and end at (600, 600) canstants were used instead
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)

    //Moves to the new frame in the player state row after the correct number of game frames has passed
    let position = Math.floor(gameFrame/staggerFrame) % spriteAnimations[playerState].loc.length
    let frameX = SPRITE_WIDTH * position
    let frameY = spriteAnimations[playerState].loc[position].y


    //After the screen is cleared then we can begin to draw this frame.
    //use drawImage() function to draw the player image
    //We will be using the drawImage() that has 9 parameters
    //drawImage(image, srcx, srcy, srcw, srch, destx, desty, dest,w, dest,h)
    //This will be used to cut of the portion of the image that you want to draw 
    ctx.drawImage(playerImage, frameX, frameY, SPRITE_WIDTH, SPRITE_HEIGHT, 0, 399, 200, 200)

    
    
    //increase gameFrame to work with the modilus
    gameFrame++
    //the requestanimateFrame runs a function that was passed to it. So we will pass the animate function
    //and it will run this over and over.
    requestAnimationFrame(animate)
}//end animate

//Game loop function
animate();


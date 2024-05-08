//function to save time when using console.log
function log(value) {
    console.log(value)
}

//get the canvas and its context from the html file
const canvas = document.getElementById('canvas1')
const ctx = canvas.getContext('2d')


//set the width and height if canwas to 600 px the cosnstant will be used in this script
const CANVAS_WIDTH = canvas.width = 600;
const CANVAS_HEIGHT = canvas.height = 600;

//testing moving sprite
let img = 8
let imgCounter = 1
let frame = 0;
let spriteX = 0
let spriteXinc = 2

//converting to radians
let TO_RADIANS = Math.PI/180;

// let x = 0
// let xInc = 5;

//Enables the use of images, the Image() constructor is the same as having an image tage in html
const playerImage = new Image()
playerImage.src = 'shadow_dog.png'


//used to get the dimensions of the spirtes from the spritesheet image
const SPRITE_WIDTH = (6876/12) - 3 // divide width of entire file by number of columns
const SPRITE_HEIGHT = (5230/10)    //divide height of entire file by number of rows


//this is the animation loop
function animate() {
    //Each frame the screen will be cleared so this function will be used at the start. It takes four arguments
    //which make up the area to clear. it start from coordinate (0,0) and end at (600, 600) canstants were used instead
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)

    // if(x > 500 || x < 0) {
    //     xInc *= -1
    // }
    
    // x += xInc
    // ctx.fillRect(x, 50, 100, 100)

    frame++

    if((frame % 3) == 0) {
        if(img >= 10 || img <= 1) {
            imgCounter *= -1
            
        }
        img += imgCounter;
    }
    
    //Move sprite
    spriteX += spriteXinc

    //images sprite reached edge of convas
    if(spriteX > CANVAS_WIDTH - 100 || spriteX < 0)  {
        spriteXinc *= -1
        spriteXinc > 0 ? playerImage.src = 'shadow_dog.png' : playerImage.src = 'shadow_dog_mirror.png'

    }


    ctx.drawImage(playerImage, img * SPRITE_WIDTH, 4 * SPRITE_HEIGHT, SPRITE_WIDTH, SPRITE_HEIGHT, spriteX, 499, 100, 100)

    

    //After the screen is cleared then we can begin to draw this frame.
    //use drawImage() function to draw the player image
    //We will be using the drawImage() that has 9 parameters
    //drawImage(image, srcx, srcy, srcw, srch, destx, desty, dest,w, dest,h)
    //This will be used to cut of the portion of the image that you want to draw 
    //ctx.drawImage(playerImage, 0 * SPRITE_WIDTH, 4 * SPRITE_HEIGHT, SPRITE_WIDTH, SPRITE_HEIGHT, 0, 499, 100, 100)



    //the requestanimateFrame runs a function that was passed to it. So we will pass the animate function
    //and it will run this over and over.
    requestAnimationFrame(animate)
}//end animate()


//Game loop function
animate();
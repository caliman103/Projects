//This file holds all the relavant information about the player

//Create instance of player object defined in player.js
class Player {

    constructor() {
        this.image = new Image()
        this.image.src = 'images/player/shadow_dog_spritesheet.png'
        this.columnsInSpritesheet = 12
        this.spriteWidth = 286.5
        this.spriteHeight = 261.5
        this.width = this.spriteWidth/2.2
        this.height = this.spriteHeight/2.2
        this.upperLevel = 350
        this.lowerLevel = CANVAS_HEIGHT - (this.height + 1) 
        this.x = (CANVAS_WIDTH/2 - this.width)
        this.y = this.upperLevel //CANVAS_HEIGHT - (this.height + 0.5)
        this.normalSpeed = 2.0
        this.speed = this.normalSpeed //Math.floor(Math.random() * 3 + 2)
        this.speedModifier = 4
        this.normalFrameRate = this.speedModifier
        this.biteFrameRate = 0.5
        this.direction = 'right'
        this.level = 'upper'
        this.changeLevel = false
        this.canChangeLevel = true
        this.frameX = 0
        this.frameY = 0
        this.position = 0
        this.playerState = 'idle'
        this.canMove = true
        this.running = false
        this.showRunState = true
        this.canJump = true
        this.maxJumpHeight = this.upperLevel - 200
        this.jumpSpeed = 7
        this.jumping = false
        this.falling = false
        this.startedJumpTimer = false
        this.jumpDelay = 600
        this.inAir = false
        this.biting = false
        this.canBite = true
        this.biteDelay = 450
        this.canRoll = true
        this.rolling = false
        this.rollGuageLimit = 200
        this.rollingSpeed = this.speed * 2  
        this.currentRollGuage = 0
        this.startedRollTimer = false
        this.isDizzy = false
        this.startedDizzyTimer = false
        this.leftHit = this.x + 20
        this.rightHit = this.width - 20
        this.topHit = this.y + 20
        this.bottomHit = this.height - 20
        this.canGetHit = true
        this.isHit = false
        this.damaged = false
        this.startedHitTimer = false
        this.bouncing = false
        this.rising = false
        this.maxBounceHeight = this.upperLevel - 160
        this.health = 6
        this.spriteAnimations = []
        this.animationStates = []
        this.acquireStates()  
    }//end constructor

    //Function to handle getting the spates appropriately from the spritesheet
    acquireStates() {
        this.animationStates = [
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
            },
            {
                name: 'idleRev',
                frames : 7,
                reverse : true
            },
            {
                name: 'jumpRev',
                frames : 7,
                reverse : true
            },
            {
                name: 'fallRev',
                frames : 7,
                reverse : true
            },
            {
                name: 'runRev',
                frames : 9,
                reverse : true
            },
            {
                name: 'dizzyRev',
                frames : 11,
                reverse : true
            },
            {
                name: 'sitRev',
                frames : 5,
                reverse : true
            },
            {
                name: 'rollRev',
                frames : 7,
                reverse : true
            },
            {
                name: 'biteRev',
                frames : 7,
                reverse : true
            },
            {
                name: 'koRev',
                frames : 12,
                reverse : true
            },
            {
                name: 'getHitRev',
                frames : 4,
                reverse : true
            }
        ]
        this.animationStates.forEach((state, index) => {
            let frames = {
                loc : []
            }
            let positionX = 0
            let positionY = 0
            for(let j = 0; j < state.frames; j++) {
                //Used to see skip through spriteSheet if the image is reversed then start from the last frams and descend
                state.reverse === false ? positionX = j * this.spriteWidth : positionX = (((this.columnsInSpritesheet-1) - j) * this.spriteWidth) - 5
                positionY = index * this.spriteHeight
                frames.loc.push({x : positionX, y: positionY})
            }//end for 
            //Take the spriteAnimations array and adda key value pair to it. the key is the name in the of state
            //and the value if the frames object created in that iteration of the for each
            this.spriteAnimations[state.name] = frames
        })
    }//end acquireStates

    //=====================================================================================// 
    //===================================== BOUNDARY ======================================//
    //=====================================================================================//
    /* This makes sure the player doesn't go beyong the canvas walls. This is done by check 
     * x position of the player and when the go beyond the walls continously set them back to
     * being in front the wall
     */
    boundaryCheck() {
        if(this.x < 0) this.x = 0
        if(this.x > (CANVAS_WIDTH - this.width)) this.x = CANVAS_WIDTH - this.width
    }

    //=====================================================================================// 
    //===================================== RUN LEFT ======================================//
    //=====================================================================================//
    /* This function allows the player to run to the left. It is triggered when the player
     * presses the left arrow key in is called in game.js. This function will decrease the
     * player's x position by this.speed * deltatime. It also changes the direction of the 
     * player to left. If the players is not performing any other function then the player
     * will show the runRev state in the spritesheet. If the players is not currently running
     * the the running will be set to true and the position for the frame in the spritesheet 
     * will be 0.
     */
    runLeft() {
        if(this.canMove && !this.isDizzy) {
            if(this.showRunState) {
                if(!this.running) {
                    this.running = true
                    this.position = 0    
                }
                this.playerState = 'runRev'
                this.rolling = false
            }
            this.direction = 'left' 
            this.x -= this.speed * deltaTime
        }
    }

    //=====================================================================================// 
    //==================================== RUN RIGHT ======================================//
    //=====================================================================================//
    /*
     * Just read the explanation for runLeft and figure it out is basically the same thing
     */
    runRight() {
        if(this.canMove && !this.isDizzy) {
            if(this.showRunState) {
                if(!this.running) {
                    this.running = true
                    this.position = 0
                }
                this.playerState = 'run'
                this.rolling = false
            }        
            this.direction = 'right'
            this.x += this.speed * deltaTime 
        }
    }

    sit() {
        if(!this.inAir && !this.jumping && !this.biting && !this.rolling && !this.isDizzy) {
            if(this.level === 'lower') {
                this.canMove = false
                this.running = false
                this.selectState('sit')
            }
            if(this.level === 'upper' && this.canChangeLevel === true) {
                this.changeLevel = true;
            }
        }
    }

    //=====================================================================================// 
    //==================================== START JUMP =====================================//
    //=====================================================================================//
    /* Allows the player to start jumping. This is done by changing the classes this.jumping
     * variable to true. This allows the jump() function, which is called in game.js to take
     * effect. the startJump funnction also doesn't allow the run state in the spritesheet
     * to be displayed. It also sets the position of the spritesheet to 0. Please note all of
     * this is only done if the player can currently move. Certain effects prevent the user 
     * from moving example being hit of biting
     */
    startJump() {
        if(this.canMove && !this.isDizzy && this.canJump) {
            if(!this.jumping) {
                this.jumping = true
                this.showRunState = false
                this.running = false
                this.position = 0;
                this.canChangeLevel = false
            }
        }
    }//end setJump()

    startBounce() {
        this.bouncing = true
        this.rising = true
        this.canJump = false
        this.showRunState = false
        this.canGetHit = false
        this.inAir = true
        if(!this.rolling && !this.biting) this.selectNewState('jump')
        
    }//end bounce

    bounce() {
        if(this.bouncing) {
            if(this.rising && this.y > this.maxBounceHeight ) { 
                this.y -= this.jumpSpeed * deltaTime
                this.isHit = false
                //log('in')
            } else if(this.y < this.upperLevel && this.bouncing && !this.isHit) {
                this.isHit === true ? this.rising = true : this.rising = false
                if(!this.rolling && !this.biting ) this.selectState('fall')
                this.fall()  
            } else {
                this.selectState('idle')
                this.bouncing = false
                this.canJump = true
                this.showRunState = true
                this.falling = false  
                this.jumping = false
                this.canGetHit = true
                this.inAir = false
            }
        }
    }  

    //=====================================================================================// 
    //====================================== JUMP =========================================//
    //=====================================================================================//
    /* This is the function that allows the player to jump. This function is continously 
     * called in game.js but the player is only allowed to jump if this.jumping is true &
     * this.rolling is false. Once these conditions are met then this.inAir is set to true. 
     * This is done since some functions can't be carried out if the player is in the air. 
     * This function goes into the jumping state where the user is decreasing the y position, 
     * this goes up tp this.maxJumpHeight. After the player reaches the max height then it goes
     * into the falling state where the player will drop to the gound. Once the player reaches
     * the ground then this.inAir is set to false anda timer is places up to this.jumpDelay 
     * until the user can jump again. This is done to prevent the user form spamming the jump move
     */
    jump () {
        this.inAir = true
        this.level === 'upper' ? this.maxJumpHeight = this.upperLevel - 230 : this.maxJumpHeight = this.lowerLevel - 240
        if(this.y > this.maxJumpHeight && !this.falling) {
            if(!this.rolling && !this.biting) this.selectState('jump')
            this.y -= this.jumpSpeed * deltaTime
        } else if(this.y < this.upperLevel && this.canJump) {
            if(!this.rolling && !this.biting ) this.selectState('fall')
            this.level = 'upper'
            this.fall()
        } else {
            this.inAir = false
            this.canJump = false
            if(this.startedJumpTimer === false) {
                this.y =  this.upperLevel
                if(!this.rolling ) this.selectState('idle')
                this.JumpTimer(this.jumpDelay)
                this.changeLevelTimer()
            }   
        }
    }//end jump
    
    //=====================================================================================// 
    //====================================== FALL =========================================//
    //=====================================================================================//
    /* This is the function that allows th player to fall to the ground. It is called once 
     * the player has reached the max jump height and all it does it increase the y position.
     * This function will be called over and over in this.jump() until the player reaches 
     * the ground .
     */
    fall() {
        this.falling = true
        this.y += (this.jumpSpeed - 2) * deltaTime
    }//end fall


    JumpTimer(delay) {
        this.startedJumpTimer = true
        this.showRunState = true
        var that =  this
        setTimeout(function() {
                that.jumping = false
                that.falling = false
                that.startedJumpTimer = false
                that.canJump = true
        }, delay)
        
    }//end canJump


    takeHit() {
        if(this.canGetHit) {
            if(!this.damaged) {
                this.canMove = false
                this.canBite = false
                this.canChangeLevel = false
                this.canRoll = false
                this.canGetHit = false
                this.damaged = true
                this.biting = false
                this.selectNewState('getHit')
            }
        }
    }

    hit() {
        if(this.damaged) {
            this.speedModifier = 30
            if(this.position >= this.spriteAnimations['getHit'].loc.length - 1) {
                this.health--
                this.speedModifier = this.normalFrameRate
                this.canMove = true
                this.canBite = true
                this.canChangeLevel = true
                this.canJump = true
                this.canRoll = true
                this.damaged = false
                this.selectState('idle')
                this.startedHitTimer = true
                this.hitTimer()
            }
        }
    }

    hitTimer() {
        var that = this
        setTimeout(function() {
            that.canGetHit = true
            that.startedHitTimer = false
        }, 3000)

    }//end hitTimer

    startBite() {
        if(this.canBite && !this.isDizzy && !this.rolling && !this.isHit) {
            this.canBite = false
            this.biting = true
            this.position = 0
            this.canMove = false  
            this.selectState('bite')
        }
    }
        
    bite() {
        if(this.biting) { 
            this.speedModifier = this.biteFrameRate
            if(this.position >= this.spriteAnimations['bite'].loc.length - 2) {
                this.speedModifier = this.normalFrameRate
                this.canMove = true
                this.biting = false
                this.selectState('idle')
                this.biteTimer()
            } 
        } 
    }//end bite

    biteTimer() {
        var that = this
        setTimeout(function() {
            that.canBite = true
        }, this.biteDelay)
    }//end bitrTimer
   
    //=====================================================================================// 
    //====================================== ROLL =========================================//
    //=====================================================================================//
    roll() {
        if(this.canRoll && !this.isDizzy) {
            if(this.currentRollGuage > 0) {
                this.rolling = true
                this.currentRollGuage -= 2
                this.selectState('roll')
                if(downPressed && this.level === 'upper') this.changeLevel = true
            }
        }
    }//end roll


    rollTimer() {
        var that = this
        this.startedRollTimer = true
        setTimeout(function() {
            that.canRoll = true
            that.currentRollGuage = that.rollGuageLimit/2
            that.startedRollTimer = false
        }, 1000)
    }

    makeDizzy() {
        if(!this.isDizzy) {
            this.isDizzy = true 
            this.canMove= false 
        }
    }

    dizzy() {
        this.selectState('dizzy')
        if(!this.startedDizzyTimer) this.dizzyTimer()
    }

    dizzyTimer() {
        this.startedDizzyTimer = true
        var that = this
        setTimeout(function() {
            that.selectState('idle')
            that.isDizzy = false
            that.canMove = true
            that.startedDizzyTimer = false
        }, 200)
    }
 
    //=====================================================================================// 
    //=============================== MOVEMENT CHECK ======================================//
    //=====================================================================================//
    movementCheck() {
        if(!upPressed && !downPressed && !leftPressed && !rightPressed && !zKeyPressed && !xKeyPressed && !this.isDizzy && !this.isHit) {
            this.selectState('idle')

            this.canMove = true
        }

        log(this.canGetHit)

        if(/idle/.test(this.playerState) && this.jumping && !this.falling ) this.selectState('jump')
        if(/idle/.test(this.playerState) && this.falling ) this.selectState('fall') 

        if(this.jumping && this.y == this.upperLevel) this.selectState('idle')

        if(this.playerState === 'idle') {
            this.rolling = false
            this.jumping = false
            this.falling = false
            //this.biting = false
            this.running = false
            this.inAir = false
        }

        if(this.rolling || this.biting || this.inAir || this.falling || this.startedHitTimer) { this.canGetHit = false }
        else {this.canGetHit = true}

        //log(`cangethit is ${this.canGetHit}`)
  
        //if(this.level == 'upper')

        //change the level if needed (not to sure why it is working the way it is)
        if(this.changeLevel && this.canChangeLevel) {
            switch(this.level) {
                case 'upper' :
                    if(!this.rolling) {
                        this.selectState('fall')
                    }
                    this.falling = true
                    this.inAir = true
                    if(this.y < this.lowerLevel) {
                        this.y += (this.jumpSpeed - 2) * deltaTime
                    } else {
                        this.level = 'lower'
                        this.y = this.lowerLevel
                        this.changeLevel = false
                        this.maxJumpHeight = this.lowerLevel - 200
                        if(!this.rolling) this.makeDizzy()
                        this.falling = false
                        this.inAir = false
                        this.canChangeLevel = false
                        this.changeLevelTimer()
                    }
                    break;
                case 'lower':
                    this.level = 'upper'
                    this.changeLevel = false
                    this.maxJumpHeight = this.upperLevel - 200      
            }//end switch
        } //end if

        this.rolling ? this.speed = this.rollingSpeed : this.speed = this.normalSpeed
        
    }//end movementCheck()

    changeLevelTimer() {
        var that = this
        setTimeout(function() {
            that.canChangeLevel = true
        }, 200)
    }

    //get the state from the spritesheet depending on the direction the dog is moving
    selectState(state) {
        if(this.position > this.spriteAnimations[state].loc.length - 1) this.position = 0
        this.direction === 'right' ? this.playerState = state : this.playerState = `${state}Rev`
    }

    selectNewState(state) {
        this.position = 0
        this.direction === 'right' ? this.playerState = state : this.playerState = `${state}Rev`
    }

    //Traversing frames in the spreadsheet
    update() {
        //See if the player is currently moving
        this.movementCheck()

        //log(this.health)

        if(gameFrame % this.speedModifier == 0) {
            if(this.position >= this.spriteAnimations[this.playerState].loc.length-1) this.position = 0
            this.position++
        }
        if(this.biting) {
            if(this.playerState === 'bite') {
                this.leftHit = this.x + 30
                this.rightHit = this.x + (this.width + 20)
            } else if(this.playerState === 'biteRev') {
                this.leftHit = (this.x - 30)
                this.rightHit = this.x + (this.width - 20)
            }

        }
        else {
            this.leftHit = this.x + 20
            this.rightHit = this.x + (this.width - 20)
        }

        this.topHit = this.y 
        this.bottomHit = this.y + (this.height)
        

        //Moving the Player
        if(upPressed) this.startJump()
        if(downPressed) this.sit()
        if(leftPressed && !rightPressed) this.runLeft()
        if(rightPressed && !leftPressed) this.runRight()
        if(leftPressed && rightPressed) this.selectState('idle')
        if(zKeyPressed) this.startBite()
        if(xKeyPressed) this.roll()

        if(downPressed && leftPressed) {this.direction = 'left' 
                                        this.selectState('sit')}

        if(downPressed && rightPressed) {this.direction = 'right' 
                                         this.selectState('sit')}

        if(downPressed && xKeyPressed) this.selectState('roll')
   
        if(!downPressed && !this.biting && !this.isDizzy && !this.damaged) this.canMove = true;

        if(!xKeyPressed) this.rolling = false

        if(this.currentRollGuage <= 0 && this.startedRollTimer === false) {
            this.currentRollGuage = 0
            this.selectState('idle')
            this.canRoll = false
            this.rollTimer()

       }

       if(this.currentRollGuage < this.rollGuageLimit && !this.rolling && this.canRoll) this.currentRollGuage++

       this.boundaryCheck()
       if(this.jumping) this.jump()
       this.bite()
       if(this.isDizzy) this.dizzy()
       this.hit()
       this.bounce()


       if(!this.jumping && !this.falling && this.y < this.upperLevel)  {this.jumping = true }
       else {this.showRunState = true}

       if(this.lever === 'upper' && !this.jumping && !this.rolling) this.showRunState = true
    }

    draw() {
        this.frameX = this.spriteAnimations[this.playerState].loc[this.position].x
        this.frameY = this.spriteAnimations[this.playerState].loc[this.position].y

        //ctx.fillRect(this.x + 20, this.y, this.width - 20 ,this.height)
        
        ctx.drawImage(this.image, this.frameX, this.frameY, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height)
    }//end draw
}//end player class
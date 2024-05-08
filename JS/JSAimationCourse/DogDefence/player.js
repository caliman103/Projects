function log(value) {
    console.log(value)
}
export default class Player {
    constructor(gameWidth, gameHeight){
        this.gameWidth = gameWidth
        this.gameHeight = gameHeight
        this.image = playerImage
        this.direction = 'right'
        this.columnsInSpritesheet = 12
        this.spriteWidth = 286.5
        this.spriteHeight = 261.5
        this.width = this.spriteWidth * 0.37
        this.height = this.spriteHeight * 0.37
        this.x = ((this.gameWidth * 0.5) - this.width)
        this.y = this.gameHeight - this.height
        this.speedModifier = 5
        this.speed = 0.1
        this.frameX = 0
        this.frameY = 3
        this.currentFrame = 0
        this.playerState = ''
        this.biting = false
        this.biteInterval = 1000
        this.biteTimer = 0
        this.spriteAnimations = []
        this.animationStates = []
        this.#acquireStates()
        this.#selectState('idle')
    }//end constructor

    //Function to handle getting the spates appropriately from the spritesheet
    #acquireStates() {
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

    #selectState(state) {
        if(this.currentFrame > this.spriteAnimations[state].loc.length - 1) this.currentFrame = 0
        this.direction === 'right' ? this.playerState = state : this.playerState = `${state}Rev`
    }

    #currentState(state) {
        const pattern = new RegExp(`^${state}`)
        return pattern.test(this.playerState)
    }

    #boundaryCheck() {
        if(this.x < 0) this.x = 0
        if(this.x > (this.gameWidth - this.width)) this.x = this.gameWidth - this.width
    }

    #onGround() {
        //returns true if the player is on the ground
        return this.y >= this.gameHeight - this.height 
    }

    #moveLeft(keys, deltaTime) {
        this.x -= this.speed * deltaTime
        this.direction = 'left'
        this.#showRunOrNoShow(keys)
    }//end moveLeft

    #moveRight(keys, deltaTime) {
        this.x += this.speed * deltaTime
        this.direction = 'right'
        this.#showRunOrNoShow(keys)
    }

    #showRunOrNoShow(keys){
        if(keys.indexOf('x') === -1 && keys.indexOf('z') === -1 && this.#onGround() && keys.indexOf('ArrowDown') === -1) {
            if(!this.#currentState('run')) {
                this.currentFrame = 0
                this.#selectState('run')
            } 
        } 
    }

    #showsitOrNoShow(keys) {
        if(keys.indexOf('x') === -1 && keys.indexOf('z') === -1 && this.#onGround()) {
            if(!this.#currentState('sit')) {
                this.currentFrame = 0
                this.#selectState('sit')
            }
        }
    }

    #bite(keys) {
        if(this.currentFrame >= this.spriteAnimations['bite'].loc.length - 2) {
            this.biting = false
            this.biteTimer = 0
            this.currentFrame = 0
            this.#selectState('idle')
            keys.forEach((key) =>{
                if(key === 'z') keys.splice(keys.indexOf('z'),1)
            })
        }
    }

    #Timers(deltaTime) {
        //BiteTimer
        if(this.biteTimer < this.biteInterval){
            this.biteTimer += deltaTime
        } else {
            this.biteTimer = this.biteInterval
        }
    }

    update(keys, deltaTime) {
        this.#Timers(deltaTime)
        if(this.biting) this.#bite(keys)
        log(this.biting)

        if(keys.length === 0 || (keys.indexOf('ArrowLeft') !== -1 && keys.indexOf('ArrowRight') !== -1)) {
            if(!this.#currentState('idle')) {
                this.currentFrame = 0
                this.#selectState('idle')
            } 
        } else {
            //Moving to the left
            if(keys.indexOf('ArrowLeft') !== -1 && keys.indexOf('ArrowDown') === -1 && !this.biting) {
                if(keys.indexOf('ArrowRight') === -1) {
                    this.#moveLeft(keys,deltaTime)
                }
                else if(keys.indexOf('ArrowLeft') < keys.indexOf('ArrowRight')) {
                    this.#moveLeft(keys,deltaTime)
                }
            }

            //Moving to the right
            if(keys.indexOf('ArrowRight') !== -1 && keys.indexOf('ArrowDown') === -1 && !this.biting) {
                if(keys.indexOf('ArrowLeft') === -1) {
                    this.#moveRight(keys,deltaTime) 
                }
                else if(keys.indexOf('ArrowRight') < keys.indexOf('ArrowLeft')) {
                    this.#moveRight(keys,deltaTime)
                }
            }

            //Sitting
            if(keys.indexOf('ArrowDown') !== -1) {
                this.#showsitOrNoShow(keys)
            } 
        
            //biting
            if(keys.indexOf('z') !== -1 && keys.indexOf('x') === -1) {
                if(!this.biting && this.biteTimer === this.biteInterval) {
                    this.biting = true 
                    this.currentFrame = 0
                    this.#selectState('bite')
                }
            }
            
            
            this.#boundaryCheck()
        }//end else   
        
        
    }//end update

    draw(ctx, gameFrame) {
        if(gameFrame % this.speedModifier == 0) {
            this.currentFrame++
            if(this.currentFrame > this.spriteAnimations[this.playerState].loc.length-1) this.currentFrame = 0 
        }
        this.frameX = this.spriteAnimations[this.playerState].loc[this.currentFrame].x
        this.frameY = this.spriteAnimations[this.playerState].loc[this.currentFrame].y

        ctx.drawImage(this.image, this.frameX, this.frameY, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height)
    }//end draw
}//end Player
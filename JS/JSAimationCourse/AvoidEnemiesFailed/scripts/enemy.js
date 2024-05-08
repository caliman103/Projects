//This file holds the class and all relavent information about the enemies
class Enemy {
    constructor(level, direction, xPos) {
        this.image = new Image()
        this.image.src = 'images/enemies/carrotSpritesheetAll.png'
        this.columnsInImage = 20 
        this.currentFrame = 0
        this.spriteWidth = 303
        this.spriteHeight = 295
        this.width = this.spriteWidth/3.5
        this.height = this.spriteHeight/3.5
        direction == 0 ? this.direction = 'left' : this.direction = 'right'
        this.frameX = 0
        this.frameY = direction
        level == 0 ? this.level = 'lower' : this.level = 'upper'
        this.x = xPos
        this.level === 'lower' ? this.y = (CANVAS_HEIGHT - (this.height - 8)) : this.y = 380
        this.staggerFrame = 4
        this.health = 1
        this.direction ==='left' ? this.speed = -1 : this.speed = 1
        this.isDead = false
    }//end constructor


    collisionCheck(player) { 
        if(this.x > player.rightHit || this.x + this.width < player.leftHit || this.y < player.topHit || this.y + (this.height - 10) > player.bottomHit) {
            
        } else {
            player.isHit = true
            if(player.inAir && player.falling) {
                this.isDead = true
                if(!player.changeLevel) player.startBounce()
               
            }
            if(player.rolling) {
                this.isDead = true
            }

            if(player.biting) {
                if(this.direction === player.direction) {
                    if(this.direction === 'right' && this.x > player.x) this.isDead = true
                    if(this.direction === 'left' && this.x < player.x) this.isDead = true
                }
                else {
                    this.isDead = true
                }

            }
            if(player.canGetHit) {
                player.takeHit()
            }
        }//end else

    }

    move() {
        this.x += this.speed * deltaTime
    }

    update() {
        this.move()

        if(gameFrame % this.staggerFrame == 0) {
            this.currentFrame++
            if(this.currentFrame > this.columnsInImage -1) this.currentFrame = 0
        }

        if(this.direction === 'right' && this.x > CANVAS_WIDTH) this.x = 0 - this.width
        if(this.direction === 'left' && this.x < (0- this.width)) this.x = CANVAS_WIDTH
        
    }//end update

    draw() {
        this.frameX = this.currentFrame * this.spriteWidth
        //ctx.fillRect(this.x, this.y,  this.width, this.height)
        ctx.drawImage(this.image, this.frameX,  this.frameY * this.spriteHeight, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height)
    }
}//end enemy class
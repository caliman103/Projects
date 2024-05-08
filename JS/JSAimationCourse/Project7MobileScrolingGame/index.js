window.addEventListener("load", function () {
  //Start Typing Log
  function log(value) {
    console.log(value);
  }
  /** @type {HTMLCanvasElement} */
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");

  canvas.width = 800;
  canvas.height = 700;
  lastTime = 0;
  let enemies = [];
  let enemyTimer = 0;
  let enemyInterval = 1000;
  let randomEnemyInterval = Math.random() * 1000 + 500;

  class InputHandler {
    constructor() {
      this.keys = [];
      window.addEventListener("keydown", (e) => {
        if (
          (e.key === "ArrowDown" ||
            e.key === "ArrowUp" ||
            e.key === "ArrowLeft" ||
            e.key === "ArrowRight") &&
          this.keys.indexOf(e.key) === -1
        )
          this.keys.push(e.key);
      }); //end KeyDown event

      window.addEventListener("keyup", (e) => {
        if (
          e.key === "ArrowDown" ||
          e.key === "ArrowUp" ||
          e.key === "ArrowLeft" ||
          e.key === "ArrowRight"
        )
          this.keys.splice(this.keys.indexOf(e.key), 1);
      }); //end KeyUp event
    } //end constructot
  } //end InputHandker

  class Player {
    constructor(gameWidth, gameHeight) {
      this.gameWidth = gameWidth;
      this.gameHeight = gameHeight;
      this.width = 200;
      this.height = 200;
      this.x = 0;
      this.y = this.gameHeight - this.height;
      this.image = playerImage;
      this.frameX = 0;
      this.frameY = 0;
      this.maxFrame = 8;
      this.speed = 1;
      this.vy = 0;
      this.weight = 1;
    } //end constructor

    update(input, deltaTime) {
      if (input.keys.indexOf("ArrowRight") > -1) {
        this.speed = 5;
      } else if (input.keys.indexOf("ArrowLeft") > -1) {
        this.speed = -5;
      } else if (input.keys.indexOf("ArrowUp") > -1 && this.onGround()) {
        this.vy = -32;
      } else {
        this.speed = 0;
      }

      //horrizontal movement
      this.x += this.speed * deltaTime * 0.1;
      if (this.x < 0) this.x = 0;
      else if (this.x > this.gameWidth - this.width)
        this.x = this.gameWidth - this.width;

      //verticl movement
      this.y += this.vy;
      if (!this.onGround()) {
        this.vy += this.weight;
        this.frameY = 1;
      } else {
        this.vy = 0;
        this.frameY = 0;
      }
      if (this.y > this.gameHeight - this.height)
        this.y = this.gameHeight - this.height;
    } //end update

    onGround() {
      //returns true if the player is on the ground
      return this.y >= this.gameHeight - this.height;
    }

    draw(ctx) {
      ctx.drawImage(
        this.image,
        0,
        this.frameY * this.height,
        this.width,
        this.height,
        this.x,
        this.y,
        this.width,
        this.height
      );
    } //end draw
  } //end Player

  class Background {
    constructor(gameWidth, gameHeight) {
      this.gameWidth = gameWidth;
      this.gameHeight = gameHeight;
      this.image = document.getElementById("backgroundImage");
      this.x = 0;
      this.y = 0;
      this.width = 2400;
      this.height = 700;
      this.speed = 7;
    }

    draw(ctx) {
      ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
      ctx.drawImage(
        this.image,
        this.x + this.width,
        this.y,
        this.width,
        this.height
      );
    }

    update() {
      this.x -= this.speed;
      if (this.x < 0 - this.width) this.x = 0;
    }
  } //end Background

  class Enemy {
    constructor(gameWidth, gameHeight) {
      this.gameWidth = gameWidth;
      this.gameHeight = gameHeight;
      this.width = 160;
      this.height = 119;
      this.image = document.getElementById("enemyImage");
      this.x = this.gameWidth;
      this.y = this.gameHeight - this.height;
      this.frameX = 0;
      this.maxFrame = 5;
      this.fps = 20;
      this.frameTimer = 0;
      this.frameInterval = 1000 / this.fps;
      this.speed = 5;
    } //end constructor

    draw(ctx) {
      ctx.drawImage(
        this.image,
        this.frameX * this.width,
        0,
        this.width,
        this.height,
        this.x,
        this.y,
        this.width,
        this.height
      );
    }

    update(deltaTime) {
      if (this.frameTimer > this.frameInterval) {
        if (this.frameX >= this.maxFrame) {
          this.frameX = 0;
        } else {
          this.frameX++;
        }
        this.frameTimer = 0;
      } else {
        this.frameTimer += deltaTime;
      }
      this.x -= this.speed;
    }
  } //end Enemy

  function handleEnemies(deltaTime) {
    if (enemyTimer > enemyInterval + randomEnemyInterval) {
      enemies.push(new Enemy(canvas.width, canvas.height));
      enemyTimer = 0;
      randomEnemyInterval = Math.random() * 1000 + 500;
    } else {
      enemyTimer += deltaTime;
    }

    enemies.forEach((enemy) => {
      enemy.draw(ctx);
      enemy.update(deltaTime);
    });
  }

  function displayStatusText() {}

  const input = new InputHandler();
  const player = new Player(canvas.width, canvas.height);
  const background = new Background(canvas.width, canvas.height);

  function play(timeStamp) {
    //Clear canvas each loop
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    background.draw(ctx);
    //background.update()

    //Calculate deltaTime
    const deltaTime = timeStamp - lastTime;
    lastTime = timeStamp;

    player.update(input, deltaTime);
    player.draw(ctx);

    //handleEnemies(deltaTime)

    requestAnimationFrame(play);
  } //end play

  play(0);
}); //end load event listener

//Shortcut for console.log()
function log(value) {
  console.log(value);
}

let canvas;
let ctx;
let game;
let border;

window.addEventListener("load", function () {
  /** @type {HTMLCanvasElement} */
  canvas = document.getElementById("canvas");
  ctx = canvas.getContext("2d");
  border = 80;

  canvas.width = window.innerWidth - border;
  canvas.height = window.innerHeight - border;
  let lastTime = 0;

  class Game {
    constructor(ctx, width, height) {
      this.ctx = ctx;
      this.width = width;
      this.height = height;
    } //end constructor

    update(deltaTime) {} //end update

    draw() {} //end draw

    resize() {
      canvas.width = window.innerWidth - border;
      canvas.height = window.innerHeight - border;
      this.width = canvas.width;
      this.height = canvas.height;
    }
  } //end Game class

  game = new Game(ctx, canvas.width, canvas.height);
  addEventListener("resize", game.resize);

  function play(timeStamp) {
    //Clear canvas each loop
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    //Calculate deltaTime
    const deltaTime = timeStamp - lastTime;
    lastTime = timeStamp;

    //game.update(deltaTime);
    //game.draw();

    requestAnimationFrame(play);
  } //end play

  play(0);
}); //end load event listener

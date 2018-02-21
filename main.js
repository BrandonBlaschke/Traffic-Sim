var AM = new AssetManager();
let globalGE;

function Animation(spriteSheet, frameWidth, frameHeight, sheetWidth, frameDuration, frames, loop, scale) {
  this.spriteSheet = spriteSheet;
  this.frameWidth = frameWidth;
  this.frameDuration = frameDuration;
  this.frameHeight = frameHeight;
  this.sheetWidth = sheetWidth;
  this.frames = frames;
  this.totalTime = frameDuration * frames;
  this.elapsedTime = 0;
  this.loop = loop;
  this.scale = scale;
}

Animation.prototype.drawFrame = function(tick, ctx, x, y) {
  this.elapsedTime += tick;
  if (this.isDone()) {
    if (this.loop) this.elapsedTime = 0;
  }
  var frame = this.currentFrame();
  var xindex = 0;
  var yindex = 0;
  xindex = frame % this.sheetWidth;
  yindex = Math.floor(frame / this.sheetWidth);

  ctx.drawImage(this.spriteSheet,
    xindex * this.frameWidth, yindex * this.frameHeight, // source from sheet
    this.frameWidth, this.frameHeight,
    x, y,
    this.frameWidth * this.scale,
    this.frameHeight * this.scale);
}

Animation.prototype.currentFrame = function() {
  return Math.floor(this.elapsedTime / this.frameDuration);
}

Animation.prototype.isDone = function() {
  return (this.elapsedTime >= this.totalTime);
}

// no inheritance
function Background(game, spritesheet) {
  this.x = 0;
  this.y = 0;
  this.spritesheet = spritesheet;
  this.game = game;
  this.ctx = game.ctx;
};

Background.prototype.draw = function() {
  this.ctx.drawImage(this.spritesheet,
    this.x, this.y);
};

Background.prototype.update = function() {};

AM.queueDownload();


AM.downloadAll(function() {

  var canvas = document.getElementById("gameWorld");
  var ctx = canvas.getContext("2d");

  var gameEngine = new GameEngine();

  //Global gameEngine object
  globalGE = gameEngine;

  //Create Sim
  //let directionEnum = {RIGHT: 0, LEFT: 1, UP: 2, DOWN: 3};

  let roadVer = new VerRoad(gameEngine, 380, 0, 800);
  let roadHor = new HorRoad(gameEngine, 0, 500, 800);
  let roadHor2 = new HorRoad(gameEngine,0, 200, 800);

  let fourWay = new FourWay(gameEngine, 380, 500);
  let fourWay2 = new FourWay(gameEngine, 380, 200);

  //This will change the lights
  window.setInterval(changeLights, 2000);

  //Add Entites to game engine
  gameEngine.addEntity(roadHor);
  gameEngine.addEntity(roadHor2);
  gameEngine.addEntity(roadVer);
  gameEngine.addEntity(fourWay);
  gameEngine.addEntity(fourWay2);

  //Add random cars to Sim
  for (let i = 0; i < 25; i++) {

    //Get a random direction
    let direction = Math.floor((Math.random() * 4));
    // let direction = 0;
    let roadDir;
    let car;

    //Set Direction
    if (direction > 1) {
      roadDir = false;
      car = new Car(gameEngine, roadDir, direction);
      roadVer.addCar(car);
    } else {
      roadDir = true;
      car = new Car(gameEngine, roadDir, direction);

      let randomRoad = Math.floor((Math.random() * 2));

      //Add to random horzontal road
      if (randomRoad == 0) {
        roadHor.addCar(car);
      } else {
        roadHor2.addCar(car);
      }
    }

    //add car
    gameEngine.addEntity(car);
  }

  //Start Game engine
  gameEngine.init(ctx);
  gameEngine.start();

});

/** Changes the Fourway stop lights */
function changeLights() {
  for (let i = 0; i < globalGE.entities.length; i++) {

    if (globalGE.entities[i] instanceof FourWay) {
      globalGE.entities[i].toggleLight();
    }
  }

  console.log("Cars that made it Left " + globalGE.carsMadeIt);
}

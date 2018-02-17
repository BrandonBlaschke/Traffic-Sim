var AM = new AssetManager();

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

  //Create Sim
  //Roads
  let roadHorVer = new VerRoad(gameEngine, 380, 0, 800);
  let roadHor = new HorRoad(gameEngine, 0, 300, 800);

  //Cars
  let car = new Car(gameEngine, true, 0);
  let car2 = new Car(gameEngine, true, 1);
  let car3 = new Car(gameEngine, false, 2);
  let car4 = new Car(gameEngine, false, 3);
  let car5 = new Car(gameEngine, false, 3);
  let car6 = new Car(gameEngine, true, 0);
  let car7 = new Car(gameEngine, true, 1);


  //Add cars to roadHor
  roadHor.addCar(car);
  roadHor.addCar(car2);
  roadHor.addCar(car6);
  roadHor.addCar(car7);
  roadHorVer.addCar(car5);
  roadHorVer.addCar(car3);
  roadHorVer.addCar(car4);

  //Add Entites to game engine
  gameEngine.addEntity(roadHor);
  gameEngine.addEntity(roadHorVer);
  gameEngine.addEntity(car);
  gameEngine.addEntity(car2);
  gameEngine.addEntity(car3);
  gameEngine.addEntity(car4);
  gameEngine.addEntity(car5);
  gameEngine.addEntity(car6);
  gameEngine.addEntity(car7);

  //Start Game engine
  gameEngine.init(ctx);
  gameEngine.start();

  //gameEngine.addEntity(new Background(gameEngine, AM.getAsset("./img/background.jpg")));

  console.log("All Done!");
});

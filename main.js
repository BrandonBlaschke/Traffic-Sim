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
  let roadVer = new VerRoad(gameEngine, 100, 400, 400);
  let road = new HorRoad(gameEngine, 0, 10, 800);
  let car = new Car(gameEngine, true, 0);
  let car2 = new Car(gameEngine, true, 1);
  let car3 = new Car(gameEngine, false, 2);
  let car4 = new Car(gameEngine, false, 3);
  road.addCar(car);
  road.addCar(car2);
  roadVer.addCar(car3);
  roadVer.addCar(car4);

  //Add Entites to game engine
  gameEngine.addEntity(road);
  gameEngine.addEntity(roadVer);
  gameEngine.addEntity(car);
  gameEngine.addEntity(car2);
  gameEngine.addEntity(car3);
  gameEngine.addEntity(car4);

  //Start Game engine
  gameEngine.init(ctx);
  gameEngine.start();

  //gameEngine.addEntity(new Background(gameEngine, AM.getAsset("./img/background.jpg")));

  console.log("All Done!");
});

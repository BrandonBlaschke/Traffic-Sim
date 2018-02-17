class Road {

  constructor(game, x, y, distance) {
    this.x = x;
    this.y = y;
    this.game = game;
    this.cars = [];
    this.roadWidth = 100;
    this.lineSpace = 55;
    this.lineWidth = 20;
    this.lineThickness = 8;
    this.distance = distance;
    this.roadColor = '#6D6D6D';
    this.lineColor = 'yellow';
  }

  update() {}

  draw(ctx) {

    ctx.fillStyle = '#6D6D6D';
    ctx.fillRect(this.x, this.y, this.roadWidth, this.distance);
  }


  addCar(theCar) {
    this.cars.push(theCar.x);
  }
}

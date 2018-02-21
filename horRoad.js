class HorRoad extends Road {


  constructor(game, x, y, distance) {
    super(game, x, y, distance);
    this.middleRoad = this.roadWidth / 2 + this.y - (this.lineThickness / 2);

    //Initial Spacing for cars on the road
    this.carSpacing = 100;
  }

  update() {


  }

  draw(ctx) {

    //Draw Road
    ctx.fillStyle = this.roadColor;
    ctx.fillRect(this.x, this.y, this.distance, this.roadWidth);

    // //Draw lines on raod
    ctx.fillStyle = "white";
    for (let i = 0; i < this.distance; i += this.lineSpace) {
      ctx.fillRect((this.x + 1) * i, this.middleRoad, this.lineWidth, this.lineThickness);
    }

  }

  addCar(theCar) {

    //Put car on the correct aligment with the road
    if (theCar.direction === 0) {
      theCar.y = this.middleRoad - theCar.width * 1.5;
    } else {
      theCar.y = this.middleRoad + theCar.width;
    }

    theCar.x += this.cars.length * this.carSpacing;

    this.cars.push(theCar);
  }

}

class VerRoad extends Road {

  constructor(game, x, y, distance) {
    super(game, x, y, distance);
    this.middleRoad = this.roadWidth / 2 + this.x - (this.lineThickness / 2);
    this.carSpacing = 200;
  }

  update() {

  }

  draw(ctx) {

    //Draw Road
    ctx.fillStyle = this.roadColor;
    ctx.fillRect(this.x, this.y, this.roadWidth, this.distance);

    //Draw lines on raod
    ctx.fillStyle = "white";
    for (let i = 0; i < this.distance; i += this.lineSpace) {
      ctx.fillRect(this.middleRoad, -(this.y + 1) * i + this.distance, this.lineThickness, this.lineWidth);
    }

  }

    addCar(theCar) {

      if (theCar.direction === 2) {
        theCar.x = this.middleRoad + theCar.width;
      } else {
        theCar.x = this.middleRoad - theCar.width * 1.5;
      }

      theCar.y += this.carSpacing * this.cars.length;
      this.cars.push(theCar);
    }

}

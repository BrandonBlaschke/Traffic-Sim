class VerRoad extends Road {

  constructor(game, x, y, distance) {
    super(game, x, y, distance);
    this.middleRoad = this.roadWidth / 2 + this.x - (this.lineThickness / 2);
  }

  update() {

    //Update Cars
    for (let i = 0; i < this.cars.length; i++) {
      if (this.cars[i].direction === 2) {
        this.cars[i].x = this.middleRoad + this.cars[i].width;
      } else {
        this.cars[i].x = this.middleRoad - this.cars[i].width * 1.5;
      }
    }

  }

  draw(ctx) {

    //Draw Road
    ctx.fillStyle = this.roadColor;
    ctx.fillRect(this.x, this.y, this.roadWidth, this.distance);

    //Draw lines on raod
    // ctx.fillStyle = "white";
    // for (let i = 0; i < this.distance; i += this.lineSpace) {
    //   ctx.fillRect(this.middleRoad, -(this.y + 1) * i + this.distance, this.lineThickness, this.lineWidth);
    // }

  }

}

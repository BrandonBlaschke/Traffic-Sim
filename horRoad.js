class HorRoad extends Road {

  constructor(game, x, y, distance) {
    super(game, x, y, distance);
    this.middleRoad = this.roadWidth / 2 + this.y - (this.lineThickness / 2);
  }

  update() {

    //Update Cars
    for (let i = 0; i < this.cars.length; i++) {
      if (this.cars[i].direction === 0) {
        this.cars[i].y = this.middleRoad - this.cars[i].width * 1.5;
      } else {
        this.cars[i].y = this.middleRoad + this.cars[i].width;
      }
    }
  }

  draw(ctx) {

    //Draw Road
    ctx.fillStyle = this.roadColor;
    ctx.fillRect(this.x, this.y, this.distance, this.roadWidth);

    // //Draw lines on raod
    // ctx.fillStyle = "white";
    // for (let i = 0; i < this.distance; i += this.lineSpace) {
    //   ctx.fillRect((this.x + 1) * i, this.middleRoad, this.lineWidth, this.lineThickness);
    // }

  }

}

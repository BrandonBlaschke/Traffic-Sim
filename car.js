class Car {

  constructor(game, isHor, direction) {
    this.x = 0;
    this.y = 0;
    this.game = game;
    this.width = 20;
    this.height = 30;
    this.color = '#E00000';
    this.lineColor = 'yellow';
    this.isHor = isHor;
    //0 = Right
    //1 = Left
    //2 = Up
    //3 = Down
    this.direction = direction;
    this.speed = 4;
  }

  update() {

    //Move to the left and right
    if (this.isHor && this.direction === 0) {

      if (this.x > 800) {
        this.x = -this.width * 5;
      }
      this.x += this.speed;
    //Move to right and left
    } else if (this.isHor && this.direction === 1){
      if (this.x <= 0) {
        this.x = 800 + this.width * 5;
      }
      this.x -= this.speed;
    } else if (this.direction === 2) {
      if (this.y < 0) {
        this.y = 800 + this.width * 5;
      }
      this.y -= this.speed;
    } else {
      if (this.y > 800) {
        this.y = 0 -this.width * 5;
      }
      this.y += this.speed;
    }

  }

  draw(ctx) {

    ctx.fillStyle = this.color;

    if (this.isHor) {
      ctx.fillRect(this.x, this.y, this.height, this.width);
    } else {
      ctx.fillRect(this.x, this.y, this.width, this.height);
    }
  }
}

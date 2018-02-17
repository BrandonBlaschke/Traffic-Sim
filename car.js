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
    this.hitBoxWidth = 10;
    this.hitBoxHeight = 30;
    this.hitBoxFront = {
      x: 0,
      y: 0,
      width: 30,
      height: 30
    };
    this.hitBoxBack = {
      x: 0,
      y: 0,
      width: 30,
      height: 30
    };
    this.stopped;
    this.speed = 5;
  }

  update() {

    this.stopped = false;

    //Check If car is too close to other cars
    for (let i = 0; i < this.game.entities.length; i++) {
      if (this.game.entities[i] instanceof Car) {

        if (this.game.entities[i] != this) {
          if (this.carToClose(this.game.entities[i])) {
            this.stopped = true;
          }
        }

      }
    }

    //Move to the left and right
    if (this.isHor && this.direction === 0 && !this.stopped) {

      if (this.x > 800) {
        this.x = -this.width * 5;
      }
      this.x += this.speed;
      //Move to right and left
    } else if (this.isHor && this.direction === 1 && !this.stopped) {
      if (this.x <= 0) {
        this.x = 800 + this.width * 5;
      }
      this.x -= this.speed;
      //Move Up
    } else if (this.direction === 2 && !this.stopped) {
      if (this.y < 0) {
        this.y = 800 + this.width * 5;
      }
      this.y -= this.speed;
      //Move Down
    } else if (!this.stopped) {
      if (this.y > 800) {
        this.y = 0 - this.width * 5;
      }
      this.y += this.speed;
    }


    //Hit box in right orientation
    if (this.isHor) {

      //Make sure the hit boxes are in the right position
      if (this.direction === 1) {
        this.hitBoxFront = {
          x: this.x - this.width,
          y: this.y,
          width: this.height,
          height: this.width
        };
        this.hitBoxBack = {
          x: this.x + this.width,
          y: this.y,
          width: this.height,
          height: this.width
        };
      } else {
        this.hitBoxFront = {
          x: this.x + this.width,
          y: this.y,
          width: this.height,
          height: this.width
        };
        this.hitBoxBack = {
          x: this.x - this.width,
          y: this.y,
          width: this.height,
          height: this.width
        };
      }
    } else {

      //Make sure hit boxes are in the right position
      if (this.direction === 2) {
        this.hitBoxFront = {
          x: this.x,
          y: this.y - this.width,
          width: this.width,
          height: this.height
        };
        this.hitBoxBack = {
          x: this.x,
          y: this.y + this.width,
          width: this.width,
          height: this.height
        };
      } else {
        this.hitBoxFront = {
          x: this.x,
          y: this.y + this.width,
          width: this.width,
          height: this.height
        };
        this.hitBoxBack = {
          x: this.x,
          y: this.y - this.width,
          width: this.width,
          height: this.height
        };
      }
    }

  }

  draw(ctx) {

    //Draw hitBoxFront for front
    ctx.fillStyle = "black";
    ctx.fillRect(this.hitBoxFront.x, this.hitBoxFront.y, this.hitBoxFront.width, this.hitBoxFront.height);
    
    ctx.fillStyle = "blue";
    ctx.fillRect(this.hitBoxBack.x, this.hitBoxBack.y, this.hitBoxBack.width, this.hitBoxBack.height);

    //Draw car
    ctx.fillStyle = this.color;

    if (this.isHor) {
      ctx.fillRect(this.x, this.y, this.height, this.width);
    } else {
      ctx.fillRect(this.x, this.y, this.width, this.height);
    }
  }

  slowDown() {

  }

  /** Checks this car is hitting another car from the back
   * @param {Car} car A car to check
   * @return {boolean} If they are too close or not. */
  carToClose(car) {

    //Check this car is hitting the other car from the back
    if (this.intersects(this.hitBoxFront, car.hitBoxBack)) {
      return true;
    }

    //Check collision at a 4 way intersection
    else if (this.intersects(this.hitBoxFront, car.hitBoxFront)) {
      return true;
    }

    return false;
  };


  /** Checks if two boxes intersect or not.
   * @param {Box} rect1 Hit box 1
   * @param {Box} rect2 Hit box 2
   * @return {boolean} If the two boxes are intersecting
   */
  intersects(rect1, rect2) {
    return rect1.x < rect2.x + rect2.width && rect1.x + rect1.width > rect2.x &&
      rect1.y < rect2.y + rect2.height && rect1.height + rect1.y > rect2.y;
  };
}

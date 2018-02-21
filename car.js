let directionEnum = {RIGHT: 0, LEFT: 1, UP: 2, DOWN: 3};
let drawHitBoxes = false;

class Car {

  constructor(game, isHor, direction) {
    this.x = 0;
    this.y = 0;
    this.velocity = {x: 0, y: 0};
    this.acceleration = {x: 0, y: 0};
    this.game = game;
    this.width = 20;
    this.height = 30;
    this.color = '#E00000';
    this.isHor = isHor;
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

    //Check If car is too close to other cars or at stop light
    for (let i = 0; i < this.game.entities.length; i++) {
      if (this.game.entities[i] instanceof Car) {

        if (this.game.entities[i] != this) {
          if (this.carToClose(this.game.entities[i])) {
            this.stopped = true;

            //Reset speed values
            this.resetSpeed();
          }
      }
    }

    //Check Traffic lights
    if (this.game.entities[i] instanceof FourWay) {

      if (this.direction === directionEnum.UP) {
        if (this.intersects(this.hitBoxFront, this.game.entities[i].bottomBox) && this.game.entities[i].verColor == colorsEnum.RED) {
          this.stopped = true;
          this.resetSpeed();
        }
      }

      if (this.direction === directionEnum.DOWN) {
        if (this.intersects(this.hitBoxFront, this.game.entities[i].topBox) && this.game.entities[i].verColor == colorsEnum.RED) {
          this.resetSpeed();
          this.stopped = true;
        }
      }

      if (this.direction === directionEnum.LEFT) {
        if (this.intersects(this.hitBoxFront, this.game.entities[i].rightBox) && this.game.entities[i].horColor == colorsEnum.RED) {
          this.resetSpeed();
          this.stopped = true;
        }
      }

      if (this.direction === directionEnum.RIGHT) {
        if (this.intersects(this.hitBoxFront, this.game.entities[i].leftBox) && this.game.entities[i].horColor == colorsEnum.RED) {
          this.resetSpeed();
          this.stopped = true;
        }
      }
    }
  }

    //Move from left to right
    if (this.isHor && this.direction === 0 && !this.stopped) {
      this.goRight();
      //Move from right to left
    } else if (this.isHor && this.direction === 1 && !this.stopped) {
      this.goLeft();
      //Move Up
    } else if (this.direction === 2 && !this.stopped) {
      this.goUp();
      //Move Down
    } else if (!this.stopped) {
      this.goDown();
    }

    //Hit box in right orientation
    if (this.isHor) {

      //Make sure the hit boxes are in the right position
      if (this.direction === directionEnum.LEFT) {
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
      if (this.direction === directionEnum.UP) {
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

  resetSpeed() {
    //Reset speed values
    this.velocity.x = 0;
    this.velocity.y = 0;
    this.acceleration.x = 0;
    this.acceleration.y = 0;
  }

  /** Moves the car to the right */
  goRight() {
    if (this.x > 800) {
      this.x = -this.width * 5;
    }
    //
    // if (this.acceleration.x < .3 && this.velocity.x < 3) {
    //   this.acceleration.x = (parseFloat(this.acceleration.x) + parseFloat(.008)).toFixed(2);
    //   this.velocity.x = (parseFloat(this.velocity.x) + parseFloat(this.acceleration.x)).toFixed(2);
    // }
    // this.x = (parseFloat(this.velocity.x) + parseFloat(this.x)).toFixed(1);

    this.x += this.speed;
  }

  /** Moves the car to the left */
  goLeft() {
    if (this.x <= 0) {
      this.x = 800 + this.width * 5;
    }
    this.x -= this.speed;
  }

  /** Moves the car up */
  goUp() {
    if (this.y < 0) {
      this.y = 800 + this.width * 5;
    }
    this.y -= this.speed;
  }

  /** Moves the car down */
  goDown() {
    if (this.y > 800) {
      this.y = 0 - this.width * 5;
    }
    this.y += this.speed;
  }

  addFloats(num1, num2) {
    return (parseFloat(num1) + parseFloat(num2)).toFixed(2);
  }

  subFloats(num1, num2) {
    return (parseFloat(num1) - parseFloat(num2)).toFixed(2);
  }

  draw(ctx) {

    //Draw hitBoxFront for front
    if (drawHitBoxes) {
      ctx.fillStyle = "black";
      ctx.fillRect(this.hitBoxFront.x, this.hitBoxFront.y, this.hitBoxFront.width, this.hitBoxFront.height);

      ctx.fillStyle = "blue";
      ctx.fillRect(this.hitBoxBack.x, this.hitBoxBack.y, this.hitBoxBack.width, this.hitBoxBack.height);

    }

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


    // return rect1.x < this.addFloats(rect2.x, rect2.width) && this.addFloats(rect1.x, rect1.width) > rect2.x &&
    //   rect1.y < this.addFloats(rect2.y, rect2.height) && this.addFloats(rect1.height, rect1.y) > rect2.y;
  };
}

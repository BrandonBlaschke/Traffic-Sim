let colorsEnum = {RED:0, GREEN: 1, YELLOW: 2};

class FourWay extends Road {

  constructor(game, x, y) {
    super(game, x, y, 0);
    this.size = {width:100, height:100};
    this.horColor = colorsEnum.RED;
    this.verColor = colorsEnum.GREEN;

    //Lights for four way
    this.leftBox = {x: x, y: y, width: 10, height: 100, color: this.horColor};
    this.rightBox = {x: x + 90, y: y, width: 10, height: 100, color: this.horColor};
    this.topBox = {x: x, y: y, width: 100, height: 10, color: this.horColor};
    this.bottomBox = {x: x, y: y + 90, width: 100, height: 10, color: this.horColor};
    this.changeLight = false;
    //window.setInterval(this.toggleLight, 2000);
  }

  update() {

    //Change the color of the four way stop
    if (this.changeLight) {

      if (this.horColor == colorsEnum.RED) {
        this.horColor = colorsEnum.GREEN;
      } else {
        this.horColor = colorsEnum.RED;
      }

      if(this.verColor == colorsEnum.RED) {
        this.verColor = colorsEnum.GREEN;
      } else {
        this.verColor = colorsEnum.RED;
      }

      this.changeLight = false;
    }
  }

  toggleLight() {
    this.changeLight = true;
    //console.log("SWITCH");
  }

  draw(ctx) {

    ctx.fillStyle = '#6D6D6D';
    ctx.fillRect(this.x, this.y, this.size.width, this.size.height);

    //Hor lights
    if (this.horColor === colorsEnum.RED) {
      ctx.fillStyle = "Red";
    } else {
      ctx.fillStyle = "Green";
    }
    ctx.fillRect(this.leftBox.x, this.leftBox.y, this.leftBox.width, this.leftBox.height);
    ctx.fillRect(this.rightBox.x, this.rightBox.y, this.rightBox.width, this.rightBox.height);

    //Ver Lights
    if (this.verColor === 0) {
      ctx.fillStyle = "Red";
    } else {
      ctx.fillStyle = "Green";
    }
    ctx.fillRect(this.topBox.x, this.topBox.y , this.topBox.width, this.topBox.height);
    ctx.fillRect(this.bottomBox.x, this.bottomBox.y , this.bottomBox.width, this.bottomBox.height);
  }


}

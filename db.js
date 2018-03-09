
let socket = io.connect("24.16.255.56:8888");

window.onload = function () {


  socket.on("connect", function() {
    console.log("Socket connected");
  });

  socket.on("load", function(data) {


    globalGE.removeAll();

    let theData = data.data;

    let json = JSON.parse(data.data);

    for (i in json) {

      let tempCar = new Car(globalGE, json[i].isHor, json[i].dir);
      tempCar.x = json[i].x;
      tempCar.y = json[i].y;
      tempCar.color = json[i].color;

      globalGE.addEntity(tempCar);
    }
  });
}

//Save the game
function save() {

  //Get all the cars from the sim at this time
  let cars = globalGE.getCars();
  socket.emit("save", {
    studentname: "Brandon Blaschke",
    statename: "sim",
    data: JSON.stringify(cars)
  });

  console.log("SAVED");
}

function load() {

  socket.emit("load", {
    studentname: "Brandon Blaschke",
    statename: "sim"
  });

  console.log("LOADING");
}

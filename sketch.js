var canvas;
var database;
var backgroundImage
var form, game, player
var mygameState, myplayerCount
var car1,car2, car1Img,car2Img,trackImg
var cars = []
var allPlayers
var fuelImage,coinImage
var fuelgroups, coinsgroups

function preload() {
  backgroundImage = loadImage("./assets/background.png")
  car1Img = loadImage("./assets/car1.png")
  car2Img = loadImage("./assets/car2.png")
  trackImg = loadImage("./assets/track.jpeg")
  fuelImage = loadImage("./assets/fuel.png")
  coinImage = loadImage("./assets/goldCoin.png")
}

function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
  //its used to initialize 
  database = firebase.database();

  game = new Game()
  game.start()
  game.getState()
}

function draw() {
  background(backgroundImage);

  if (mygameState === 1) {
    game.play()
  }

  if (myplayerCount === 2) {
    game.updateState(1)
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

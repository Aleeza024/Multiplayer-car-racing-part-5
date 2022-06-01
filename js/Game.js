class Game {
  constructor() { }


  getState() {
    var stateRoot = database.ref("GameState")
    stateRoot.on("value", function (data) {
      mygameState = data.val()
    })
  }
  updateState(state) {
    database.ref("/").update({
      GameState: state
    })

  }

  // GameState= 0
  start() {
    form = new Form()
    form.display()
    player = new Player()
    myplayerCount = player.getCount()

    car1 = createSprite(width / 2 - 100, height / 2 + 250)
    car1.addImage("car1", car1Img)
    car1.scale = 0.07

    car2 = createSprite(width / 2 + 100, height / 2 + 250)
    car2.addImage("car2", car2Img)
    car2.scale = 0.07

    cars = [car1, car2]

    fuelgroups = new Group()
    coinsgroups = new Group()


    // fuels
    this.addSprites(fuelgroups, 40, fuelImage, 0.02)
    // coins
    this.addSprites(coinsgroups, 40, coinImage, 0.05)
  }

  addSprites(spriteGroup, numberSprites, spriteImage, spritescale) {
    for (var i = 0; i < numberSprites; i += 1) {
      var x, y
      x = random(width / 2 + 150, width / 2 - 150)
      y = random(height * 5, height - 400)

      var sprite = createSprite(x, y)
      sprite.addImage(spriteImage)
      sprite.scale = spritescale

      spriteGroup.add(sprite)

    }

  }
  // GameState= 1
  play() {
    form.myhide()
    form.titleImage.position(40, 50)
    form.titleImage.class("ToEnterPlay")
    Player.GetPlayerInfo()

    if (allPlayers !== undefined) {
      image(trackImg, 0, -height * 5, width, height * 6)
      // for loop to get individual player index, i is individual value in allPlayers
      var index = 0
      for (var i in allPlayers) {
        console.log(i)

        //increasing index
        index = index + 1

        var x = allPlayers[i].positionX
        var y = height - allPlayers[i].positionY

        // index 1 = index-1 = 1-1 = 0 = car1
        cars[index - 1].position.x = x
        cars[index - 1].position.y = y

        //adding camera to move player

        if (index === player.index) {
          stroke("blue")
          strokeWeight(3)
          fill("black")
          ellipse(x, y, 70, 70)
  
          camera.position.x = cars[index - 1].positionX
          camera.position.y = cars[index - 1].positionY


          this.handleCoins(index)
          this.handleFuels(index)
        }
       

      }
      this.handlePlayerControls()
      drawSprites()
    }

  }
  handlePlayerControls() {
    if (keyIsDown(UP_ARROW)) {
      player.positionY += 10
      player.updatePlayerInfo()
    }
    if (keyIsDown(LEFT_ARROW)) {
      player.positionX -= 10
      player.updatePlayerInfo()
    }
    if (keyIsDown(RIGHT_ARROW)) {
      player.positionX += 10
      player.updatePlayerInfo()
    }

  }

  handleFuels(index) {
    // overlap funtion
    cars[index - 1].overlap(fuelgroups, function (collector, collected) {
      player.fuel += 1
      player.updatePlayerInfo()
      collected.remove()
    })
  }

  handleCoins(index) {
    cars[index - 1].overlap(coinsgroups, function (collector, collected) {
      player.score += 1
      player.updatePlayerInfo()
      collected.remove()
    })
  }
  // GameState= 2
  end() {

  }

}

class Player {
  constructor() {
    this.name = null
    this.index = null
    this.positionX = 0
    this.positionY = 0
    this.fuel = 0
    this.score = 0
  }

  getCount() {
    var countRoot = database.ref("PlayerCount")
    countRoot.on("value", (data) => {
      myplayerCount = data.val()
    })
  }
  updateCount(Count) {
    database.ref("/").update({
      PlayerCount: Count
    })
  }
  addPlayers() {
    var PlayerIndex = "players/player" + this.index
    //this.index === 1 means player1 and this.index === 2 means player2
    if (this.index === 1) {
      this.positionX = width / 2 - 100
    }
    else {
      this.positionX = width / 2 + 100
    }
    database.ref(PlayerIndex).set({
      name: this.name,
      index: this.index,
      positionX: this.positionX,
      positionY: this.positionY,
      fuel: this.fuel,
      score: this.score

    })
  }

  getPlayerDistancer() {
    var PlayerDistance = database.ref("players/player" + this.index)
    PlayerDistance.on("value", (data) => {
      var distance = data.val()
      this.positionX = distance.positionX,
        this.positionY = distance.positionY

    })
  }
  updatePlayerInfo() {
    var PlayerIndex = "players/player" + this.index
    database.ref(PlayerIndex).update({
      positionX: this.positionX,
      positionY: this.positionY,
      fuel: this.fuel,
      score: this.score
    })
  }
  static GetPlayerInfo() {
    var playerInfo = database.ref("players") 
    playerInfo.on("value", (data) => {
      allPlayers = data.val()

    })
  }
}

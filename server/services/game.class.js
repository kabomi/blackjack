const guid = require('uuid');
class Game {
  static create() {
    return new Game(guid.v4());
  }
  get state() {
    return {
      id: this.id,
      dealer: this.dealer,
    };
  }
  constructor(id) {
    this.id = id;
    this.dealer = this.generateHand();
  }

  generateHand() {
    return {
      cards: [1, 2],
      points: 3,
    };
  }
}

module.exports = Game;

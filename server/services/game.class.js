const guid = require('uuid');
class Game {
  static create() {
    return new Game(guid.v4());
  }
  get state() {
    return {
      id: this.id,
    };
  }
  constructor(id) {
    this.id = id;
  }
}

module.exports = Game;

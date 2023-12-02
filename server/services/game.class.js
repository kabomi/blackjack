class Game {
  get state() {
    return {
      id: this.id,
    };
  }
  constructor() {
    this.id = 'someId';
  }
}

module.exports = Game;

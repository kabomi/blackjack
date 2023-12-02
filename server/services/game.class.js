const guid = require('uuid');
const Deck = require('./card-deck.class');

class Game {
  static create() {
    return new Game(guid.v4());
  }
  static createCardDeck() {
    return new Deck();
  }
  get state() {
    return {
      id: this.id,
      dealer: this.dealer,
      players: this.players,
    };
  }
  constructor(id) {
    this.id = id;
    this._deck = Game.createCardDeck();
    this._deck.shuffle();
    this.dealer = this.generateHand();
    this.players = [this.generateHand()];
  }

  generateHand() {
    return {
      cards: [this._deck.draw(), this._deck.draw()],
      points: 3,
    };
  }
}

module.exports = Game;

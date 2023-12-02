const guid = require('uuid');
const shuffle = require('../common/shuffle');

class Deck {
  get cards() {
    return this._cards;
  }

  constructor() {
    this._cards = Array.from(Array(52).keys());
  }

  draw() {
    return this._cards.pop();
  }

  shuffle() {
    shuffle(this._cards);
  }
}
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
    this.dealer = this.generateHand();
    this.players = [this.generateHand()];
  }

  generateHand() {
    return {
      cards: [1, 2],
      points: 3,
    };
  }
}

module.exports = Game;

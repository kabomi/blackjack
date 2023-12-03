const guid = require('uuid');
const Deck = require('./card-deck.class');
const { Hand } = require('./hand.class');

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
    return Hand.create(this._deck);
  }

  hitPlayer(playerIndex = 0) {
    if (this.players[playerIndex].bust) {
      return;
    }
    this.players[playerIndex].cards.push(this._deck.draw());
    const points = this.players[playerIndex].calculatePoints();
    this.players[playerIndex].points = points;
  }
}

module.exports = Game;

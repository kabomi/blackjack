const guid = require('uuid');
const Deck = require('./card-deck.class');
const { Hand } = require('./hand.class');

class Game {
  /** @type {import('./card-deck.class');} */
  _deck;
  /** @type {string} */
  id;
  /** @type {import('./hand.class').Hand} */
  dealer;
  /** @type {import('./hand.class').Hand[]} */
  players;
  finished = false;
  winner;
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
      finished: this.finished,
      winner: this.winner,
    };
  }
  constructor(id) {
    this.id = id;
    this._deck = Game.createCardDeck();
    Object.defineProperty(this, '_deck', {
      enumerable: false,
      configurable: false,
      writable: false,
    });
    this._deck.shuffle();
    this.dealer = this.generateHand();
    this.players = [this.generateHand()];
    this.finished = false;
  }

  generateHand() {
    return Hand.create(this._deck);
  }

  hitPlayer(playerIndex = 0) {
    if (this.players[playerIndex].bust) {
      this.finish();
      return;
    }
    this.players[playerIndex].draw();
  }

  finish() {
    this.finished = true;
    if (this.players[0].points > this.dealer.points) {
      this.winner = 'PLAYER1';
    } else {
      this.winner = 'DEALER';
    }
  }
}

module.exports = Game;

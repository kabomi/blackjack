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
  static createFrom(state) {
    const game = new Game(state.id);
    game._deck._cards = [...state.deck.cards];
    game.dealer.cards = [...state.dealer.cards];
    game.dealer.points = state.dealer.points;
    game.players[0].cards = [...state.players[0].cards];
    game.players[0].points = state.players[0].points;

    return game;
  }
  static createCardDeck() {
    return new Deck();
  }
  get state() {
    return {
      id: this.id,
      dealer: this.dealer.state,
      players: [this.players[0].state],
      finished: this.finished,
      winner: this.winner,
      deck: this._deck.state,
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
    if (this.finished) {
      return;
    }

    this.players[playerIndex].draw();

    if (this.players[playerIndex].bust) {
      this.finish();
    }
  }

  finish() {
    this.finished = true;
    this.setWinner();
  }

  setWinner() {
    const hasPlayerMorePointsThanDealer =
      this.players[0].points > this.dealer.points;
    const hasPlayerSamePointsAsDealer =
      this.players[0].points === this.dealer.points;
    const isPlayerNotBust = !this.players[0].bust;

    if (isPlayerNotBust && hasPlayerMorePointsThanDealer) {
      this.winner = 'PLAYER1';
    } else {
      if (hasPlayerSamePointsAsDealer) {
        this.winner = 'DRAW';
      } else {
        this.winner = 'DEALER';
      }
    }
  }
}

module.exports = Game;

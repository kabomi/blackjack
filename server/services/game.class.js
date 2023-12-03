const guid = require('uuid');
const Deck = require('./card-deck.class');
const { OrdinaryCard, AceCard, SpecialCard } = require('./card.class');

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
    const cards = this.drawHand();
    const points = this.calculatePointsFrom(cards);
    return {
      cards,
      points,
    };
  }

  drawHand() {
    return this._deck.drawHand();
  }
  /** @type {(cards: import('./card.class').Card[])} */
  calculatePointsFrom(cards) {
    let points = 0;

    cards.forEach((card) => {
      if (card instanceof OrdinaryCard) {
        points += Number(card.face);
      } else {
        if (card instanceof AceCard) {
          if (points <= 10) {
            points += 11;
          } else {
            points += 1;
          }
        } else {
          if (card instanceof SpecialCard) {
            points += 10;
          }
        }
      }
    });

    return points;
  }
}

module.exports = Game;

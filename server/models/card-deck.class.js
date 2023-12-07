const shuffle = require('../common/shuffle');
const { OrdinaryCard, SpecialCard, Card } = require('./card.class');
/** English CardDeck */
class CardDeck {
  static create() {
    return new CardDeck();
  }

  /** @type {import('./card.class').Card[]} */
  _cards = [];

  get cards() {
    return this._cards;
  }

  get suits() {
    return Card.validSuits;
  }

  get faces() {
    return OrdinaryCard.validFaces.concat(SpecialCard.validFaces);
  }

  get state() {
    return {
      cards: this.cards,
    };
  }

  _generateCardsFor(suit) {
    return this.faces.map((face) => Card.create(face, suit));
  }

  constructor() {
    this._cards = Card.validSuits
      .map((suit) => this._generateCardsFor(suit))
      .flat();
  }

  draw() {
    return this._cards.pop();
  }
  drawHand() {
    return [this._cards.pop(), this._cards.pop()];
  }

  shuffle() {
    shuffle(this._cards);
  }
}

module.exports = CardDeck;

const shuffle = require('../common/shuffle');

class CardDeck {
  static create() {
    return new CardDeck();
  }
  get cards() {
    return this._cards;
  }

  get suits() {
    return ['Clubs', 'Diamonds', 'Hearts', 'Spades'];
  }

  get faces() {
    return Array.from(Array(9).keys())
      .map((face) => (face + 2).toString())
      .concat(Array.from(['J', 'Q', 'K', 'A']));
  }

  _generateCardsFor(suit) {
    return this.faces.map((face) => this.createCard(face, suit));
  }

  constructor() {
    this._cards = this.suits.map((suit) => this._generateCardsFor(suit)).flat();
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

  createCard(face, suit) {
    return {
      face: face,
      suit: suit,
    };
  }
}

module.exports = CardDeck;

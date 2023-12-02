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

  get kinds() {
    return Array.from(Array(9).keys())
      .map((kind) => (kind + 2).toString())
      .concat(Array.from(['J', 'Q', 'K', 'A']));
  }

  _generateCardsFor(suit) {
    return this.kinds.map((kind) => this.createCard(kind, suit));
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

  createCard(kind, suit) {
    return {
      kind: kind,
      suit: suit,
    };
  }
}

module.exports = CardDeck;

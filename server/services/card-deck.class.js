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

  _generateCardsFor(suit) {
    return [
      {
        kind: 2,
        suit: suit,
      },
      {
        kind: 3,
        suit: suit,
      },
    ];
  }

  constructor() {
    this._cards = Array.from(Array(50).keys()).concat(
      this._generateCardsFor(this.suits[0])
    );
  }

  draw() {
    return this._cards.pop();
  }

  shuffle() {
    shuffle(this._cards);
  }
}

module.exports = CardDeck;

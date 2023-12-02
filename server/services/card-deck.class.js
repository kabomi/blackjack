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

module.exports = CardDeck;

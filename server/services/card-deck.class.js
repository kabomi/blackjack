const shuffle = require('../common/shuffle');
const { OrdinaryCard, SpecialCard, Card } = require('./card.class');
/** English CardDeck */
class CardDeck {
  static create() {
    return new CardDeck();
  }
  get cards() {
    return this._cards;
  }

  get suits() {
    return Card.validSuits;
  }

  get ordinaryFaces() {
    return OrdinaryCard.validFaces;
  }

  get specialFaces() {
    return SpecialCard.validFaces;
  }

  get faces() {
    return this.ordinaryFaces.concat(this.specialFaces);
  }

  _generateCardsFor(suit) {
    return this.faces.map((face) => Card.create(face, suit));
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
}

module.exports = CardDeck;

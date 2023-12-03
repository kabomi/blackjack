const shuffle = require('../common/shuffle');
const { OrdinaryCard, SpecialCard, AceCard, Card } = require('./card.class');
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
    return Array.from(['J', 'Q', 'K']);
  }

  get faces() {
    return this.ordinaryFaces.concat(this.specialFaces).concat(['A']);
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

  /** @type {(face: string, suit, string):Card} */
  createCard(face, suit) {
    if (this.ordinaryFaces.includes(face)) {
      return new OrdinaryCard(face, suit);
    } else {
      if (this.specialFaces.includes(face)) {
        return new SpecialCard(face, suit);
      }
    }

    return new AceCard(suit);
  }
}

module.exports = CardDeck;

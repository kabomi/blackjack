class Card {
  /** @type {(face: number, suit: number):void} */
  constructor(face, suit) {
    this.face = face;
    this.suit = suit;
  }
}

class OrdinaryCard extends Card {}

module.exports = {
  Card,
  OrdinaryCard,
};

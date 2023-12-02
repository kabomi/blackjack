class Card {
  /** @type {(face: string, suit: string):void} */
  constructor(face, suit) {
    this.face = face;
    this.suit = suit;
  }
}

class OrdinaryCard extends Card {}
class SpecialCard extends Card {}
class AceCard extends Card {
  /** @type {(suit: number):void} */
  constructor(suit) {
    super('A', suit);
  }
}

module.exports = {
  Card,
  OrdinaryCard,
  SpecialCard,
  AceCard,
};

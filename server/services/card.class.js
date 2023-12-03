/** English Card */
class Card {
  /** @type {(face: string, suit, string):Card} */
  static create(face, suit) {
    if (OrdinaryCard.isValidFace(face)) {
      return new OrdinaryCard(face, suit);
    }
    return new Card(face, suit);
  }

  static get validSuits() {
    return ['Clubs', 'Diamonds', 'Hearts', 'Spades'];
  }
  static isValidSuit(suit) {
    return Card.validSuits.includes(suit);
  }
  /** @type {(face: string, suit: string):void} */
  constructor(face, suit) {
    if (!Card.isValidSuit(suit)) {
      throw new Error(
        'The card must contain a face that matches a value in [2-10]'
      );
    }
    this.face = face;
    this.suit = suit;
  }
}

class OrdinaryCard extends Card {
  static get validFaces() {
    return Array.from(Array(9).keys()).map((face) => (face + 2).toString());
  }
  static isValidFace(face) {
    return OrdinaryCard.validFaces.includes(face);
  }
  /** @type {(face: string, suit: string):void} */
  constructor(face, suit) {
    super(face, suit);

    if (!OrdinaryCard.isValidFace(face)) {
      throw new Error(
        'The card must contain a face that matches a value in [2-10]'
      );
    }
  }
}
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

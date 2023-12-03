/** English Card */
class Card {
  /** @type {(face: string, suit, string):Card} */
  static create(face, suit) {
    if (OrdinaryCard.isValidFace(face)) {
      return new OrdinaryCard(face, suit);
    } else {
      if (SpecialCard.isValidFace(face)) {
        if (AceCard.isValidFace(face)) {
          return new AceCard(suit);
        }
        return new SpecialCard(face, suit);
      }
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
class SpecialCard extends Card {
  static get validFaces() {
    return Array.from(['J', 'Q', 'K', 'A']);
  }
  static isValidFace(face) {
    return SpecialCard.validFaces.includes(face);
  }
  /** @type {(face: string, suit: string):void} */
  constructor(face, suit) {
    super(face, suit);

    if (!SpecialCard.isValidFace(face)) {
      throw new Error(
        'The card must contain a face that matches a value in [J, Q, K, A]'
      );
    }
  }
}
class AceCard extends SpecialCard {
  static get validFaces() {
    return ['A'];
  }
  static isValidFace(face) {
    return AceCard.validFaces.includes(face);
  }
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

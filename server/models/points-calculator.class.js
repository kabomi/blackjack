class CardVisitor {
  /** @type {(card: import('./card.class').Card)} */
  // eslint-disable-next-line no-unused-vars
  visitCard(card) {}
  /** @type {(card: import('./card.class').OrdinaryCard)} */
  // eslint-disable-next-line no-unused-vars
  visitOrdinaryCard(card) {}
  /** @type {(card: import('./card.class').SpecialCard)} */
  // eslint-disable-next-line no-unused-vars
  visitSpecialCard(card) {}
  /** @type {(card: import('./card.class').AceCard)} */
  // eslint-disable-next-line no-unused-vars
  visitAceCard(card) {}
}

class PointsCalculatorVisitor extends CardVisitor {
  _numberOfAces = 0;
  _regularPoints = 0;

  get points() {
    let totalPoints = this._regularPoints;
    for (let index = 0; index < this._numberOfAces; index++) {
      if (totalPoints <= 10 && this._numberOfAces === index + 1) {
        totalPoints += 11;
      } else {
        totalPoints += 1;
      }
    }
    return totalPoints;
  }

  /** @type {(card: import('./card.class').Card)}*/
  // eslint-disable-next-line no-unused-vars
  visitCard(card) {}
  /** @type {(card: import('./card.class').OrdinaryCard)} */
  visitOrdinaryCard(card) {
    this._regularPoints += Number(card.face);
  }
  /** @type {(card: import('./card.class').SpecialCard)} */
  // eslint-disable-next-line no-unused-vars
  visitSpecialCard(card) {
    this._regularPoints += 10;
  }
  /** @type {(card: import('./card.class').AceCard)} */
  // eslint-disable-next-line no-unused-vars
  visitAceCard(card) {
    this._numberOfAces += 1;
  }
}

module.exports = {
  PointsCalculatorVisitor,
  CardVisitor,
};

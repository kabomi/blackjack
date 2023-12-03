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
  _points = 0;

  get points() {
    return this._points;
  }
  /** @type {(card: import('./card.class').Card)}*/
  // eslint-disable-next-line no-unused-vars
  visitCard(card) {}
  /** @type {(card: import('./card.class').OrdinaryCard)} */
  visitOrdinaryCard(card) {
    this._points += Number(card.face);
  }
  /** @type {(card: import('./card.class').SpecialCard)} */
  // eslint-disable-next-line no-unused-vars
  visitSpecialCard(card) {
    this._points += 10;
  }
  /** @type {(card: import('./card.class').AceCard)} */
  // eslint-disable-next-line no-unused-vars
  visitAceCard(card) {
    if (this._points <= 10) {
      this._points += 11;
    } else {
      this._points += 1;
    }
  }
}

module.exports = {
  PointsCalculatorVisitor,
  CardVisitor,
};

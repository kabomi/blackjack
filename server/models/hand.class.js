const { PointsCalculatorVisitor } = require('./points-calculator.class');

class Hand {
  /** @type {import('./card-deck.class');} */
  _deck;
  /** @type {(cards: import('./card.class').Card)} */
  cards = [];
  points = 0;
  get bust() {
    return this.points > 21;
  }

  static create(deck) {
    return new Hand(deck);
  }

  constructor(deck) {
    this._deck = deck;
    Object.defineProperty(this, '_deck', {
      enumerable: false,
      configurable: false,
      writable: false,
    });
    this.cards = deck.drawHand();
    this.points = this.calculatePoints();
  }

  calculatePoints() {
    const pointsCalculator = new PointsCalculatorVisitor();

    this.cards.forEach((card) => card.accept(pointsCalculator));

    return pointsCalculator.points;
  }

  draw() {
    this.cards.push(this._deck.draw());
    this.points = this.calculatePoints();
  }
}

module.exports = {
  Hand,
};

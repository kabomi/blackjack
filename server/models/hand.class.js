const { PointsCalculatorVisitor } = require('./points-calculator.class');

class Hand {
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
    this.cards = deck.drawHand();
    this.points = this.calculatePoints();
  }

  calculatePoints() {
    const pointsCalculator = new PointsCalculatorVisitor();

    this.cards.forEach((card) => card.accept(pointsCalculator));

    return pointsCalculator.points;
  }
}

module.exports = {
  Hand,
};

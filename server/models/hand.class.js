const { PointsCalculatorVisitor } = require('./points-calculator.class');

class Hand {
  /** @type {(cards: import('./card.class').Card)} */
  cards = [];
  points = 0;
  bust = false;

  static create(deck) {
    return new Hand(deck);
  }

  constructor(deck) {
    this.cards = deck.drawHand();
    this.points = this.calculatePointsFrom(this.cards);
    this.bust = this.points > 21;
  }

  /** @type {(cards: import('./card.class').Card[])} */
  calculatePointsFrom(cards) {
    const pointsCalculator = new PointsCalculatorVisitor();

    cards.forEach((card) => card.accept(pointsCalculator));

    return pointsCalculator.points;
  }
}

module.exports = {
  Hand,
};

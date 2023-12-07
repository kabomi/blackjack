const { PointsCalculatorVisitor } = require('./points-calculator.class');

class Hand {
  /** @type {import('./card-deck.class');} */
  _deck;
  /** @type {import('./card.class').Card} */
  cards = [];
  points = 0;
  get bust() {
    return this.points > 21;
  }

  get state() {
    return {
      cards: this.cards,
      points: this.points,
      bust: this.bust,
    };
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

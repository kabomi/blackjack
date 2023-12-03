const { Card } = require('./card.class');
const { PointsCalculatorVisitor } = require('./points-calculator.class');

describe('Points Calculator Visitor', () => {
  it('sums 5 points when visiting a face of "2" and a face of "3"', () => {
    const pointsCalculator = new PointsCalculatorVisitor();

    Card.create('2', Card.validSuits[0]).accept(pointsCalculator);
    Card.create('3', Card.validSuits[0]).accept(pointsCalculator);

    expect(pointsCalculator.points).toBe(5);
  });
  it('sums 12 points when visiting two Aces', () => {
    const pointsCalculator = new PointsCalculatorVisitor();

    Card.create('A', Card.validSuits[0]).accept(pointsCalculator);
    Card.create('A', Card.validSuits[0]).accept(pointsCalculator);

    expect(pointsCalculator.points).toBe(12);
  });
});

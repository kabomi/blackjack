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

    expect(pointsCalculator.points).toBe(11);

    Card.create('A', Card.validSuits[0]).accept(pointsCalculator);

    expect(pointsCalculator.points).toBe(12);
  });
  it('sums does not bust when visiting a "10" and two Aces (Changing Order)', () => {
    const pointsCalculator = new PointsCalculatorVisitor();

    Card.create('10', Card.validSuits[0]).accept(pointsCalculator);
    Card.create('A', Card.validSuits[0]).accept(pointsCalculator);

    expect(pointsCalculator.points).toBe(21);

    Card.create('A', Card.validSuits[0]).accept(pointsCalculator);

    expect(pointsCalculator.points).toBe(12);
  });
  it('sums does not bust when visiting two Aces and a "10"', () => {
    const pointsCalculator = new PointsCalculatorVisitor();

    Card.create('A', Card.validSuits[0]).accept(pointsCalculator);

    expect(pointsCalculator.points).toBe(11);

    Card.create('A', Card.validSuits[0]).accept(pointsCalculator);

    expect(pointsCalculator.points).toBe(12);

    Card.create('10', Card.validSuits[0]).accept(pointsCalculator);

    expect(pointsCalculator.points).toBe(12);
  });
});

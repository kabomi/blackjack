const { Card, OrdinaryCard, SpecialCard, AceCard } = require('./card.class');
describe('Card', () => {
  it('should contain a face and a suit', () => {
    const card = Card.create('A', Card.validSuits[0]);

    expect(card.face).toBe('A');
    expect(card.suit).toBe(Card.validSuits[0]);
  });
  it('should contain only valid suits', () => {
    expect(() => Card.create('A', 'Harry')).toThrow(expect.any(Error));
    expect(() => Card.create('A', '')).toThrow(expect.any(Error));
    expect(() => Card.create('A', null)).toThrow(expect.any(Error));
    expect(Card.create('A', Card.validSuits[0])).toBeInstanceOf(Card);
    expect(Card.create('J', Card.validSuits[0])).toBeInstanceOf(Card);
    expect(Card.create('Q', Card.validSuits[0])).toBeInstanceOf(Card);
    expect(Card.create('K', Card.validSuits[0])).toBeInstanceOf(Card);
  });
  describe('Ordinary', () => {
    it('should contain only faces in [2-10]', () => {
      expect(Card.create('1', Card.validSuits[0])).toBeInstanceOf(Card);
      expect(Card.create('11', Card.validSuits[0])).toBeInstanceOf(Card);
      expect(Card.create('M', Card.validSuits[0])).toBeInstanceOf(Card);
      expect(Card.create('Month', Card.validSuits[0])).toBeInstanceOf(Card);
      expect(Card.create('A', Card.validSuits[0])).toBeInstanceOf(Card);
      expect(Card.create('J', Card.validSuits[0])).toBeInstanceOf(Card);
      expect(Card.create('Q', Card.validSuits[0])).toBeInstanceOf(Card);
      expect(Card.create('K', Card.validSuits[0])).toBeInstanceOf(Card);
      expect(Card.create('', Card.validSuits[0])).toBeInstanceOf(Card);
      expect(Card.create('2', Card.validSuits[0])).toBeInstanceOf(OrdinaryCard);
      expect(Card.create('5', Card.validSuits[0])).toBeInstanceOf(OrdinaryCard);
      expect(Card.create('8', Card.validSuits[0])).toBeInstanceOf(OrdinaryCard);
      expect(Card.create('10', Card.validSuits[0])).toBeInstanceOf(
        OrdinaryCard
      );
    });
  });
  describe('Special', () => {
    it('should contain only faces in [J, Q, K, A]', () => {
      expect(Card.create('A', Card.validSuits[0])).toBeInstanceOf(SpecialCard);
      expect(Card.create('J', Card.validSuits[0])).toBeInstanceOf(SpecialCard);
      expect(Card.create('Q', Card.validSuits[0])).toBeInstanceOf(SpecialCard);
      expect(Card.create('K', Card.validSuits[0])).toBeInstanceOf(SpecialCard);
      expect(Card.create('2', Card.validSuits[0])).not.toBeInstanceOf(
        SpecialCard
      );
      expect(Card.create('5', Card.validSuits[0])).not.toBeInstanceOf(
        SpecialCard
      );
      expect(Card.create('8', Card.validSuits[0])).not.toBeInstanceOf(
        SpecialCard
      );
      expect(Card.create('10', Card.validSuits[0])).not.toBeInstanceOf(
        SpecialCard
      );
    });
    describe('Ace', () => {
      it('should contain only a face with "A"', () => {
        Card.validSuits.forEach((suit) => {
          expect(Card.create('A', suit)).toBeInstanceOf(AceCard);
        });
        expect(Card.create('2', Card.validSuits[0])).not.toBeInstanceOf(
          AceCard
        );
        expect(Card.create('5', Card.validSuits[0])).not.toBeInstanceOf(
          AceCard
        );
        expect(Card.create('8', Card.validSuits[0])).not.toBeInstanceOf(
          AceCard
        );
        expect(Card.create('10', Card.validSuits[0])).not.toBeInstanceOf(
          AceCard
        );
      });
    });
  });
});

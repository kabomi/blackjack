const { Card, OrdinaryCard, SpecialCard, AceCard } = require('./card.class');
describe('Card', () => {
  it('should contain a face and a suit', () => {
    const card = Card.create('A', 'Clubs');

    expect(card.face).toBe('A');
    expect(card.suit).toBe('Clubs');
  });
  it('should contain only valid suits', () => {
    expect(() => Card.create('A', 'Harry')).toThrow(expect.any(Error));
    expect(() => Card.create('A', '')).toThrow(expect.any(Error));
    expect(() => Card.create('A', null)).toThrow(expect.any(Error));
    expect(Card.create('A', 'Clubs')).toBeInstanceOf(Card);
    expect(Card.create('J', 'Clubs')).toBeInstanceOf(Card);
    expect(Card.create('Q', 'Clubs')).toBeInstanceOf(Card);
    expect(Card.create('K', 'Clubs')).toBeInstanceOf(Card);
  });
  describe('Ordinary', () => {
    it('should contain only faces in [2-10]', () => {
      expect(Card.create('1', 'Clubs')).toBeInstanceOf(Card);
      expect(Card.create('11', 'Clubs')).toBeInstanceOf(Card);
      expect(Card.create('M', 'Clubs')).toBeInstanceOf(Card);
      expect(Card.create('Month', 'Clubs')).toBeInstanceOf(Card);
      expect(Card.create('A', 'Clubs')).toBeInstanceOf(Card);
      expect(Card.create('J', 'Clubs')).toBeInstanceOf(Card);
      expect(Card.create('Q', 'Clubs')).toBeInstanceOf(Card);
      expect(Card.create('K', 'Clubs')).toBeInstanceOf(Card);
      expect(Card.create('', 'Clubs')).toBeInstanceOf(Card);
      expect(Card.create('2', 'Clubs')).toBeInstanceOf(OrdinaryCard);
      expect(Card.create('5', 'Clubs')).toBeInstanceOf(OrdinaryCard);
      expect(Card.create('8', 'Clubs')).toBeInstanceOf(OrdinaryCard);
      expect(Card.create('10', 'Clubs')).toBeInstanceOf(OrdinaryCard);
    });
  });
  describe('Special', () => {
    it('should contain only faces in [J, Q, K, A]', () => {
      expect(Card.create('A', 'Clubs')).toBeInstanceOf(SpecialCard);
      expect(Card.create('J', 'Clubs')).toBeInstanceOf(SpecialCard);
      expect(Card.create('Q', 'Clubs')).toBeInstanceOf(SpecialCard);
      expect(Card.create('K', 'Clubs')).toBeInstanceOf(SpecialCard);
      expect(Card.create('2', 'Clubs')).not.toBeInstanceOf(SpecialCard);
      expect(Card.create('5', 'Clubs')).not.toBeInstanceOf(SpecialCard);
      expect(Card.create('8', 'Clubs')).not.toBeInstanceOf(SpecialCard);
      expect(Card.create('10', 'Clubs')).not.toBeInstanceOf(SpecialCard);
    });
    describe('Ace', () => {
      it('should contain only a face with "A"', () => {
        expect(Card.create('A', 'Clubs')).toBeInstanceOf(AceCard);
        expect(Card.create('A', 'Diamonds')).toBeInstanceOf(AceCard);
        expect(Card.create('A', 'Hearts')).toBeInstanceOf(AceCard);
        expect(Card.create('A', 'Spades')).toBeInstanceOf(AceCard);
        expect(Card.create('2', 'Clubs')).not.toBeInstanceOf(AceCard);
        expect(Card.create('5', 'Clubs')).not.toBeInstanceOf(AceCard);
        expect(Card.create('8', 'Clubs')).not.toBeInstanceOf(AceCard);
        expect(Card.create('10', 'Clubs')).not.toBeInstanceOf(AceCard);
      });
    });
  });
});

const { Card, OrdinaryCard } = require('./card.class');
describe('Card', () => {
  it('should contain a face and a suit', () => {
    const card = Card.create('A', 'Clubs');

    expect(card.face).toBe('A');
    expect(card.suit).toBe('Clubs');
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
});

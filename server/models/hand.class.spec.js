const CardDeck = require('./card-deck.class');
const { OrdinaryCard, Card, SpecialCard } = require('./card.class');
const { Hand } = require('./hand.class');

describe('Hand of Cards', () => {
  /** @type {import('./card-deck.class')} */
  let deck;
  let drawHandSpy;
  beforeEach(() => {
    deck = CardDeck.create();
    drawHandSpy = jest.spyOn(deck, 'drawHand');
  });
  describe('of a single card', () => {
    it('with cards numbered 2 through 10 are worth their face value in points', () => {
      OrdinaryCard.validFaces.forEach((face) => {
        drawHandSpy.mockReturnValue([Card.create(face, Card.validSuits[0])]);
        const hand = Hand.create(deck);
        expect(hand.points).toBe(Number(face));
      });
    });
    it('with Face cards (jack, queen, king) are each worth 10 points', () => {
      SpecialCard.validFaces.forEach((face) => {
        if (face !== 'A') {
          drawHandSpy.mockReturnValue([Card.create(face, Card.validSuits[0])]);
          const hand = Hand.create(deck);
          expect(hand.points).toBe(10);
        }
      });
    });
    it('with an Ace card is worth 11 points', () => {
      drawHandSpy.mockReturnValue([Card.create('A', Card.validSuits[0])]);
      const hand = Hand.create(deck);
      expect(hand.points).toBe(11);
    });
    // it('can be incremented on');
  });
  describe('with two cards', () => {
    it('should be different from each other', async () => {
      expect(Hand.create(deck)).not.toEqual(Hand.create(deck));
    });
    it('sums 5 points when drawing a face of "2" and a face of "3"', () => {
      drawHandSpy.mockReturnValue([
        Card.create('2', Card.validSuits[0]),
        Card.create('3', Card.validSuits[0]),
      ]);
      expect(Hand.create(deck).points).toBe(5);
    });
  });
  describe('with three cards', () => {
    it('sums does not bust when drawing a "10" and two Aces', () => {
      drawHandSpy.mockReturnValue([
        Card.create('10', Card.validSuits[0]),
        Card.create('A', Card.validSuits[0]),
        Card.create('A', Card.validSuits[0]),
      ]);

      const { points, bust } = Hand.create(deck);
      expect(points).toBe(12);
      expect(bust).toBe(false);
    });
  });
});

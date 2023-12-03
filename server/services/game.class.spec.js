const { Card, OrdinaryCard, SpecialCard } = require('./card.class');
/*
initially a Hand contains two Cards

a hand contains 2 or more Cards of a CardDeck
a hand should know the current points of the cards.


contains a gameStatus (signaling PLAYING, FINISHED)
*/
describe('Blackjack', () => {
  const Game = require('./game.class.js');
  /** @type{import('./game.class.js')}*/
  let game;
  beforeEach(() => {
    game = Game.create();
  });
  it('should generate a new game', async () => {
    expect(game.state).toEqual(
      expect.objectContaining({ id: expect.any(String) })
    );
  });
  it("contains the dealer's hand", async () => {
    expect(game.state).toEqual(
      expect.objectContaining({
        dealer: {
          cards: expect.any(Array),
          points: expect.any(Number),
        },
      })
    );
  });
  it("contains a player's hand", async () => {
    expect(game.state).toEqual(
      expect.objectContaining({
        players: expect.arrayContaining([
          {
            cards: expect.any(Array),
            points: expect.any(Number),
          },
        ]),
      })
    );
  });
  it('should shuffle the cards for every game', () => {
    const game2 = Game.create();

    expect(game.generateHand()).not.toEqual(game2.generateHand());
  });
  describe('A Hand of a single card', () => {
    it('with cards numbered 2 through 10 are worth their face value in points', () => {
      OrdinaryCard.validFaces.forEach((face) => {
        expect(
          game.calculatePointsFrom([Card.create(face, Card.validSuits[0])])
        ).toBe(Number(face));
      });
    });
    it('with Face cards (jack, queen, king) are each worth 10 points', () => {
      SpecialCard.validFaces.forEach((face) => {
        if (face !== 'A') {
          expect(
            game.calculatePointsFrom([Card.create(face, Card.validSuits[0])])
          ).toBe(Number(10));
        }
      });
    });
    it('with an Ace card is worth 11 points', () => {
      expect(
        game.calculatePointsFrom([Card.create('A', Card.validSuits[0])])
      ).toBe(Number(11));
    });
    // it('can be incremented on');
  });
  describe('A Hand with two cards', () => {
    it('should be different from each other', async () => {
      expect(game.state.players[0]).not.toEqual(game.state.dealer);
    });
    it('sums 5 points when drawing a face of "2" and a face of "3"', () => {
      jest
        .spyOn(game, 'drawHand')
        .mockReturnValue([
          Card.create('2', Card.validSuits[0]),
          Card.create('3', Card.validSuits[0]),
        ]);
      expect(game.generateHand().points).toBe(5);
    });
    it('sums 12 points when drawing two Aces', () => {
      jest
        .spyOn(game, 'drawHand')
        .mockReturnValue([
          Card.create('A', Card.validSuits[0]),
          Card.create('A', Card.validSuits[0]),
        ]);
      expect(game.generateHand().points).toBe(12);
    });
  });
});

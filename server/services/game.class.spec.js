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
  describe('A Hand', () => {
    it('should be different from each other', async () => {
      expect(game.state.players[0]).not.toEqual(game.state.dealer);
    });
    it('sums 5 points when drawing a face of "2" and a face of "3"', () => {
      const deck = Game.createCardDeck();
      jest
        .spyOn(game, 'drawHand')
        .mockReturnValue([
          deck.createCard('2', deck.suits[0]),
          deck.createCard('3', deck.suits[0]),
        ]);
      expect(game.generateHand().points).toBe(5);
    });
    // it('can be incremented on');
  });
});

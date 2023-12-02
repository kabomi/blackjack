/*
contains a dealer's Hand
contains a player's Hand
initially a Hand contains two Cards

a hand contains 2 or more Cards or a CardDeck
a hand should know the current points of the cards.

a CarDeck contains 52 Cards
a CarDeck can be shuffle
a CarDeck can deal a Card

a card is represented by a CardType and a CardKind

a CardType it can be represented with a value from 2 to 9
a CardType it can be represented with a value in (J, Q, K, A)

contains a gameStatus (signaling PLAYING, FINISHED)
*/
describe('Game', () => {
  const Game = require('./game.class.js');
  it('should generate a new game', async () => {
    const game = Game.create();

    expect(game.state).toEqual({ id: expect.any(String) });
  });
  it("contains the dealer's hand", async () => {
    const game = Game.create();

    expect(game.state).toContain({
      dealer: { cards: expect.any(Array), points: expect.any(Number) },
    });
  });
});

/*
initially a Hand contains two Cards

a hand contains 2 or more Cards of a CardDeck
a hand should know the current points of the cards.

a CarDeck can be shuffle
a CarDeck can deal a Card

a card is represented by a CardType and a CardKind

a CardType it can be represented with a value from 2 to 10
a CardType it can be represented with a value in (J, Q, K, A)

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
  describe('CardDeck', () => {
    it('contains 52 cards', () => {
      const deck = Game.createCardDeck();

      expect(deck.cards).toHaveLength(52);
    });
    it('can draw a card', () => {
      const deck = Game.createCardDeck();

      const card = deck.draw();

      expect(deck.cards).toHaveLength(51);
      expect(card).toBeDefined();
    });
    it('can shuffle', () => {
      const deck = Game.createCardDeck();

      const initialCards = [...deck.cards];

      deck.shuffle();

      expect(deck.cards).not.toEqual(initialCards);
    });
  });
});

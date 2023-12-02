// a card is represented by a CardType and a CardKind

// a CardType it can be represented with a value from 2 to 10
// a CardType it can be represented with a value in (J, Q, K, A)

describe('CardDeck', () => {
  const CardDeck = require('./card-deck.class.js');
  /** @type{import('./card-deck.class.js')}*/
  let deck;
  beforeEach(() => {
    deck = CardDeck.create();
  });
  it('contains 52 cards', () => {
    expect(deck.cards).toHaveLength(52);
  });
  it('can draw a card', () => {
    const card = deck.draw();

    expect(deck.cards).toHaveLength(51);
    expect(card).toBeDefined();
  });
  it('can shuffle', () => {
    const initialCards = [...deck.cards];
    expect(deck.cards).toEqual(initialCards);

    deck.shuffle();

    expect(deck.cards).not.toEqual(initialCards);
  });
  it('contains 4 suits', () => {
    expect(deck.suits).toEqual(['Clubs', 'Diamonds', 'Hearts', 'Spades']);
  });
  describe('The Cards', () => {
    it('contain a Card with kind "2" & "Club" suit', () => {
      expect(deck.cards).toContainEqual(
        expect.objectContaining({
          kind: 2,
          suit: 'Clubs',
        })
      );
    });
  });
});

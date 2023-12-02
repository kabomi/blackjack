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
  it('contains 13 kinds', () => {
    expect(deck.kinds).toEqual([
      '2',
      '3',
      '4',
      '5',
      '6',
      '7',
      '8',
      '9',
      '10',
      'J',
      'Q',
      'K',
      'A',
    ]);
  });
  describe('The Cards', () => {
    const fixtureCardDeck = CardDeck.create();
    const allCards = fixtureCardDeck.suits
      .map((suit) => fixtureCardDeck.kinds.map((kind) => [kind, suit]))
      .flat();
    it.each(allCards)(
      'contain a Card with kind "%s" & "%s" suit',
      (kind, suit) => {
        expect(deck.cards).toContainEqual(
          expect.objectContaining({
            kind,
            suit,
          })
        );
      }
    );
  });
});

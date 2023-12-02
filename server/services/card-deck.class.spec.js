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
});

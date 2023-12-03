const { Card } = require('./card.class.js');
/*

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
          bust: expect.any(Boolean),
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
            bust: expect.any(Boolean),
          },
        ]),
      })
    );
  });
  it('should shuffle the cards for every game', () => {
    const game2 = Game.create();

    expect(game.generateHand()).not.toEqual(game2.generateHand());
  });
  describe('HitPlayer', () => {
    it('should add a card to the player hand if not busted', () => {
      jest
        .spyOn(game._deck, 'drawHand')
        .mockReturnValue([
          Card.create('2', Card.validSuits[0]),
          Card.create('3', Card.validSuits[0]),
        ]);
      game.state.players[0] = game.generateHand();
      expect(game.state.players[0].cards).toHaveLength(2);

      game.hitPlayer();

      expect(game.state.players[0].cards).toHaveLength(3);
    });
    it('should not add a card to the player hand if busted', () => {
      jest
        .spyOn(game._deck, 'drawHand')
        .mockReturnValue([
          Card.create('10', Card.validSuits[0]),
          Card.create('10', Card.validSuits[0]),
          Card.create('10', Card.validSuits[0]),
        ]);
      game.state.players[0] = game.generateHand();
      expect(game.state.players[0].cards).toHaveLength(3);

      game.hitPlayer();

      expect(game.state.players[0].cards).toHaveLength(3);
    });
  });
  it('should finish the game explicitly', () => {
    game.finish();

    expect(game.state.finished).toBe(true);
  });
});

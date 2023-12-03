const { Card } = require('./card.class.js');
const { Hand } = require('./hand.class.js');
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
  it('should shuffle the cards before every game', () => {
    const game2 = Game.create();

    expect(game.generateHand()).not.toEqual(game2.generateHand());
  });
  describe('HitPlayer', () => {
    it('should add a card to the player hand if not busted', () => {
      jest.spyOn(Hand, 'create').mockImplementation(() => ({
        cards: [
          Card.create('2', Card.validSuits[0]),
          Card.create('3', Card.validSuits[0]),
        ],
        draw: function () {
          this.cards.push(Card.create('3', Card.validSuits[0]));
        },
        points: 5,
      }));
      game.players[0] = game.generateHand();
      expect(game.players[0].cards).toHaveLength(2);

      game.hitPlayer();

      expect(game.players[0].cards).toHaveLength(3);
    });
    it('should not add a card to the player hand if busted', () => {
      jest.spyOn(Hand, 'create').mockImplementation(() => ({
        cards: [
          Card.create('2', Card.validSuits[0]),
          Card.create('3', Card.validSuits[0]),
        ],
        draw: function () {
          this.cards.push(Card.create('3', Card.validSuits[0]));
        },
        points: 22,
        bust: true,
      }));

      game.players[0] = game.generateHand();
      expect(game.players[0].cards).toHaveLength(2);

      game.hitPlayer();

      expect(game.players[0].cards).toHaveLength(2);
    });
    it('should finish the game if the player hand is busted', () => {
      jest.spyOn(Hand, 'create').mockImplementation(() => ({
        cards: [
          Card.create('10', Card.validSuits[0]),
          Card.create('9', Card.validSuits[0]),
          Card.create('2', Card.validSuits[0]),
        ],
        draw: function () {
          this.cards.push(Card.create('3', Card.validSuits[0]));
        },
        points: 22,
        bust: true,
      }));

      game.players[0] = game.generateHand();

      game.hitPlayer();

      expect(game.state.finished).toBe(true);
    });
  });
  it('should finish the game explicitly', () => {
    game.finish();

    expect(game.state.finished).toBe(true);
  });
  describe('For the player to win the game', () => {
    it('should not be busted and have more points than the dealer', () => {
      jest.spyOn(Hand, 'create').mockImplementation(() => ({
        cards: [],
        points: 21,
        bust: false,
      }));

      game.dealer = game.generateHand();
      game.dealer.points = 20;

      game.players[0] = game.generateHand();

      game.finish();

      expect(game.state.winner).toBe('PLAYER1');
    });
  });
  describe('For the dealer to win the game', () => {
    it('should have more points than the player', () => {
      jest.spyOn(Hand, 'create').mockImplementation(() => ({
        cards: [],
        points: 20,
        bust: false,
      }));

      game.dealer = game.generateHand();
      game.dealer.points = 21;

      game.players[0] = game.generateHand();

      game.finish();

      expect(game.state.winner).toBe('DEALER');
    });
  });
});

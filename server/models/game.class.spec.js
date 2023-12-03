const { Card, OrdinaryCard, SpecialCard } = require('./card.class.js');
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
  });
  describe('A Hand with three cards', () => {
    it('sums does not bust when drawing a "10" and two Aces', () => {
      jest
        .spyOn(game, 'drawHand')
        .mockReturnValue([
          Card.create('10', Card.validSuits[0]),
          Card.create('A', Card.validSuits[0]),
          Card.create('A', Card.validSuits[0]),
        ]);

      const { points, bust } = game.generateHand();
      expect(points).toBe(12);
      expect(bust).toBe(false);
    });
  });
  describe('Hit', () => {
    it('should add a card to the player hand if not busted', () => {
      jest
        .spyOn(game, 'drawHand')
        .mockReturnValue([
          Card.create('2', Card.validSuits[0]),
          Card.create('3', Card.validSuits[0]),
        ]);
      game.state.players[0] = game.generateHand();
      expect(game.state.players[0].cards).toHaveLength(2);

      game.hit();

      expect(game.state.players[0].cards).toHaveLength(3);
    });
    it('should not add a card to the player hand if busted', () => {
      jest
        .spyOn(game, 'drawHand')
        .mockReturnValue([
          Card.create('10', Card.validSuits[0]),
          Card.create('10', Card.validSuits[0]),
          Card.create('10', Card.validSuits[0]),
        ]);
      game.state.players[0] = game.generateHand();
      expect(game.state.players[0].cards).toHaveLength(3);

      game.hit();

      expect(game.state.players[0].cards).toHaveLength(3);
    });
    it('should recalculate the points', () => {
      jest
        .spyOn(game, 'drawHand')
        .mockReturnValue([
          Card.create('10', Card.validSuits[0]),
          Card.create('10', Card.validSuits[0]),
        ]);
      game.state.players[0] = game.generateHand();
      expect(game.state.players[0].points).toBe(20);

      game.hit();

      expect(game.state.players[0].points).not.toBe(20);
    });
    it('should update the bust status', () => {
      jest
        .spyOn(game, 'drawHand')
        .mockReturnValue([
          Card.create('10', Card.validSuits[0]),
          Card.create('10', Card.validSuits[0]),
          Card.create('1', Card.validSuits[0]),
        ]);
      game.state.players[0] = game.generateHand();

      expect(game.state.players[0].bust).toBeFalsy();

      game.hit();

      expect(game.state.players[0].bust).toBeTruthy();
    });
  });
});

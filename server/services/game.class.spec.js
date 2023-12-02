describe('Game', () => {
  const Game = require('./game.class.js');
  it('should generate a new game', async () => {
    const game = Game.create();

    expect(game.state).toEqual({ id: expect.any(String) });
  });
});

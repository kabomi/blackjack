const RxDbClient = require('./RxDbClient');
jest.mock('../dbConnection', () => {
  return {
    game: {
      insert: jest.fn(),
    },
  };
});
describe('RxDbClient', () => {
  it('should create a document', () => {
    const dbConnection = require('../dbConnection');
    const client = new RxDbClient(dbConnection);
    const gameState = {
      createdAt: expect.any(String),
    };

    client.create('game', gameState);

    expect(dbConnection.game.insert).toHaveBeenCalledWith(gameState);
  });
});

const RxDbClient = require('./RxDbClient');
jest.mock('../dbConnection', () => {
  return {
    game: {
      insert: jest.fn(),
      find: jest.fn().mockReturnValue({
        exec: jest.fn().mockResolvedValue([{}]),
      }),
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
  it('should find a document', async () => {
    const dbConnection = require('../dbConnection');
    const client = new RxDbClient(dbConnection);
    const gameState = {
      id: 'anyTestId',
    };

    const document = await client.findById('game', gameState);

    expect(dbConnection.game.find).toHaveBeenCalledWith(
      expect.objectContaining({
        selector: { id: { $eq: { id: gameState.id } } },
      })
    );
    expect(document).toBeDefined();
  });
});

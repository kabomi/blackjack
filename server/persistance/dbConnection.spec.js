const RxDbClient = require('./rxdb/RxDbClient');
const { gameSchema } = require('./rxdb/schemas');

jest.mock('rxdb', () => {
  return {
    createRxDatabase: jest.fn().mockResolvedValue({
      addCollections: jest.fn(),
    }),
    addRxPlugin: jest.fn(),
  };
});
describe('dbConnection', () => {
  it('should initialize returning a db client', async () => {
    const dbConnection = require('./dbConnection');

    const dbClient = await dbConnection.initialize();

    expect(dbClient).toBeInstanceOf(RxDbClient);
  });
  it('should add a game collection', async () => {
    const { createRxDatabase } = require('rxdb');
    const dbConnection = require('./dbConnection');

    await dbConnection.initialize();

    expect((await createRxDatabase()).addCollections).toHaveBeenCalledWith(
      expect.objectContaining({
        game: { schema: gameSchema },
      })
    );
  });
});

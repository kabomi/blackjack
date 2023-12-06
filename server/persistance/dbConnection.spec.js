jest.mock('rxdb', () => {
  return {
    createRxDatabase: async () => jest.fn(),
    addRxPlugin: jest.fn(),
  };
});
describe('dbConnection', () => {
  it('should initialize returning a db client', async () => {
    const dbConnection = require('./dbConnection');

    const dbClient = await dbConnection.initialize();

    expect(dbClient).toBeInstanceOf(dbConnection.RxDbClient);
  });
});

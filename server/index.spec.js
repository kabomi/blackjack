jest.mock('./persistance/dbConnection', () => {
  const dbClient = { create: jest.fn() };
  return {
    initialize: jest.fn().mockResolvedValue(dbClient),
    get: () => dbClient,
  };
});
describe('Server', () => {
  it('should start', async () => {
    const app = require('./app');
    jest.spyOn(app, 'listen').mockImplementation(() => {
      return {
        on: jest.fn(),
        use: jest.fn(),
        get: jest.fn(),
      };
    });
    await require('./index').then(() => {
      expect(app.listen).toHaveBeenCalledWith(process.env.PORT);
    });
  });
  it('should initialize Db/DbConnection', async () => {
    const dbConnection = require('./persistance/dbConnection');

    await require('./index').then(() => {
      expect(dbConnection.initialize).toHaveBeenCalled();
    });
  });
});

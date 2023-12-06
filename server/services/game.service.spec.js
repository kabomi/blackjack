const Game = require('../models/game.class.js');
const dbConnection = require('../persistance/dbConnection');

jest.mock('../persistance/dbConnection', () => {
  return {
    initialize: jest.fn().mockResolvedValue({ create: jest.fn() }),
  };
});

describe('Game service', () => {
  /** @type {import('supertest').SuperTest<supertest.Test>} */
  let requestWithSupertest;
  /** @type {import('../persistance/dbConnection').RxDbClient} */
  let dbClient;
  beforeAll(() => {
    const server = require('../index.js');
    const supertest = require('supertest');
    requestWithSupertest = supertest(server);
  });
  beforeEach(async () => {
    dbClient = await dbConnection.initialize();
    jest.spyOn(dbClient, 'create').mockImplementation(() => jest.fn());
  });
  it('should generate a new game on POST to /', async () => {
    /** @type{import('express').Response} */
    const response = await requestWithSupertest.post('/api/game/');
    expect(response.status).toBe(200);
    expect(response.type).toBe('application/json');
    expect(response.body).toEqual(
      expect.objectContaining({ id: expect.any(String) })
    );
  });
  it('should persist a new game on POST to /', async () => {
    const gameStub = { state: {} };
    jest.spyOn(Game, 'create').mockImplementation(() => gameStub);
    await requestWithSupertest.post('/api/game/');
    expect(dbClient.create).toHaveBeenCalledWith(gameStub.state);
  });
});

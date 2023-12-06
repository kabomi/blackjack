const Game = require('../models/game.class.js');
const dbConnection = require('../persistance/dbConnection');

jest.mock('../persistance/dbConnection', () => {
  const dbClient = { create: jest.fn(), get: jest.fn(), update: jest.fn() };
  return {
    initialize: jest.fn().mockResolvedValue(dbClient),
    get: () => dbClient,
  };
});

describe('Game service', () => {
  /** @type {import('supertest').SuperTest<supertest.Test>} */
  let requestWithSupertest;
  /** @type {import('../persistance/dbConnection').RxDbClient} */
  let dbClient;
  beforeAll(() => {
    const PORT = process.env.PORT;
    const app = require('../app.js');
    const server = app.listen(PORT);
    const supertest = require('supertest');
    requestWithSupertest = supertest(server);
  });
  beforeEach(async () => {
    dbClient = await dbConnection.initialize();
    jest.spyOn(dbClient, 'create').mockResolvedValue(() => jest.fn());
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
    expect(dbClient.create).toHaveBeenCalledWith('game', gameStub.state);
  });
  describe('PATCH /{id}/hit', () => {
    let testId;
    let gameStub;
    beforeEach(() => {
      testId = 'someFakeId';
      gameStub = { state: { id: testId }, hitPlayer: jest.fn() };
      const dbDataStub = { id: testId };
      jest.spyOn(dbClient, 'get').mockResolvedValue(dbDataStub);
      jest.spyOn(Game, 'createFrom').mockImplementation(() => gameStub);
      jest.spyOn(dbClient, 'update').mockResolvedValue(jest.fn());
    });
    it('should return the updated game state', async () => {
      const testId = 'someFakeId';
      /** @type{import('express').Response} */
      const response = await requestWithSupertest.patch(
        `/api/game/${testId}/hit`
      );
      expect(response.status).toBe(200);
      expect(response.type).toBe('application/json');
      expect(response.body).toEqual(
        expect.objectContaining({ id: expect.any(String) })
      );
    });
    it('should persist the updated game state', async () => {
      await requestWithSupertest.patch(`/api/game/${testId}/hit`);
      expect(dbClient.get).toHaveBeenCalledWith(
        expect.objectContaining({ id: testId })
      );
      expect(gameStub.hitPlayer).toHaveBeenCalled();
      expect(dbClient.update).toHaveBeenCalledWith('game', gameStub.state);
    });
  });
  describe('PATCH /{id}/hold', () => {
    let testId;
    let gameStub;
    beforeEach(() => {
      testId = 'someFakeId';
      gameStub = {
        state: { id: testId },
        hitPlayer: jest.fn(),
        finish: jest.fn(),
      };
      const dbDataStub = { id: testId };
      jest.spyOn(dbClient, 'get').mockResolvedValue(dbDataStub);
      jest.spyOn(Game, 'createFrom').mockImplementation(() => gameStub);
      jest.spyOn(dbClient, 'update').mockResolvedValue(jest.fn());
    });
    it('should return the updated game state', async () => {
      const testId = 'someFakeId';
      /** @type{import('express').Response} */
      const response = await requestWithSupertest.patch(
        `/api/game/${testId}/hold`
      );
      expect(response.status).toBe(200);
      expect(response.type).toBe('application/json');
      expect(response.body).toEqual(
        expect.objectContaining({ id: expect.any(String) })
      );
    });
    it('should persist the updated game state', async () => {
      await requestWithSupertest.patch(`/api/game/${testId}/hold`);
      expect(dbClient.get).toHaveBeenCalledWith(
        expect.objectContaining({ id: testId })
      );
      expect(gameStub.finish).toHaveBeenCalled();
      expect(dbClient.update).toHaveBeenCalledWith('game', gameStub.state);
    });
  });
});

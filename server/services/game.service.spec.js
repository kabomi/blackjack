const CardDeck = require('../models/card-deck.class.js');
const Game = require('../models/game.class.js');
const { Hand } = require('../models/hand.class.js');
const dbConnection = require('../persistance/dbConnection');

jest.mock('../persistance/dbConnection', () => {
  const dbClient = {
    create: jest.fn(),
    findById: jest.fn(),
    update: jest.fn(),
  };
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
  describe('POST /', () => {
    it('should generate a new game', async () => {
      /** @type{import('express').Response} */
      const response = await requestWithSupertest.post('/api/game/');

      expect(response.status).toBe(200);
      expect(response.type).toBe('application/json');
      expect(response.body).toEqual(
        expect.objectContaining({ id: expect.any(String) })
      );
    });
    it('should send a game without sensitive data', async () => {
      /** @type{import('express').Response} */
      const response = await requestWithSupertest.post('/api/game/');

      expect(response.body.dealer.bust).toBeUndefined();
      expect(response.body.dealer.points).toBeUndefined();
      expect(response.body.dealer.cards[1]).toBeUndefined();
      expect(response.body.deck).toBeUndefined();
    });
    it('should persist a new game', async () => {
      const gameStub = Game.create();
      jest.spyOn(Game, 'create').mockImplementation(() => gameStub);
      await requestWithSupertest.post('/api/game/');
      expect(dbClient.create).toHaveBeenCalledWith('game', gameStub.state);
    });
  });
  describe('PATCH /{id}/hit', () => {
    let testId;
    let gameStub;
    beforeEach(() => {
      const deck = CardDeck.create();
      testId = 'someFakeId';
      gameStub = {
        state: { id: testId, dealer: Hand.create(deck), deck },
        hitPlayer: jest.fn(),
      };
      const dbDataStub = { toJSON: () => ({ id: testId }) };
      jest.spyOn(dbClient, 'findById').mockResolvedValue(dbDataStub);
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
    it('should send a game without sensitive data when game is NOT finished', async () => {
      /** @type{import('express').Response} */
      const response = await requestWithSupertest.patch(
        `/api/game/${testId}/hit`
      );

      expect(response.body.dealer.bust).toBeUndefined();
      expect(response.body.dealer.points).toBeUndefined();
      expect(response.body.dealer.cards[1]).toBeUndefined();
      expect(response.body.deck).toBeUndefined();
    });
    it('should send a game WITH sensitive data when game is finished', async () => {
      gameStub.state.finished = true;
      /** @type{import('express').Response} */
      const response = await requestWithSupertest.patch(
        `/api/game/${testId}/hit`
      );

      expect(response.body.dealer.bust).toBeDefined();
      expect(response.body.dealer.cards[1]).toBeDefined();
      expect(response.body.deck).toBeDefined();
    });
    it('should persist the updated game state', async () => {
      await requestWithSupertest.patch(`/api/game/${testId}/hit`);
      expect(dbClient.findById).toHaveBeenCalledWith('game', testId);
      expect(gameStub.hitPlayer).toHaveBeenCalledWith(0);
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
      const dbDataStub = { toJSON: () => ({ id: testId }) };
      jest.spyOn(dbClient, 'findById').mockResolvedValue(dbDataStub);
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
      expect(dbClient.findById).toHaveBeenCalledWith('game', testId);
      expect(gameStub.finish).toHaveBeenCalled();
      expect(dbClient.update).toHaveBeenCalledWith('game', gameStub.state);
    });
  });
});

describe('Game service', () => {
  /** @type{import('supertest').SuperTest<supertest.Test>} */
  let requestWithSupertest;
  beforeAll(() => {
    const server = require('../index.js');
    const supertest = require('supertest');
    requestWithSupertest = supertest(server);
  });
  it('should generate a new game on POST', async () => {
    /** @type{import('express').Response} */
    const response = await requestWithSupertest.post('/api/game/');
    expect(response.status).toBe(200);
    expect(response.type).toBe('application/json');
    expect(response.body).toEqual(
      expect.objectContaining({ id: expect.any(String) })
    );
  });
});

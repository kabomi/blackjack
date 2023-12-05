const { createGame, GAME_URL } = require("./game.service");

describe('Game Service', () => {
  /** @type {jest.SpyInstance<Promise<Response>} */
  let fetchSpy;
  beforeEach(() => {
    fetchSpy = jest.spyOn(window, 'fetch');
    jest.resetAllMocks();
  });
  afterAll(() => {
    jest.resetAllMocks();
  })
  it('creates a new game', async () => {
    fetchSpy.mockResolvedValue({});
    const response = await createGame();

    expect(fetchSpy).toHaveBeenCalledWith(GAME_URL, expect.objectContaining({
      method: 'POST',
      headers: expect.objectContaining({
        'Content-Type': 'application/json'
      })
    }));
    expect(response).toBeDefined();
  });
});

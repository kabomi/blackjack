const { createGame, GAME_URL, finishGame, hitGame } = require("./game.service");

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
  it('finishes a game', async () => {
    fetchSpy.mockResolvedValue({});
    const id = 'harry';
    const response = await finishGame(id);

    expect(fetchSpy).toHaveBeenCalledWith(`${GAME_URL}/${id}/hold`, expect.objectContaining({
      method: 'PATCH',
      headers: expect.objectContaining({
        'Content-Type': 'application/json'
      })
    }));
    expect(response).toBeDefined();
  });
  it('draws an extra card for the player', async () => {
    fetchSpy.mockResolvedValue({});
    const id = 'harry';
    const response = await hitGame(id);

    expect(fetchSpy).toHaveBeenCalledWith(`${GAME_URL}/${id}/hit`, expect.objectContaining({
      method: 'PATCH',
      headers: expect.objectContaining({
        'Content-Type': 'application/json'
      })
    }));
    expect(response).toBeDefined();
  });
});

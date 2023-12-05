import { render, screen, within } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import App from './App';

describe('App', () => {
  /** @type {jest.SpyInstance<Promise<Response>} */
  let fetchSpy;
  beforeEach(() => {
    fetchSpy = jest.spyOn(window, 'fetch');
    jest.resetAllMocks();
  });
  afterAll(() => {
    jest.resetAllMocks();
  })
  it('renders the header, the Dealer, the Player and the ActionList', () => {
    render(<App />);
    const headerElement = screen.getByRole('heading');
    expect(headerElement.textContent).toContain('BlackJack');
  
    const dealerElement = screen.getByTestId('dealer');
    expect(dealerElement.textContent).toBeDefined();
  
    const playerElement = screen.getByTestId('player');
    expect(playerElement.textContent).toBeDefined();
  
    const actionListElement = screen.getByTestId('action-list');
    expect(actionListElement.textContent).toBeDefined();
  });
  it('should render only the new game action', async () => {
    render(<App />);

    

    const buttonElement = await within(screen.getByTestId('action-list')).findByRole("button");
    expect(buttonElement.textContent).toBe('New Game');
  });
  describe('On New Game', () => {
    it('should render the dealers hand', async () => {
      render(<App />);

      fetchSpy.mockResolvedValue({
        json: async () => ({
          id: 'harry',
          dealer: {
            cards: [{ face: 'A', suit: 'Spades'}, { face: '9', suit: 'Spades'}]
          }
        })
      });
      const newGameElement = await within(screen.getByTestId('action-list')).findByRole("button");
      await userEvent.click(newGameElement);
      const dealerFirstCard = await within(screen.getByTestId('dealer')).findByTestId("dealer-card-1");
      const dealerSecondCard = await within(screen.getByTestId('dealer')).findByTestId("dealer-card-2");
      expect(dealerFirstCard).toBeDefined();
      expect(dealerSecondCard).toBeDefined();
    });
    it('should render the player\'s hand', async () => {
      render(<App />);

      fetchSpy.mockResolvedValue({
        json: async () => ({
          id: 'harry',
          players: [{
            cards: [{ face: 'A', suit: 'Spades'}, { face: '9', suit: 'Spades'}]
          }]
        })
      });
      const newGameElement = await within(screen.getByTestId('action-list')).findByRole("button");
      await userEvent.click(newGameElement);
      const playerFirstCard = await within(screen.getByTestId('player')).findByTestId("player-card-1");
      const playerSecondCard = await within(screen.getByTestId('player')).findByTestId("player-card-2");
      expect(playerFirstCard).toBeDefined();
      expect(playerSecondCard).toBeDefined();
    });
  });
});

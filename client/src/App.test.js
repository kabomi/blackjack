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
    beforeEach(() => {
      fetchSpy.mockResolvedValue({
        json: async () => ({
          id: 'harry',
          dealer: {
            cards: [{ face: 'A', suit: 'Spades'}, { face: '9', suit: 'Spades'}]
          },
          players: [{
            cards: [{ face: 'A', suit: 'Spades'}, { face: '9', suit: 'Spades'}],
            points: 18,
          }]
        })
      });
    });
    it('should render the dealers hand', async () => {
      render(<App />);

      const newGameElement = await within(screen.getByTestId('action-list')).findByRole("button");
      await userEvent.click(newGameElement);
      
      // Cards
      const firstCard = await within(screen.getByTestId('dealer')).findByTestId("dealer-card-1");
      const secondCard = await within(screen.getByTestId('dealer')).findByTestId("dealer-card-2");
      expect(firstCard).toBeDefined();
      expect(secondCard).toBeDefined();
      // Points
      const points = await within(screen.getByTestId('dealer')).findByTestId("dealer-points");
      expect(points.textContent).toMatch(/\s/g);
    });
    it('should render the dealer card images with the right face and suit attributes', async () => {
      render(<App />);

      const newGameElement = await within(screen.getByTestId('action-list')).findByRole("button");
      await userEvent.click(newGameElement);
      
      // Card Images
      const firstCard = await within(screen.getByTestId('dealer')).findByTestId("dealer-card-1");
      const secondCard = await within(screen.getByTestId('dealer')).findByTestId("dealer-card-2");
      const firstCardImage = await within(firstCard).findByRole("img");
      expect(firstCardImage.getAttribute('data-face')).toEqual('A');
      expect(firstCardImage.getAttribute('data-suit')).toEqual('Spades');
      expect(secondCard.getAttribute('data-face')).toBeFalsy();
      expect(secondCard.getAttribute('data-suit')).toBeFalsy();
    });
    it('should render the player\'s hand', async () => {
      render(<App />);

      const newGameElement = await within(screen.getByTestId('action-list')).findByRole("button");
      await userEvent.click(newGameElement);

      // Cards
      const firstCard = await within(screen.getByTestId('player')).findByTestId("player-card-1");
      const secondCard = await within(screen.getByTestId('player')).findByTestId("player-card-2");
      expect(firstCard).toBeDefined();
      expect(secondCard).toBeDefined();
      // Points
      const points = await within(screen.getByTestId('player')).findByTestId("player-points");
      expect(points.textContent).toMatch(/\d Points/g);
    });
  });
});

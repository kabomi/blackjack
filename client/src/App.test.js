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
    let gameState;
    beforeEach(() => {
      gameState = {
        id: 'harry',
        dealer: {
          cards: [{ face: 'A', suit: 'Spades'}, { face: '9', suit: 'Spades'}]
        },
        players: [{
          cards: [{ face: 'A', suit: 'Clubs'}, { face: '10', suit: 'Clubs'}],
          points: 18,
        }]
      };
      fetchSpy.mockResolvedValue({
        json: async () => (gameState)
      });
    });
    it('should render the dealers hand', async () => {
      render(<App />);
      

      const newGameElement = within(screen.getByTestId('action-list')).getByRole("button");
      await userEvent.click(newGameElement);
      
      // Cards
      const firstCard = screen.getByTestId('dealer-card-1');
      const secondCard = screen.getByTestId('dealer-card-2');
      expect(firstCard).toBeDefined();
      expect(secondCard).toBeDefined();
      // Points
      const points = screen.getByTestId('dealer-points');
      expect(points.textContent).toMatch(/\s/g);
    });
    it('should render the dealer card images with the right face and suit attributes', async () => {
      const dealerCards = gameState.dealer.cards;
      render(<App />);

      const newGameElement = within(screen.getByTestId('action-list')).getByRole("button");
      await userEvent.click(newGameElement);
      
      // Card Images
      const firstCard = screen.getByTestId('dealer-card-1');
      const secondCard = screen.getByTestId('dealer-card-2');
      const firstCardImage = within(firstCard).getByRole("img");
      expect(firstCardImage.getAttribute('data-face')).toEqual(dealerCards[0].face);
      expect(firstCardImage.getAttribute('data-suit')).toEqual(dealerCards[0].suit);
      expect(secondCard.getAttribute('data-face')).toBeFalsy();
      expect(secondCard.getAttribute('data-suit')).toBeFalsy();
    });
    it('should render the player\'s hand', async () => {
      render(<App />);

      const newGameElement = within(screen.getByTestId('action-list')).getByRole("button");
      await userEvent.click(newGameElement);

      // Cards
      const firstCard = screen.getByTestId('player-card-1');
      const secondCard = screen.getByTestId('player-card-2');
      expect(firstCard).toBeDefined();
      expect(secondCard).toBeDefined();
      // Points
      const points = screen.getByTestId('player-points');
      expect(points.textContent).toMatch(/\d Points/g);
    });
    it('should render the player card images with the right face and suit attributes', async () => {
      const playerCards = gameState.players[0].cards;
      render(<App />);

      const newGameElement = within(screen.getByTestId('action-list')).getByRole("button");
      await userEvent.click(newGameElement);
      
      // Card Images
      const firstCard = screen.getByTestId('player-card-1');
      const secondCard = screen.getByTestId('player-card-2');
      const firstCardImage = within(firstCard).getByRole("img");
      const secondCardImage = within(secondCard).getByRole("img");
      expect(firstCardImage.getAttribute('data-face')).toEqual(playerCards[0].face);
      expect(firstCardImage.getAttribute('data-suit')).toEqual(playerCards[0].suit);
      expect(secondCardImage.getAttribute('data-face')).toEqual(playerCards[1].face);
      expect(secondCardImage.getAttribute('data-suit')).toEqual(playerCards[1].suit);
    });
  });
});

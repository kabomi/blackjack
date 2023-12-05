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

    const buttonElement = within(screen.getByTestId('action-list')).getByRole("button");
    expect(buttonElement.textContent).toBe('New Game');
  });
  describe('On New Game', () => {
    let gameState;
    beforeEach(() => {
      gameState = {
        id: 'harry',
        dealer: {
          cards: [{ face: 'A', suit: 'Spades'}]
        },
        players: [{
          cards: [{ face: 'A', suit: 'Clubs'}, { face: '10', suit: 'Clubs'}],
          points: 21,
        }]
      };
      fetchSpy.mockResolvedValue({
        json: async () => (gameState)
      });
    });
    it('should render the dealers hand (only one card visible)', async () => {
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
  });
  describe('On Hold Action', () => {
    let gameState;
    beforeEach(() => {
      gameState = {
        id: 'harry',
        dealer: {
          cards: [{ face: 'A', suit: 'Spades'}],
          points: 19,
        },
        players: [{
          cards: [{ face: 'A', suit: 'Clubs'}, { face: '10', suit: 'Clubs'}],
          points: 21,
        }]
      };
      fetchSpy.mockResolvedValue({
        json: async () => (gameState)
      });
    });
    // TODO: we could mock the dealer component to simplify
    it('should show the dealers hand and points', async () => {
      const dealerCards = gameState.dealer.cards;
      const dealerPoints = gameState.dealer.points;
      render(<App />);
      const newGameElement = within(screen.getByTestId('action-list')).getByRole("button");
      await userEvent.click(newGameElement);


      gameState.dealer.cards.push({ face: '9', suit: 'Spades'});
      gameState.dealer.points = 19;
      const holdButtonElement = within(screen.getByTestId('action-list')).getByRole("button", { name: "Hold" });
      await userEvent.click(holdButtonElement);

      // Cards
      const firstCard = screen.getByTestId('dealer-card-1');
      const secondCard = screen.getByTestId('dealer-card-2');
      const firstCardImage = within(firstCard).getByRole("img");
      const secondCardImage = within(secondCard).getByRole("img");
      expect(firstCardImage.getAttribute('data-face')).toEqual(dealerCards[0].face);
      expect(firstCardImage.getAttribute('data-suit')).toEqual(dealerCards[0].suit);
      expect(secondCardImage.getAttribute('data-face')).toEqual(dealerCards[1].face);
      expect(secondCardImage.getAttribute('data-suit')).toEqual(dealerCards[1].suit);
      // Points
      const points = screen.getByTestId('dealer-points');
      expect(points.textContent).toContain(`${dealerPoints} Points`);
    });
    it('should show the winner', async () => {
      render(<App />);
      const newGameElement = within(screen.getByTestId('action-list')).getByRole("button");
      await userEvent.click(newGameElement);


      gameState.dealer.cards.push({ face: '9', suit: 'Spades'});
      gameState.dealer.points = 19;
      gameState.winner = "Player1";
      const holdButtonElement = within(screen.getByTestId('action-list')).getByRole("button", { name: "Hold" });
      await userEvent.click(holdButtonElement);

      const dialog = screen.getByRole("dialog");
      expect(dialog).toBeDefined();
      expect(dialog.textContent).toContain("Player1 Wins");
    });
  });
  describe('On Hit Action', () => {
    let gameState;
    beforeEach(() => {
      gameState = {
        id: 'harry',
        dealer: {
          cards: [{ face: 'A', suit: 'Spades'}],
          points: 19,
        },
        players: [{
          cards: [{ face: 'A', suit: 'Clubs'}, { face: '10', suit: 'Clubs'}],
          points: 21,
        }]
      };
      fetchSpy.mockResolvedValue({
        json: async () => (gameState)
      });
    });
    it('should update player\'s cards', async () => {
      const playerCards = gameState.players[0].cards;
      render(<App />);
      const newGameElement = within(screen.getByTestId('action-list')).getByRole("button");
      await userEvent.click(newGameElement);


      playerCards.push({ face: '9', suit: 'Spades'});
      gameState.players[0].points = 20;
      const holdButtonElement = within(screen.getByTestId('action-list')).getByRole("button", { name: "Hit" });
      await userEvent.click(holdButtonElement);

      // Cards
      expect(screen.getByTestId('player-card-1')).toBeDefined();
      expect(screen.getByTestId('player-card-2')).toBeDefined();
      expect(screen.getByTestId('player-card-3')).toBeDefined();
      expect(screen.queryByTestId('player-card-4')).toBeFalsy();
      // Points
      const points = screen.getByTestId('player-points');
      expect(points.textContent).toContain(`${gameState.players[0].points} Points`);
    });
  });
});

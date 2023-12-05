import { render, screen, within } from '@testing-library/react';
import App from './App';

describe('App', () => {
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
});

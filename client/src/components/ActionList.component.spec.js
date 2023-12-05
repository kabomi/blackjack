import { render, screen, within } from '@testing-library/react';
import { ActionList } from './ActionList.component';

describe('ActionList', () => {
  it('should render new game action', () => {
    render(<ActionList />);

    const buttonElement = within(screen.getByTestId('action-list')).getByRole("button");
    expect(buttonElement.textContent).toBe('New Game');
  });
  it('should render other game actions than "new game"', () => {
    render(<ActionList showGameActions={true} />);

    const buttonList = within(screen.getByTestId('action-list')).getAllByRole("button");
    expect(buttonList[0].textContent).toBe('Hit');
    expect(buttonList[1].textContent).toBe('Hold');
  });
});

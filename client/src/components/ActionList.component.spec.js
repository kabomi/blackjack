import { render, screen, within } from '@testing-library/react';
import { ActionList } from './ActionList.component';

describe('ActionList', () => {
  it('should render new game action', () => {
    render(<ActionList />);

    const buttonElement = within(screen.getByTestId('action-list')).getByRole("button");
    expect(buttonElement.textContent).toBe('New Game');
  });
});

import { render, screen, within } from '@testing-library/react';
import { Player } from './Player.component';

describe('Player', () => {
  let player;
  beforeEach(() => {
    player = {
        cards: [{ face: 'A', suit: 'Spades'}, { face: '9', suit: 'Spades'}],
        points: 19,
    };  
  });

  it('should render card images with the right face and suit attributes', async () => {
    render(<Player cards={player.cards} />);

    // Card Images
    const firstCard = screen.getByTestId('player-card-1');
    const secondCard = screen.getByTestId('player-card-2');
    const firstCardImage = within(firstCard).getByRole("img");
    const secondCardImage = within(secondCard).getByRole("img");
    expect(firstCardImage.getAttribute('data-face')).toEqual(player.cards[0].face);
    expect(firstCardImage.getAttribute('data-suit')).toEqual(player.cards[0].suit);
    expect(secondCardImage.getAttribute('data-face')).toEqual(player.cards[1].face);
    expect(secondCardImage.getAttribute('data-suit')).toEqual(player.cards[1].suit);
  });
  it('should render points', async () => {
    render(<Player cards={player.cards} points={player.points} />);

    const points = screen.getByTestId('player-points');
    expect(points.textContent).toContain(`${player.points} Points`);
  });
});

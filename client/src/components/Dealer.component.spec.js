import { render, screen, within } from '@testing-library/react';
import { Dealer } from './Dealer.component';

describe('Dealer', () => {
  let dealer;
  beforeEach(() => {
    dealer = {
        cards: [{ face: 'A', suit: 'Spades'}, { face: '9', suit: 'Spades'}],
        points: 19,
    };  
  });
  describe('When showHand is NOT activated', () => {
    it('should render the first card image with the right face and suit attributes', async () => {
      render(<Dealer dealerCards={dealer.cards} />);
      
      const firstCard = screen.getByTestId('dealer-card-1');
      const firstCardImage = within(firstCard).getByRole("img");
      expect(firstCardImage.getAttribute('data-face')).toEqual(dealer.cards[0].face);
      expect(firstCardImage.getAttribute('data-suit')).toEqual(dealer.cards[0].suit);
    });
    it('should render the second card image hidden', async () => {
      render(<Dealer dealerCards={dealer.cards} />);
      
      const secondCard = screen.getByTestId('dealer-card-2');
      expect(secondCard.getAttribute('data-face')).toBeFalsy();
      expect(secondCard.getAttribute('data-suit')).toBeFalsy();
    });
    it('should not render points', async () => {
      render(<Dealer dealerCards={dealer.cards} dealerPoints={dealer.points} />);
      
      const points = screen.getByTestId('dealer-points');
      expect(points.textContent).toContain(" ");
    });
  });
  describe('When showHand is activated', () => {
    it('should render card images with the right face and suit attributes', async () => {
      render(<Dealer dealerCards={dealer.cards} showHand={true} />);
      
      // Card Images
      const firstCard = screen.getByTestId('dealer-card-1');
      const secondCard = screen.getByTestId('dealer-card-2');
      const firstCardImage = within(firstCard).getByRole("img");
      const secondCardImage = within(secondCard).getByRole("img");
      expect(firstCardImage.getAttribute('data-face')).toEqual(dealer.cards[0].face);
      expect(firstCardImage.getAttribute('data-suit')).toEqual(dealer.cards[0].suit);
      expect(secondCardImage.getAttribute('data-face')).toEqual(dealer.cards[1].face);
      expect(secondCardImage.getAttribute('data-suit')).toEqual(dealer.cards[1].suit);
    });
    it('should render points', async () => {
      render(<Dealer dealerCards={dealer.cards} showHand={true} dealerPoints={dealer.points} />);
      
      const points = screen.getByTestId('dealer-points');
      expect(points.textContent).toContain(`${dealer.points} Points`);
    });
  });
});

import dealerLogo from '../dealer.svg';
import './Dealer.component.css';

export const Dealer = ({ cards, points, showHand }) => {
  const [dealerFirstCard] = cards;
  return (
    <>
      <img src={dealerLogo} className="dealer-logo" alt="Dealer" tabIndex={0} />
      <section className="App-dealer" data-testid="dealer">
        <label className="points" data-testid="dealer-points">
          {showHand ? `${points} Points` : ' '}
        </label>
        {dealerFirstCard.face ? (
          <div className="dealer-card-list">
            <figure
              role="figure"
              key={dealerFirstCard.face + dealerFirstCard.suit}
              className="card"
              data-testid="dealer-card-1"
            >
              <div
                role="img"
                className="card-image"
                data-face={dealerFirstCard.face}
                data-suit={dealerFirstCard.suit}
              ></div>
              <figcaption
                tabIndex={0}
                className="hidden-accessible"
                aria-label={`Dealer card: ${dealerFirstCard.face} ${dealerFirstCard.suit}`}
              ></figcaption>
            </figure>
            <figure role="figure" className="card" data-testid="dealer-card-2">
              {showHand ? (
                <div
                  role="img"
                  className="card-image"
                  data-face={cards?.[1]?.face}
                  data-suit={cards?.[1]?.suit}
                ></div>
              ) : (
                <div role="img" className="card-image card-image-hidden"></div>
              )}
              <figcaption
                tabIndex={0}
                className="hidden-accessible"
                aria-label="Dealer card: hidden"
              ></figcaption>
            </figure>
          </div>
        ) : null}
      </section>
    </>
  );
};

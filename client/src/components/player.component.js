export const Player = ({ cards, points }) => {
  return (
    <section className="App-player" data-testid="player">
      <label
        tabIndex={0}
        data-testid="player-points"
        aria-label={`Player points: ${points ? points + ' Points' : ''}`}
      >
        Player {points ? points + ' Points' : ''}
      </label>
      {cards.length > 0 ? (
        <div className="player-card-list">
          {cards.map((card, i) => (
            <figure
              role="figure"
              key={card.face + card.suit}
              className="card"
              data-testid={`player-card-${i + 1}`}
            >
              <div
                role="img"
                className="card-image"
                data-face={card.face}
                data-suit={card.suit}
              ></div>
              <figcaption
                tabIndex={0}
                className="hidden-accessible"
                aria-label={`Player card: ${card.face} ${card.suit}`}
              ></figcaption>
            </figure>
          ))}
        </div>
      ) : null}
    </section>
  );
};

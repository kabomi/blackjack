export const Player = ({playerCards, playerPoints}) => {

  return <section className="App-player" data-testid="player">
    <label tabIndex={0} aria-label={`Player points: ${playerPoints ? playerPoints + " Points" : ""}`}>{playerPoints ? playerPoints + " Points" : ""}</label>
    { playerCards.length > 0 ?
    <div className="player-card-list">
      {playerCards.map((card,i) => (
        <figure role="figure" key={card.face + card.suit} className="card" data-testid={`player-card-${i + 1}`}>
          <div className="card-image" data-face={card.face} data-suit={card.suit}></div>
          <figcaption tabIndex={0} className="hidden-accessible" aria-label={`Player card: ${card.face} ${card.suit}`}></figcaption>
        </figure>
      ))}
    </div>
    : null
    }
  </section>;
}

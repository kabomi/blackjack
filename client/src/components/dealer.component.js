export const Dealer = ({dealerFirstCard}) => {

  return <section className="App-dealer">
    <label className="points">&nbsp;</label>
    { dealerFirstCard.face ? 
    <div className="dealer-card-list">
      <figure key={dealerFirstCard.face + dealerFirstCard.suit} className="card">
        <div className="card-image" data-face={dealerFirstCard.face} data-suit={dealerFirstCard.suit}></div>
        <figcaption tabIndex={0} className="hidden-accessible" aria-label={`Dealer card: ${dealerFirstCard.face} ${dealerFirstCard.suit}`}></figcaption>
      </figure>
      <figure className="card">
        <div className="card-image card-image-hidden"></div>
        <figcaption tabIndex={0} className="hidden-accessible" aria-label="Dealer card: hidden"></figcaption>
      </figure>
    </div>
    : null
    }
  </section>;
}

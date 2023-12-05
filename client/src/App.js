import { useState } from 'react';
import dealerLogo from './dealer.svg';
import cardDeck from './card-deck.svg';
import './App.css';
import { createGame } from './services/game/game.service';
import { Dealer } from './components/dealer.component';

function App() {
  const [started, setStarted] = useState(false);
  const [gameLoading, setGameLoading] = useState(false);
  const [gameState, setGameState] = useState();

  const [dealerFirstCard] = gameState?.dealer?.cards || [{}, {}];
  const playerCards = gameState?.players?.[0]?.cards || [];
  const playerPoints = gameState?.players?.[0]?.points;

  const onCreateNewGame = async () => {
    try {
      setGameLoading(true);

      // setTimeout(async () =>{
      const response = await createGame();
      setGameState(await response.json());
      setStarted(true);
      // },1000);
    } catch (ex) {
      console.error(ex);
    } finally {
      setGameLoading(false);
    }
  };
  return (
    <div className="App">
      <header className="App-header">
        <h1>BlackJack</h1>
      </header>
      <main className="App-main">
        {/* Preload big image */}
        <img src={cardDeck} className="preload-card-deck" alt="Preload card deck" />
        <img src={dealerLogo} className="dealer-logo" alt="Dealer" tabIndex={0} />
        <Dealer dealerFirstCard={dealerFirstCard}></Dealer>
        <section className="App-player">
          <label tabIndex={0} aria-label={`Player points: ${playerPoints ? playerPoints + " Points" : ""}`}>{playerPoints ? playerPoints + " Points" : ""}</label>
          { playerCards.length > 0 ?
          <div className="player-card-list">
            {playerCards.map((card) => (
              <figure key={card.face + card.suit} className="card">
                <div className="card-image" data-face={card.face} data-suit={card.suit}></div>
                <figcaption tabIndex={0} className="hidden-accessible" aria-label={`Player card: ${card.face} ${card.suit}`}></figcaption>
              </figure>
            ))}
          </div>
          : null
          }
        </section>
        <section className="App-action-list">
          {started ? (
            <>
              <div className="App-action">
                <button className="button">Hit</button>
              </div>
              <div className="App-action">
                <button className="button">Hold</button>
              </div>
            </>
          ) : gameLoading ? (
            <span className="loader"></span>
          ) : (
            <div className="App-action">
              <button className="button" onClick={onCreateNewGame}>New Game</button>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

export default App;

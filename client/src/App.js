import { useState } from 'react';
import cardDeck from './card-deck.svg';
import './App.css';
import {
  createGame,
  finishGame,
  hitPlayer,
} from './services/game/game.service';
import { Dealer } from './components/Dealer.component';
import { Player } from './components/Player.component';
import { ActionList } from './components/ActionList.component';
import { Dialog } from './components/Dialog.component';

function App() {
  const [started, setStarted] = useState(false);
  const [isGameLoading, setIsGameLoading] = useState(false);
  const [gameState, setGameState] = useState();

  const gameId = gameState?.id;
  const dealerCards = gameState?.dealer?.cards || [{}];
  const dealerPoints = gameState?.dealer?.points;
  const playerCards = gameState?.players?.[0]?.cards || [];
  const playerPoints = gameState?.players?.[0]?.points;

  const onCreateNewGame = async () => {
    try {
      setIsGameLoading(true);
      // setTimeout(async () =>{
      const response = await createGame();
      setGameState(await response.json());
      setStarted(true);
      // },1000);
    } catch (ex) {
      console.error(ex);
    } finally {
      setIsGameLoading(false);
    }
  };
  const onPlayerHold = async () => {
    try {
      setIsGameLoading(true);

      // setTimeout(async () =>{
      const response = await finishGame(gameId);
      setGameState(await response.json());
      //  },1000);
    } catch (ex) {
      console.error(ex);
    } finally {
      setIsGameLoading(false);
    }
  };
  const onPlayerHit = async () => {
    try {
      setIsGameLoading(true);

      // setTimeout(async () =>{
      const response = await hitPlayer(gameId);
      setGameState(await response.json());
      //  },1000);
    } catch (ex) {
      console.error(ex);
    } finally {
      setIsGameLoading(false);
    }
  };
  return (
    <div className="App">
      <header role="heading" aria-level={1} className="App-header">
        <h1>BlackJack</h1>
      </header>
      <main className="App-main">
        {/* Preload big image */}
        <img
          src={cardDeck}
          className="preload-card-deck"
          alt="Preload card deck"
        />
        <Dealer
          cards={dealerCards}
          showHand={gameState?.finished}
          points={dealerPoints}
        />
        <Player cards={playerCards} points={playerPoints} />
        <ActionList
          showGameActions={started}
          isLoading={isGameLoading}
          onNewGame={onCreateNewGame}
          onHold={onPlayerHold}
          onHit={onPlayerHit}
        />
      </main>
      <Dialog
        dataTestId="game-dialog"
        showModal={gameState?.finished}
        content={
          <>
            <h2>{gameState?.winner} Wins</h2>
            <details>
              <summary>View results</summary>
              <p>
                Dealer Points: <mark>{gameState?.dealer.points}</mark>
              </p>
              <p>
                Player Points: <mark>{gameState?.players[0].points}</mark>
              </p>
            </details>
          </>
        }
        contentActions={
          <button autoFocus onClick={onCreateNewGame}>
            New Game
          </button>
        }
      />
    </div>
  );
}

export default App;

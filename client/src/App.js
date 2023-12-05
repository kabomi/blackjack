import { useState } from 'react';
import cardDeck from './card-deck.svg';
import './App.css';
import { createGame } from './services/game/game.service';
import { Dealer } from './components/Dealer.component';
import { Player } from './components/Player.component';
import { Actions } from './components/ActionList.component';

function App() {
  const [started, setStarted] = useState(false);
  const [isGameLoading, setIsGameLoading] = useState(false);
  const [gameState, setGameState] = useState();

  const [dealerFirstCard] = gameState?.dealer?.cards || [{}, {}];
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
  return (
    <div className="App">
      <header role="heading" aria-level={1} className="App-header">
        BlackJack
      </header>
      <main className="App-main">
        {/* Preload big image */}
        <img src={cardDeck} className="preload-card-deck" alt="Preload card deck" />
        <Dealer dealerFirstCard={dealerFirstCard}></Dealer>
        <Player playerCards={playerCards} playerPoints={playerPoints}></Player>
        <Actions showGameActions={started} isLoading={isGameLoading} onNewGame={onCreateNewGame}></Actions>
      </main>
    </div>
  );
}

export default App;

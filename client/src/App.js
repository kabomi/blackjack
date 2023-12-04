import { useState } from 'react';
import dealerLogo from './dealer.svg';
import './App.css';

function App() {
  const [started, setStarted] = useState(false);
  const [gameLoading, setGameLoading] = useState(false);
  return (
    <div className="App">
      <header className="App-header">
        <h1>BlackJack</h1>
      </header>
      <main className="App-main">
        <section className="App-dealer">
          <img src={dealerLogo} className="dealer-logo" alt="Dealer" />
          <div className="dealer-card-list">
          </div>
        </section>
        <section className="App-player">
          <div className="player-card-list">
          </div>
        </section>
        <section className="App-action-list">
          { started ?
          <>
            <div className="App-action">
              <button>Hit</button>
            </div>
            <div className="App-action">
              <button>Hold</button>
            </div>
          </>
          : gameLoading ?
            <span className="loader"></span>
            :
            <div className="App-action">
              <button onClick={onCreateNewGame}>New Game</button>
            </div>
          }
        </section>
      </main>
    </div>
  );
}

export default App;

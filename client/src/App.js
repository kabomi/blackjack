import dealerLogo from './dealer.svg';
import './App.css';

function App() {
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
          <div className="App-action">
            <button>New Game</button>
          </div>
          <div className="App-action">
            <button>Hit</button>
          </div>
          <div className="App-action">
            <button>Hold</button>
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;

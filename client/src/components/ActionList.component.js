import './ActionList.component.css';

export const ActionList = ({
  showGameActions,
  isLoading,
  onNewGame,
  onHold,
  onHit,
}) => {
  return (
    <section className="App-action-list" data-testid="action-list">
      {showGameActions ? (
        <>
          <div className="App-action">
            <button className="button" onClick={onHit}>
              Hit
            </button>
          </div>
          <div className="App-action">
            <button className="button" onClick={onHold}>
              Hold
            </button>
          </div>
        </>
      ) : isLoading ? (
        <span className="loader"></span>
      ) : (
        <div className="App-action">
          <button className="button" onClick={onNewGame}>
            New Game
          </button>
        </div>
      )}
    </section>
  );
};

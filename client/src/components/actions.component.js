export const Actions = ({showGameActions, isLoading, onNewGame}) => {

  return <section className="App-action-list">
    {showGameActions ? (
      <>
        <div className="App-action">
          <button className="button">Hit</button>
        </div>
        <div className="App-action">
          <button className="button">Hold</button>
        </div>
      </>
    ) : isLoading ? (
      <span className="loader"></span>
    ) : (
      <div className="App-action">
        <button className="button" onClick={onNewGame}>New Game</button>
      </div>
    )}
  </section>;
}

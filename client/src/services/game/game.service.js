export const GAME_URL = 'http://localhost:8080/api/game';
export const createGame = () => {
  return fetch(GAME_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
  });
};
export const finishGame = () => {
  return fetch(GAME_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
  });
}

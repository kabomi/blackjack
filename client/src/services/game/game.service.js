export const GAME_URL = 'http://localhost:8080/api/game';
export const createGame = () => {
  return fetch(GAME_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
  });
};
export const finishGame = (id) => {
  return fetch(`${GAME_URL}/${id}/hold`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
  });
}
export const hitPlayer = (id) => {
  return fetch(`${GAME_URL}/${id}/hit`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
  });
}

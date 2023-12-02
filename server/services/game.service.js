const express = require('express');
const router = express.Router();

class Game {
  get state() {
    return {
      id: this.id,
    };
  }
  constructor() {
    this.id = 'someId';
  }
}

// Game api route.
router.post('/', (req, res) => {
  const newGame = new Game();
  res.json(newGame.state);
});

module.exports = router;

const express = require('express');
const router = express.Router();
const Game = require('./game.class');

// Game api route.
router.post('/', (req, res) => {
  const newGame = Game.create();
  res.json(newGame.state);
});

module.exports = router;

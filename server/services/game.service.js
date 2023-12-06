const express = require('express');
const router = express.Router();
const Game = require('../models/game.class');
const dbConnection = require('../persistance/dbConnection');

router.post('/', async (req, res) => {
  const newGame = Game.create();
  const dbClient = dbConnection.get();
  await dbClient.create(newGame.state);
  res.json(newGame.state);
});

router.patch('/:id/hit', async (req, res) => {
  const dbClient = dbConnection.get();
  const gameState = await dbClient.get({ id: req.params.id });
  const game = Game.createFrom({ state: gameState });
  game.hitPlayer();
  await dbClient.update(game.state);
  res.json(game.state);
});

router.patch('/:id/hold', async (req, res) => {
  const dbClient = dbConnection.get();
  const gameState = await dbClient.get({ id: req.params.id });
  const game = Game.createFrom({ state: gameState });
  game.finish();
  await dbClient.update(game.state);
  res.json(game.state);
});

module.exports = router;

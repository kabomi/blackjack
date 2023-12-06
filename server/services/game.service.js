const express = require('express');
const router = express.Router();
const Game = require('../models/game.class');
const dbConnection = require('../persistance/dbConnection');
const collection = 'game';

router.post('/', async (req, res) => {
  const newGame = Game.create();
  const dbClient = dbConnection.get();
  await dbClient.create(collection, newGame.state);
  res.json(newGame.state);
});

router.patch('/:id/hit', async (req, res) => {
  const dbClient = dbConnection.get();
  const gameState = await dbClient.findById(collection, { id: req.params.id });
  const game = Game.createFrom({ state: gameState.toJSON() });
  game.hitPlayer();
  await dbClient.update(collection, game.state);
  res.json(game.state);
});

router.patch('/:id/hold', async (req, res) => {
  const dbClient = dbConnection.get();
  const gameState = await dbClient.findById(collection, { id: req.params.id });
  const game = Game.createFrom({ state: gameState.toJSON() });
  game.finish();
  await dbClient.update(collection, game.state);
  res.json(game.state);
});

module.exports = router;

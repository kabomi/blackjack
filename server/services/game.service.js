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
  const newGame = Game.create();
  // const dbClient = dbConnection.get();
  // await dbClient.create(newGame.state);
  res.json(newGame.state);
});

module.exports = router;

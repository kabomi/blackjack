const express = require('express');
const router = express.Router();
const gameService = require('./game.service');

router.use('/game', gameService);

module.exports = router;

const express = require('express');
const router = express.Router();

// Game api route.
router.get('/', (req, res) => {
  res.json({ message: 'Hello from server!' });
});

module.exports = router;

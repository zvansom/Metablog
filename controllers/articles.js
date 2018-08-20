// Requires
const express = require('express');
const router = express.Router();

// Route
router.get('/', (req, res) => {
  res.send('articles home');
});

module.exports = router;

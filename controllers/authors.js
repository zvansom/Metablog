// Requires
const express = require('express');
const router = express.Router();

// Route
router.get('/', (req, res) => {
  res.send('authors home');
});

module.exports = router;

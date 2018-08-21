// Requires
const express = require('express');
const router = express.Router();

// Route
router.get('/', (req, res) => {
  res.render('articles/index');
});

router.get('/new', (req, res) => {
  res.send('new article');
});

router.get('/:id', (req, res) => {
  res.send('article id');
});

router.post('/', (req, res) => {
  res.send('posted article');
});

module.exports = router;

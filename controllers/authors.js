// Requires
const express = require('express');
const router = express.Router();

// Route
router.get('/', (req, res) => {
  res.render('authors/index');
});

router.get('/new', (req, res) => {
  res.render('authors/new');
});

router.get('/:id', (req, res) => {
  res.send('author id');
});

router.post('/', (req, res) => {
  res.send('posted author');
});

module.exports = router;

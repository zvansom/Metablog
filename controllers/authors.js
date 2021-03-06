// Requires
const express = require('express');
const router = express.Router();
const db = require('../models');

// Route
router.get('/', (req, res) => {
  db.author.findAll()
  .then( allAuthors => { res.render('authors/index', { authors: allAuthors }) })
  .catch( err => { res.render('error')} );
});

router.get('/new', (req, res) => {
  res.render('authors/new');
});

router.get('/:id', (req, res) => {
  db.author.findOne({
    where: { id: req.params.id },
    include: [db.article] })
  .then( foundAuthor => { res.render('authors/show', {author: foundAuthor}) })
  .catch( err => res.render('error') );
});

router.post('/', (req, res) => {
  db.author.create(req.body)
  .then( createdAuthor => { res.redirect('/authors/' + createdAuthor.id); })
  .catch( err => res.render('error') );
});

module.exports = router;

// Requires
const db = require('../models');
const express = require('express');
const router = express.Router();

// Route
router.get('/', (req, res) => {
  db.article.findAll()
  .then( allArticles => res.render('articles/index', { articles: allArticles }) )
  .catch( err => res.send('error getting articles') );
});

router.get('/new', (req, res) => {
  db.author.findAll()
  .then( allAuthors => res.render('articles/new', { authors: allAuthors }) )
  .catch( err => res.send('error getting authors') );
});

router.get('/:id', (req, res) => {
  db.article.findOne({
    where: { id: req.params.id },
    include: [db.author] })
  .then( article => res.render('articles/show', { article }) )
  .catch( err => res.send('error getting article') );
});

router.post('/', (req, res) => {
  db.article.create(req.body)
  .then( createdArticle => { res.redirect('/articles/' + createdArticle.id) })
  .catch( err => res.send('error creating article') );
});

module.exports = router;

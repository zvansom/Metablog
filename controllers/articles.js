// Requires
const async = require('async');
const db = require('../models');
const express = require('express');
const router = express.Router();

// Route
router.get('/', (req, res) => {
  db.article.findAll()
  .then( allArticles => res.render('articles/index', { articles: allArticles }) )
  .catch( err => res.render('error') );
});

router.get('/new', (req, res) => {
  db.author.findAll()
  .then( allAuthors => res.render('articles/new', { authors: allAuthors }) )
  .catch( err => res.render('error') );
});

router.get('/:id', (req, res) => {
  db.article.findOne({
    where: { id: req.params.id },
    include: [db.author, db.comment, db.tag] })
  .then( article => {
    db.author.findAll()
    .then( allAuthors => {
    res.render('articles/show', { article, authors: allAuthors }) })
    .catch( err => res.render('error') ) })
  .catch( err => res.render('error') );
});

router.post('/', (req, res) => {
  if (req.body.authorId > 0){
    db.article.create(req.body)
    .then( createdArticle => {
      let tags = [];
      if (req.body.tags) { tags = req.body.tags.split(','); }

      if (tags.length > 0) {
        async.forEach(tags, function(t, done) {
          // Runs for each individual tag.
          db.tag.findOrCreate({
            where: { name: t.trim() }
          }).spread(function(newTag, wasCreated) {
            createdArticle.addTag(newTag).then(function() {
              done();
            });
          });
        }, function(){
          // Runs when everything is done.
          res.redirect('/articles/' + createdArticle.id);
        });
      } else {
        res.redirect('/articles/' + createdArticle.id);
      }
    });
  } else {
    res.redirect('/articles/new');
  }
});

module.exports = router;

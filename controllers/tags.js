// Requires
const async = require('async');
const db = require('../models');
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  db.tag.findAll()
  .then( tags => {
    res.render('tags/index', { tags });
  }).catch( err => { res.render('error'); });
});

router.get('/edit/:id', (req, res) => {
  db.tag.findById(req.params.id)
  .then( foundTag => { res.render('tags/edit', { tag: foundTag }); })
  .catch( err => { res.render('error') });
});

router.put('/:id', (req, res) => {
  res.send(req.body);
});

router.get('/:id', (req, res) => {
  db.tag.findOne({
    where: { id: req.params.id },
    include: [db.article]
  }).then( tag => {
    res.render('tags/show', { tag });
  }).catch( err => { res.render('error'); });
});

router.delete('/:id', (req, res) => {
  db.tag.findOne({
    where: { id: req.params.id },
    include: [db.article]
  }).then( foundTag => {
    async.forEach(foundTag.articles, function(a, done){
      // Runs for each article
      foundTag.removeArticle(a)
      .then( () => { done() });
    }, function(){
      // Runs when everything is done.
      // References in the join table are deleted. Can proceed with deleting the tag itself.
      db.tag.destroy({ where: { id: req.params.id } })
      .then( () => { res.send('Deleted') })
      .catch( err => { res.status(500).send('Oh noooooooo!'); })
    });
  }).catch( err => { res.status(500).send('Oh nooooooooo!'); });
});

module.exports = router;

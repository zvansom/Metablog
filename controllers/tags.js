// Requires
const db = require('../models');
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  db.tag.findAll()
  .then( tags => {
    res.render('tags/index', { tags });
  }).catch( err => { res.render('error'); });
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
  res.send('delete');
})

module.exports = router;

// Requires
const db = require('../models');
const express = require('express');
const router = express.Router();

router.post('/', (req, res) => {
  db.comment.create(req.body)
  .then( createdComment => res.redirect('/articles/' + req.body.articleId) )
  .catch( err => res.render('error') );
});

module.exports = router;

// Requires
const bodyParser = require('body-parser');
const ejsLayouts = require('express-ejs-layouts');
const express = require('express');

// Globals
const app = express();

// Set and use
app.set('view engine', 'ejs');
app.use(ejsLayouts);
app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static(__dirname + '/public/'));

// Include controllers/routers
app.use('/articles', require('./controllers/articles'));
app.use('/authors', require('./controllers/authors'));
app.use('/comments', require('./controllers/comments'));
app.use('/tags', require('./controllers/tags'));

// Route
app.get('/', (req, res) => res.render('home') );

app.get('*', (req, res) => res.render('error') );

// Listen
app.listen(3000, function() {
  console.log('You\'re listening to the smooth sounds of port 3000 in the morning');
});

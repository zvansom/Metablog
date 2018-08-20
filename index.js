// Requires
const express = require('express');

// Globals
const app = express();

// Set and use

// Route
app.get('/', (req, res) => {
  res.send('home');
});

// Listen
app.listen(3000, function() {
  console.log('You\'re listening to the smooth sounds of port 3000 in the morning');
});

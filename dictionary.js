const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const path = require('path');

const app = express();


const word = require('./word.js');

app.set('view engine', 'pug');
app.set('views', './views');


// for parsing application/json
app.use(express.json());

// for parsing application/xwww-
app.use(express.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, '/public')));

app.get('/', function (req, res) {
  return res.render("index_view");
});

app.get('/dict.html', function (req, res) {
  return res.render("index_view");
});

app.use('/api/word', word);
// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});

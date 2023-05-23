const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const app = express();


const word = require('./word.js');

app.set('view engine', 'pug');
app.set('views', './views');


// for parsing application/json
app.use(bodyParser.json());

// for parsing application/xwww-
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('public'));

app.get('/', function (req, res) {
    return res.render("index_view");
});

app.get('/dict.html', function (req, res) {
  return res.render("index_view");
});
/*
// Define the GET API route for searching a word in the dictionary
app.get('/api/dictionary', (req, res) => {
  const searchWord = req.query.word;

  // Perform the database query to search for the word
  const query = `SELECT * FROM entries WHERE word = ?`;
  connection.query(query, [searchWord], (error, results) => {
    if (error) {
      console.error('Error executing the query:', error);
      res.status(500).send('Internal Server Error');
      return;
    }

    // Handle the query results
    if (results.length === 0) {
      res.status(404).send('Word not found');
    } else {
      res.json(results[0]);
    }
  });
});
*/
app.use('/api/word', word);
// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});

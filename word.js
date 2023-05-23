const express = require('express');
const mysql = require('mysql');
const router = express.Router();


// MySQL connection configuration
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: "Don'tLogin@1",
    database: 'entries'
});

// Connect to the MySQL database
connection.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Connected to the database');
});


// Define the GET API route for searching a word in the dictionary
router.get('/', (req, res) => {
    const term = req.query.term;
  
    // Perform the database query to search for the word
    const query = `SELECT * FROM entries WHERE word = ?`;
    connection.query(query, [term], (error, results) => {
      if (error) {
        console.error('Error executing the query:', error);
        res.status(500).send('Internal Server Error');
        return;
      }
  
      // Handle the query results
      if (results.length === 0) {
        res.status(404).send('Word not found');
      } else {
        res.json(results);
      }
    });
  });

//export this router to use in our index.js
module.exports = router;
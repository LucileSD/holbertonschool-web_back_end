const express = require('express');
const countStudents = require('./3-read_file_async');

const db = process.argv[2];

const app = express();
const hostname = '127.0.0.1';
const port = 1245;

app.get('/', (req, res) => {
  res.send('Hello Holberton School!');
});

app.get('/students', (req, res) => {
  res.write('This is the list of our students\n');
  countStudents(db)
    .then((content) => {
      res.end(`${content.join('\n')}`);
    })
    .catch((err) => {
      res.end(err.toString());
    });
});

app.listen(port, hostname, () => {
  console.log(`Server running at port: ${port}`);
});

module.exports = app;

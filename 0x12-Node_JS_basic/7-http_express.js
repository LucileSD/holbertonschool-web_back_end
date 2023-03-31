const express = require('express');
const countStudents = require('./3-read_file_async');

const app = express();
const port = 1245;

app.get('/', (req, res) => {
  res.send('Hello Holberton School!');
});

app.get('/students', (req, res) => {
  countStudents(process.argv[2])
    .then((content) => {
      res.send(`This is the list of our students\n${content.join('\n')}`);
    })
    .catch((err) => {
      res.end(err.toString());
    });
});

app.listen(port, () => {
  console.log(`Server running at port: ${port}`);
});

module.exports = app;

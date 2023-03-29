const express = require('express');
const process = require('process');
const countStudents = require('./3-read_file_async');

const app = express();
const port = 1245;

app.get('/', (req, res) => {
  res.send('Hello Holberton School!');
});

app.get('/students', async (req, res) => {
  try {
    const content = await countStudents(process.argv[2]);
    res.send(`This is the list of our students\n${content.join('\n')}`);
  } catch (err) {
    res.end(err.message);
  }
});

app.listen(port, () => {
  console.log(`Server running at port: ${port}`);
});

exports.app = app;

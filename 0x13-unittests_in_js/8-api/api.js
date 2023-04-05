const express = require('express');

const app = express();
const hostname = 'localhost';
const port = 7865;

app.get('/', (req, res) => {
  res.send('Welcome to the payment system');
});

app.listen(port, hostname, () => {
  console.log(`API available on localhost port ${port}`);
});

module.exports = app;

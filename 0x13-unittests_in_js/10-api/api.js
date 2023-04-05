const express = require('express');

const app = express();
const bodyParser = require('body-parser');

const hostname = 'localhost';
const port = 7865;

app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Welcome to the payment system');
});

app.get('/cart/:id([0-9]+)', (req, res) => {
  const { id } = req.params;
  res.send(`Payment methods for cart ${id}`);
});

app.get('/available_payments', (req, res) => {
  const object = {
    payment_methods: {
      credit_cards: true,
      paypal: false,
    },
  };
  res.send(object);
});

app.post('/login', (req, res) => {
  const username = req.body.userName;
  res.send(`Welcome ${username}`);
});

app.listen(port, hostname, () => {
  console.log(`API available on localhost port ${port}`);
});

module.exports = app;

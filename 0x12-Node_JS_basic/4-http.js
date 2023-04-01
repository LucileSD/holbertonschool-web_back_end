const app = require('http');

const port = 1245;

const server = app.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Hello Holberton School!');
});

server.listen(port, () => {
});

module.exports = app;

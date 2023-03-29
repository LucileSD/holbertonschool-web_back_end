const app = require('http');
const process = require('process');
const countStudents = require('./3-read_file_async');

const hostname = '127.0.0.1';
const port = 1245;

const server = app.createServer(async (req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  if (req.url === '/') {
    res.end('Hello Holberton School!');
  } else if (req.url === '/students') {
    const content = await countStudents(process.argv[2]);
    res.end(`This is the list of our students\n${content.join('\n')}`);
  }
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

exports.app = app;

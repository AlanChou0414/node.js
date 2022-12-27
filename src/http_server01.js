// http is node.js default function;
const http = require('http');

// (request , response) can't change location;
const server = http.createServer((req, res) => {
  // status code 200
  res.writeHead(200, {
    'Content-Type': 'text/html',
  });

  // response done => write content to browser;
  res.end(`
        <h1>Hello</h1>
        <p>${req.url}</p>
    `);
});

// localhost:port
server.listen(3000);

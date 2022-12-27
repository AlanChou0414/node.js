// http is node.js default function;
const http = require('http');
// use promises api;
const fs = require('fs/promises');

// use async/await && promises to read file;
const server = http.createServer(async (req, res) => {
  // show require message;
  console.log('----------', req.url);
  res.writeHead(200, {
    'Content-Type': 'text/plain',
  });

  // read file function;
  const result = await fs.readFile(
    `${__dirname}/header01.txt`,
  );

  console.log(result.toString());
  res.end(result.toString());
});

// localhost:port
server.listen(3000);

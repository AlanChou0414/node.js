// http is node.js default function;
const http = require('http');
// use promises api;
const fs = require('fs/promises');

// use async/await && promises to create server;
const server = http.createServer(async (req, res) => {
    const error = await fs.writeFile(
        __dirname + '/header01.txt', JSON.stringify(req.headers, null, 4)
    );

    res.end(`
        <h2>result : ${error}</h2>
    `)
});


// localhost:port
server.listen(3000);
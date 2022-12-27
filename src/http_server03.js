// http is node.js default function;
const http = require('http');
// use promises api;
const fs = require('fs/promises');

// use async/await && promises to read file;
const server = http.createServer(async (req, res) => {

    //show require message;
    console.log(`----------`,req.url);

    //read file function;
    const result = await fs.readFile(
        __dirname + '/esm01.html'
    );

    console.log(result.toString())
    res.end(`
        <h2>result : ${result.toString()}</h2>
    `)
});


// localhost:port
server.listen(3000);
//import [dotenv] modules;
require('dotenv').config();

//import [express] modules;
const express = require('express');

//use express;
const app = express();

//set routes;
app.get('/', (req, res) => {
    res.send(`<h1>Hello</h1>`);

});

//import process.env config => PORT;
const port = process.env.PORT || 3001;

//listen => port;
app.listen(port, () => {
    console.log(`Server started : ${port}`);
});
//import [dotenv] modules and .env config;
require('dotenv').config();

//import [express] modules;
const express = require('express');

//use express;
const app = express();
//import ejs engine;
app.set('view engine','ejs');


//set routes;
/*
app.get('/', (req, res) => {
    res.send(`<h1>Hello</h1>`);
});
*/

//export .ejs object;
app.get('/', (req, res) => {
    res.render('main',{name:'Alan'});
});


/*---------------------------------
app.get('/a.html',(req,res) => {
    res.send(`<h1>false a.html</h1>`)
})
*/


//use express to import file ['public'];
//put last place
app.use(express.static('public'));


//set error routes; 
//any routes souled need to be this routes front;
//this routes [.use()] souled be any routes last;
app.use((req, res) => {
    res.type('text/plain');
    res.status(404).send(`404 ERROR!`);
});


//import process.env config => PORT;
const port = process.env.PORT || 3001;


//listen => port;
app.listen(port, () => {
    console.log(`Server started : ${port}`);
});
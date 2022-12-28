// import [dotenv] modules and .env config;
require('dotenv').config();

// import [express] modules;
const express = require('express');

// use express;
const app = express();
// import ejs engine;
app.set('view engine', 'ejs');

// set routes;
/*
app.get('/', (req, res) => {
    res.send(`<h1>Hello</h1>`);
});
*/

// export .ejs object;
app.get('/', (req, res) => {
  res.render('main', { name: 'Alan' });
});

// import /data/sales.json;
app.get('/json-sales', (req, res) => {
  // eslint-disable-next-line import/no-dynamic-require, global-require
  const data = require(`${__dirname}/data/sales.json`);

  console.log(data);

  // res.json(data);

  // output to [json-sales.ejs] {data}
  res.render('json-sales', { data });
});

// output object to json-sales2.ejs;
app.get('/json-sales2', (req, res) => {
  // eslint-disable-next-line import/no-dynamic-require, global-require
  const data = require(`${__dirname}/data/sales.json`);

  // create object function;
  const handleObj = {
    name_asc: {
      label: '姓名由小到大',
      sort: (a, b) => {},
    },
    name_desc: {
      label: '姓名由大到小',
      sort: (a, b) => {},
    },
    age_asc: {
      label: '年齡由小到大',
      sort: (a, b) => {},
    },
    age_desc: {
      label: '年齡由大到小',
      sort: (a, b) => {},
    },
  };

  res.render('json-sales2', { data, handleObj });
});

// req.query() get query string parameters;
app.get('/try-qs', (req, res) => {
  res.json(req.query);
});

/*---------------------------------
app.get('/a.html',(req,res) => {
    res.send(`<h1>false a.html</h1>`)
})
*/

// use express to import file ['public'];
// put last place
app.use(express.static('public'));

// set error routes;
// any routes souled need to be this routes front;
// this routes [.use()] souled be any routes last;
app.use((req, res) => {
  res.type('text/plain');
  res.status(404).send('404 ERROR!');
});

// import process.env config => PORT;
const port = process.env.PORT || 3001;

// listen => port;
app.listen(port, () => {
  console.log(`Server started : ${port}`);
});

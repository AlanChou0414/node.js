// Routes
// import [dotenv] modules and .env config;
require('dotenv').config();

// import [express] modules;
const express = require('express');
// import [multer] nodules;
const multer = require('multer');

const upload = multer({ dest: 'upload_tmp/' });

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
// Top-level Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// export .ejs object;
app.get('/', (req, res) => {
  res.render('main', { sayHello: 'Hello Alan, Nice to see you!' });
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
  const { orderby } = req.query;
  // create object function;
  const handleObj = {
    name_asc: {
      label: '姓名由小到大',
      sort: (a, b) => (a.name < b.name ? -1 : 1),
    },
    name_desc: {
      label: '姓名由大到小',
      sort: (a, b) => (a.name > b.name ? -1 : 1),
    },
    age_asc: {
      label: '年齡由小到大',
      sort: (a, b) => (a.age < b.age ? -1 : 1),
    },
    age_desc: {
      label: '年齡由大到小',
      sort: (a, b) => (a.age > b.age ? -1 : 1),
    },
  };
  // if get key => sort;
  if (handleObj[orderby]) {
    data.sort(handleObj[orderby].sort);
  }

  res.render('json-sales2', { data, orderby, handleObj });
});

// req.query() get query string parameters;
app.get('/try-qs', (req, res) => {
  res.json(req.query);
});

// post
// const urlencodedParser = express.urlencoded({ extended: false });
// const jsonParser = express.json();
app.post(['/try-post', '/try-post2'], (req, res) => {
  // body-parser
  res.json(req.body);
});

// export try-post-form form data
app.get('/try-post-form', (req, res) => {
  res.render('try-post-form');
});
app.post('/try-post-form', (req, res) => {
  // res.render(req.body);
  res.render('try-post-form', req.body);
});
// export upload
app.post('/try-post-form', upload.single('avatar'), (req, res) => {
  res.json(req.file);
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

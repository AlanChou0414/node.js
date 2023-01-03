// Routes
// import [dotenv] modules and .env config;
require('dotenv').config();

// import [express] modules;
const express = require('express');
// import [multer] modules;
// eslint-disable-next-line no-unused-vars
const multer = require('multer');
// import [express-session] modules;
const session = require('express-session');
// const upload = multer({ dest: 'upload_tmp/' });
// import [moment-timezone] modules;
const moment = require('moment-timezone');
// import [dayjs] modules;
const dayjs = require('dayjs');
const upload = require('./modules/upload-img');

const db = require('./modules/connect-mysql');
// use express;
const app = express();
// import ejs engine;
app.set('view engine', 'ejs');
app.use(require('cors')());

// set routes;
/*
app.get('/', (req, res) => {
    res.send(`<h1>Hello</h1>`);
});
*/
// Top-level Middleware
app.use(session({
  saveUninitialized: false,
  resave: false,
  secret: '92qjfioapjsidj29083r20qjfalr3q',
  cookie: {
    maxAge: 1200_000,
  },
}));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use((req, res, next) => {
  res.locals.title = 'node.js';

  //
  res.locals.toDateString = (d) => moment(d).format('YYYY-MM-DD');
  res.locals.toDateTimeString = (d) => moment(d).format('YYYY-MM-DD HH:mm:ss');
  next();
});

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
  res.locals.title = res.locals.title ? (`TEST - ${res.locals.title}`) : 'TEST';
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
app.post('/try-upload', upload.single('avatar'), (req, res) => {
  res.json(req.file);
});
app.post('/try-uploads', upload.array('photos'), (req, res) => {
  res.json(req.files);
});

// get router params;
app.get('/my-params1/:action?/:id?', (req, res) => {
  res.json(req.params);
});

// check phone number;
app.get(/\/m\/09\d{2}-?\d{3}-?\d{3}$/i, (req, res) => {
  let u = req.url.slice(3);
  // u = u.split('?')[0]; // query string;
  u = u.split('-').join('');
  res.send({ u });
});

// app.use(require('./routes/admin2'));
app.use('/admins', require('./routes/admin2'));

app.get('/try-sess', (req, res) => {
  req.session.my_var = req.session.my_var || 0;
  // eslint-disable-next-line no-plusplus
  req.session.my_var++;
  res.json({
    my_var: req.session.my_var,
    session: req.session,
  });
});

// moment & dayjs modules;
app.get('/try-moment', (req, res) => {
  const m1 = moment();
  const m1a = m1.format('YYYY/MM/DD');
  const m1b = m1.format('YYYY-MM-DD  HH:mm:ss');
  const m1c = m1.tz('Asia/Tokyo').format('YYYY-MM-DD  HH:mm:ss');

  res.json({
    m1a,
    m1b,
    m1c,
  });
});

app.get('/try-dayjs', (req, res) => {
  const d1 = dayjs();
  const d1a = d1.format('YYYY-MM-DD');

  res.json({
    d1a,
  });
});

// connect mySQL
app.get('/try-db', async (req, res) => {
  const [rows] = await db.query('SELECT * FROM categories');

  res.json(rows);
});

app.use('/address-book', require('./routes/address-book'));

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

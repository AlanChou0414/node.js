const express = require('express');
const db = require('../modules/connect-mysql');

const router = express.Router();

const getListData = async (req, res) => {
  const page = +req.query.page || 1; // User want to see the pages of the first
  if (page < 1) {
    // eslint-disable-next-line no-undef
    return res.redirect(req.baseUrl + trq.url); // Page steering
  }

  const perPage = 20;
  // eslint-disable-next-line camelcase
  const t_sql = 'SELECT COUNT(1) totalRows FROM address_book';
  const [[{ totalRows }]] = await db.query(t_sql);
  const totalPages = Math.ceil(totalRows / perPage);

  let rows = [];
  if (totalRows > 0) {
    if (page > totalPages) {
      return res.redirect(`?page=${totalPages}`); // Page to the last page
    }

    const sql = `SELECT * FROM address_book ORDER BY sid DESC LIMIT ${(page - 1) * perPage
    }, ${perPage}`;

    [rows] = await db.query(sql);
  }

  return {
    totalRows, totalPages, page, rows,
  };
};

router.get('/', async (req, res) => {
  const output = await getListData(req, res);
  res.render('ab-list', output);
});

router.get('/api', async (req, res) => {
  const output = await getListData(req, res);
  // for (let item of output.rows) {
  //   item.birthday2 = res.locals.toDateString(item.birthday);
  // item.birthday = res.locals.toDateString(item.birthday);
  // }
  // TODO: 用 output.rows.forEach() 再寫一次功能
  res.json(output);
});

router.get('/add', async (req, res) => {
  res.render('ab-add');
});
router.post('/add', async (req, res) => {
  res.send('ok');
  // res.render("ab-list", output);
});

module.exports = router;

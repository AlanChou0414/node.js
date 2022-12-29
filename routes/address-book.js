// Router modular;
const express = require('express');
const db = require('../modules/connect-mysql');

const router = express.Router();

// eslint-disable-next-line consistent-return
router.get('/', async (req, res) => {
  const page = +req.query.page || 1; // which pages does user looking at;

  if (page < 1) {
    return res.redirect(req.baseUrl);
  }

  const perPage = 20;
  const tSql = 'SELECT COUNT(1) totalRows FROM address_book';
  const [[{ totalRows }]] = await db.query(tSql);
  const totalPages = Math.ceil(totalRows / perPage);

  let rows = [];
  if (totalRows > 0) {
    if (page > totalPages) {
      return res.redirect(`?page=${totalPages}`);
    }
    const sql = `SELECT * FROM address_book ORDER BY sid DESC LIMIT ${(page - 1) * perPage},${perPage}`;
    [rows] = await db.query(sql);
  }

  res.json({
    totalRows, totalPages, page, rows,
  });
});

module.exports = router;

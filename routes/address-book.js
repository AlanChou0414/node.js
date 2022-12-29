// Router modular;
const express = require('express');
const db = require('../modules/connect-mysql');

const router = express.Router();

router.get('/', async (req, res) => {
  const page = +req.query.page || 1; // which pages does user looking at;

  const perPage = 20;
  const tSql = 'SELECT COUNT(1) totalRows FROM address_book';
  const [[{ totalRows }]] = await db.query(tSql);
  const totalPages = Math.ceil(totalRows / perPage);

  res.json({ totalRows, totalPages, page });
});

module.exports = router;

const express = require('express');
const moment = require('moment-timezone');
const db = require('../modules/connect-mysql');
const upload = require('../modules/upload-img');

const router = express.Router();

//
router.use((req, res, next) => {
  const { url, baseUrl, originalUrl } = req;

  res.locals = {
    ...res.locals, url, baseUrl, originalUrl,
  };

  next();
});

const getListData = async (req, res) => {
  const page = +req.query.page || 1; // 用戶要看第幾頁
  if (page < 1) {
    return res.redirect(req.baseUrl + trq.url); // 頁面轉向
  }

  let where = ' WHERE 1 ';

  const search = req.query.search || '';
  const orderby = req.query.orderby || '';
  if (search) {
    const esc_search = db.escape(`%${search}%`); // SQL 跳脫單引號, 避免 SQL injection
    console.log({ esc_search });
    where += ` AND (\`name\` LIKE ${esc_search} OR \`mobile\` LIKE ${esc_search}  OR \`address\` LIKE ${esc_search}) `;
  }
  let orderbySQL = ' ORDER BY sid ASC '; // 預設值
  // eslint-disable-next-line default-case
  switch (orderby) {
    case 'sid_desc':
      orderbySQL = ' ORDER BY sid DESC ';
      break;
    case 'birthday_asc':
      orderbySQL = ' ORDER BY birthday ASC ';
      break;
    case 'birthday_desc':
      // eslint-disable-next-line no-unused-vars
      orderbySQL = ' ORDER BY birthday DESC ';
      break;
  }

  const perPage = 20;
  const t_sql = `SELECT COUNT(1) totalRows FROM address_book ${where}`;
  const [[{ totalRows }]] = await db.query(t_sql);
  const totalPages = Math.ceil(totalRows / perPage);

  let rows = [];
  if (totalRows > 0) {
    if (page > totalPages) {
      return res.redirect(`?page=${totalPages}`); // 頁面轉向到最後一頁
    }

    const sql = `SELECT * FROM address_book ${where} ${orderbySQL} LIMIT ${(page - 1) * perPage
    }, ${perPage}`;

    [rows] = await db.query(sql);
  }

  return {
    totalRows, totalPages, page, rows,
  };
};

router.get('/add', async (req, res) => {
  res.render('ab-add');
});

router.post('/add', upload.none(), async (req, res) => {
  const output = {
    success: false,
    postData: req.body, // 除錯用
    code: 0,
    errors: {},
  };

  let {
    name, email, mobile, birthday, address,
  } = req.body;

  if (!name || name.length < 2) {
    output.errors.name = '請輸入正確的姓名';
    return res.json(output);
  }

  birthday = moment(birthday);
  birthday = birthday.isValid() ? birthday.format('YYYY-MM-DD') : null;

  // TODO: 資料檢查

  const sql = 'INSERT INTO `address_book`(`name`, `email`, `mobile`, `birthday`, `address`, `created_at`) VALUES (?, ?, ?, ?, ?, NOW())';

  const [result] = await db.query(sql, [
    name,
    email,
    mobile,
    birthday,
    address,
  ]);

  output.result = result;
  output.success = !!result.affectedRows;

  // affectedRows
  res.json(output);
});

router.get('/edit/:sid', async (req, res) => {
  const sid = +req.params.sid || 0;
  if (!sid) {
    return res.redirect(req.baseUrl); // 轉向到列表頁
  }

  const sql = 'SELECT * FROM address_book WHERE sid=?';
  const [rows] = await db.query(sql, [sid]);
  if (rows.length < 1) {
    return res.redirect(req.baseUrl); // 轉向
  }
  const row = rows[0];
  // res.json(row)

  // 從哪裡來
  const referer = req.get('Referer') || req.baseUrl;

  res.render('ab-edit', { ...row, referer });
});

router.put('/edit/:sid', upload.none(), async (req, res) => {
  const output = {
    success: false,
    postData: req.body, // 除錯用
    code: 0,
    errors: {},
  };

  const sid = +req.params.sid || 0;
  if (!sid) {
    output.errors.sid = '沒有資料編號';
    return res.json(output); // API 不要用轉向
  }

  let {
    name, email, mobile, birthday, address,
  } = req.body;

  if (!name || name.length < 2) {
    output.errors.name = '請輸入正確的姓名';
    return res.json(output);
  }

  birthday = moment(birthday);
  birthday = birthday.isValid() ? birthday.format('YYYY-MM-DD') : null;

  // TODO: 資料檢查

  const sql = 'UPDATE `address_book` SET `name`=?,`email`=?,`mobile`=?,`birthday`=?,`address`=? WHERE `sid`=? ';

  const [result] = await db.query(sql, [
    name,
    email,
    mobile,
    birthday,
    address,
    sid,
  ]);

  output.result = result;
  output.success = !!result.changedRows;

  res.json(output);
});

router.get('/', async (req, res) => {
  const output = await getListData(req, res);
  res.render('ab-list', output);
});

router.get('/api', async (req, res) => {
  const output = await getListData(req, res);
  for (const item of output.rows) {
    item.birthday2 = res.locals.toDateString(item.birthday);
    // item.birthday = res.locals.toDateString(item.birthday);
  }
  // TODO: 用 output.rows.forEach() 再寫一次功能
  res.json(output);
});

router.delete('/:sid', async (req, res) => {
  const output = {
    success: false,
    error: '',
  };

  const sid = +req.params.sid || 0;
  if (!sid) {
    output.error = '沒有 sid';
    return res.json(output);
  }

  const sql = 'DELETE FROM `address_book` WHERE sid=?';

  const [result] = await db.query(sql, [sid]);

  output.success = !!result.affectedRows;
  res.json(output);
});
module.exports = router;

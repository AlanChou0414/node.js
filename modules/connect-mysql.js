// import [mysql2] modules;
const mysql = require('mysql2');

// use createConnection() to connect mySQL;
const pool = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  port: 3301,
  database: 'mfee30',
  waitForConnections: true,
  connectionLimit: 5,
  queueLimit: 0,
});

module.exports = pool.promise();

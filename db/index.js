
const { Pool } = require('pg');

// 创建连接池
const pool = new Pool({
  host: '192.168.1.45',
  port: 5432,
  database: 'mydatabase',
  user: 'postgres',
  password: 'gaochong'
});

// 测试连接
pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error('数据库连接错误:', err.stack);
  } else {
    console.log('数据库连接成功:', res.rows[0]);
  }
});

module.exports = pool;
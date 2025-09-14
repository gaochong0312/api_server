const db = require('../db')
// 获取用户信息的处理函数
const sql = `select id, username, nickname, email from "user" where id=$1`
const getUserInfo = (req, res) => {
    db.query(sql, [req.auth.id], (err, results) => {
        if (err) return res.cc(err)
        if (results.rowCount !== 1) return res.cc('获取用户信息失败')
        res.send({
            status: 0,
            message: '获取用户信息成功',
            data: results.rows[0]
        })
    })
}
module.exports = {
    getUserInfo
}
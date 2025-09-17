const db = require('../db')
const { validationResult } = require('express-validator')


// 获取用户信息的处理函数
const sqlSelect = `select id, username, email from "user" where id=$1`
const getUserInfo = (req, res) => {
db.query(sqlSelect, [req.auth.id], (err, results) => {
        if (err) return res.cc(err)
        if (results.rowCount !== 1) return res.cc('获取用户信息失败')
        res.send({
            status: 0,
            message: '获取用户信息成功',
            data: results.rows[0]
        })
    })
}

const sqlUpdate = `update "user" set username=$1, email=$2 where id=$3`
const updateUserInfo = (req, res) => {
    // 检查验证结果
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.cc('数据验证失败: ' + errors.array()[0].msg)
    }
    
    db.query(sqlUpdate, [req.body.username, req.body.email, req.auth.id], (err, results) => { 
        if (err) return res.cc(err)
        if (results.rowCount !== 1) return res.cc('更新用户信息失败')
        res.cc('更新用户信息成功', 0)
    }) 
}

const sqlUpdatePwd = `update "user" set password=$1 where id=$2`
const updatePwd = (req, res) => {
    // 检查验证结果
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.cc('数据验证失败: ' + errors.array()[0].msg)
    }
    
    db.query(sqlUpdatePwd, [req.body.password, req.auth.id], (err, results) => {
        if (err) return res.cc(err)
        if (results.rowCount !== 1) return res.cc('更新密码失败')
        res.cc('更新密码成功', 0)
    })
}


module.exports = {
    getUserInfo,
    updateUserInfo,
    updatePwd
}
const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const db = require('../db')
const config = require('../config')

// 注册用户的处理函数
const regUser = (req, res) => {
    const userInfo = req.body
    if (!userInfo.username || !userInfo.password) {
        // 缺少用户名或者密码
        return res.cc('用户名或者密码不能为空')
    }
    const sql = `select * from "user" where username=$1`
    db.query(sql, [userInfo.username], (err, results) => {
        if (err) return res.cc(err)
        if (results.rowCount > 0) {
            return res.cc('用户名被占用，请更换其他用户名')
        }
        // TODO:用户名可用，继续后续处理
        // 用户名可用，对密码进行加密
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(userInfo.password, salt);

        // 插入新用户
        const insertSql = `insert into "user" (username, password, create_time) 
                      values ($1, $2, CURRENT_TIMESTAMP)`;

        db.query(insertSql, [userInfo.username, hashedPassword], (insertErr, insertResult) => {
            if (insertErr) {
                console.error('插入数据库错误:', insertErr);
                return res.cc('注册用户失败，请稍后再试')
            }

            // 检查是否成功插入一条记录
            if (insertResult.rowCount === 1) {
                res.cc('注册成功', 0)
            } else {
                res.cc('注册失败，请稍后重试', 500)
            }
        })

    })
}

// 登录的处理函数  
const login = (req, res) => {
    const userInfo = req.body
    const sql = `select * from "user" where username=$1`
    db.query(sql, [userInfo.username], (err, results) => {
        if (err) return res.cc(err)
        if (results.rowCount !== 1) return res.cc('登录失败，用户名不存在')
        const compareResult = bcrypt.compareSync(userInfo.password, results.rows[0].password)
        if (!compareResult) return res.cc('登录失败，密码错误')
        const user = { ...results.rows[0], password: '', user_pic: '' }
        // 确保用户对象包含必要的字段
        if (!user.id) {
            return res.cc('用户数据异常，缺少ID字段')
        }
        const tokenStr = jwt.sign(user, config.jwtSecretKey, { expiresIn: '10h' })
        res.send({
            status: 0,
            message: '登录成功',
            token: 'Bearer ' + tokenStr
        })
    })
}

module.exports = {
    regUser,
    login
}
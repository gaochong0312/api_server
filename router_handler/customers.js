const db = require('../db')

const sqlSelect = 'select * from customers'
const list = (req, res) => {
    db.query(sqlSelect, (err, result) => {
        if (err) return res.cc(err)
        if (result.rowCount === 0) return res.cc('暂无数据')
        res.send({
            status: 0,
            message: '获取用户列表成功',
            data: result.rows
        })
    })
}

const sqlInsert = 'insert into customers(name) values($1)'
const add = (req, res) => { 
    db.query(sqlInsert, [req.body.name], (err, result) => { 
        if (err) return res.cc(err)
        if (result.rowCount !== 1) return res.cc('添加用户失败')
        res.send({ 
            status: 0,
            message: '添加成功'
        })
    })
}
const sqlUpdate = 'update customers set name=$1 where id=$2'   
const update = (req, res) => {
    db.query(sqlUpdate, [req.body.name, req.body.id], (err, result) => {
        if (err) return res.cc(err)
        if (result.rowCount !== 1) return res.cc('更新用户失败')
        res.send({
            status: 0,
            message: '更新成功'
        })
    })
}

const sqlDelete = 'delete from customers where id=$1'
const del = (req, res) => {
    db.query(sqlDelete, req.params.id, (err, result) => {
        if (err) return res.cc(err)
        if (result.rowCount !== 1) return res.cc('删除用户失败')
        res.send({
            status: 0,
            message: '删除成功'
        })
    })
}

module.exports = {
    list,
    add,
    update,
    del
}
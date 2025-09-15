const express = require('express')
const router = express.Router()
const userHandler = require('../router_handler/user')
const { validationResult } = require('express-validator')

const { register_schema, login_schema } = require('../schema/user')

// 验证结果处理中间件
const handleValidationErrors = (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.cc(errors.array()[0].msg, 400)
    }
    next()
}

router.post('/reguser', register_schema, handleValidationErrors, userHandler.regUser)

router.post('/login', login_schema, handleValidationErrors, userHandler.login)

module.exports = router
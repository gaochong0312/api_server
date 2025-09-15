const { body } = require('express-validator')

const register_schema = [
  body('username')
    .isAlphanumeric()
    .isLength({ min: 3, max: 10 })
    .withMessage('用户名必须是3-10位字母数字组合'),
  body('password')
    .matches(/^[\S]{6,12}$/)
    .withMessage('密码必须是6-12位非空白字符')
]

const login_schema = [
  body('username')
    .isAlphanumeric()
    .isLength({ min: 3, max: 10 })
    .withMessage('用户名必须是3-10位字母数字组合'),
  body('password')
    .matches(/^[\S]{6,12}$/)
    .withMessage('密码必须是6-12位非空白字符')
]

module.exports = { register_schema, login_schema }

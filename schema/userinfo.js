const { body } = require('express-validator')

const updateUserInfo_schema = [
    body('username')
        .isAlphanumeric()
        .isLength({ min: 3, max: 10 })
        .withMessage('用户名必须是3-10位的字母数字组合'),
    body('email')
        .isEmail()
        .withMessage('邮箱格式不正确')
]

const updatePwd_schema = [
    body('oldPwd')
        .matches(/^[\S]{6,12}$/)
        .withMessage('原密码必须是6-12位的非空白字符'),
    body('newPwd')
        .matches(/^[\S]{6,12}$/)
        .withMessage('新密码必须是6-12位的非空白字符')
]

module.exports = { updateUserInfo_schema, updatePwd_schema }
const { body } = require('express-validator')
const add_schema = [
    body('name')
        .notEmpty()
        .withMessage('用户名不能为空')
]
module.exports = { add_schema }
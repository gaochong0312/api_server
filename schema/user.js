const jio = require('@hapi/joi')
const username = jio.string().alphanum().min(3).max(30).required()
const password = jio.string().pattern(/^[\S]{6,12}$/).required()

exports.reg_log_schema = {
    body: {
        username,
        password
    },
}
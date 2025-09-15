const Joi = require('joi')

const updateUserInfo_schema = {
    body: Joi.object({
        username: Joi.string().alphanum().min(3).max(10).required(),
        email: Joi.string().email().required()
    })
}

const updatePwd_schema = {
    body: Joi.object({
        oldPwd: Joi.string().pattern(/^[\S]{6,12}$/).required(),
        newPwd: Joi.string().pattern(/^[\S]{6,12}$/).required()
    })
}

module.exports = { updateUserInfo_schema, updatePwd_schema }
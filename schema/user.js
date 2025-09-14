const Joi = require('joi')
const register_schema = {
  body: Joi.object({
    username: Joi.string().alphanum().min(3).max(10).required(),
    password: Joi.string().pattern(/^[\S]{6,12}$/).required()
  })
}
const login_schema = {
  body: Joi.object({
    username: Joi.string().alphanum().min(3).max(10).required(),
    password: Joi.string().pattern(/^[\S]{6,12}$/).required()
  })
}
module.exports = { register_schema }
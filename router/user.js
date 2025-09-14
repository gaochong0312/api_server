const express = require('express')
const router = express.Router()
const userHandler = require('../router_handler/user')

const Joi = require('joi')
const { register_schema } = require('../schema/user')

router.post('/reguser',(req,res,next)=>{
    const { error } = register_schema.body.validate(req.body)
    if (error) {
      return res.cc(error.details[0].message,400)
    }
    next()
}, userHandler.regUser)

router.post('/login',(req,res,next)=>{
    const { error } = register_schema.body.validate(req.body)
    if (error) {
      return res.cc(error.details[0].message,400)
    }
    next()
}, userHandler.login)

module.exports = router
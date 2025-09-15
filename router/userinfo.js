const express = require('express')
const router = express.Router()
const userinfoHandler = require('../router_handler/userinfo')

const { updateUserInfo_schema, updatePwd_schema } = require('../schema/userinfo')

router.get('/userinfo', userinfoHandler.getUserInfo)

router.post('/userinfo', (req, res, next) => {
    const { error } = updateUserInfo_schema.body.validate(req.body)
    if (error) {
        return res.cc(error.details[0].message, 400)
    }
    next()
}, userinfoHandler.updateUserInfo)

router.post('/updatepwd', (req, res, next) => {
    const { error } = updatePwd_schema.body.validate(req.body)
    if (error) {
        return res.cc(error.details[0].message, 400)
    }
    next()
}, userinfoHandler.updatePwd)

module.exports = router
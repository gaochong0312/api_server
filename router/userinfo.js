const express = require('express')
const router = express.Router()
const userinfoHandler = require('../router_handler/userinfo')

const { updateUserInfo_schema, updatePwd_schema } = require('../schema/userinfo')

router.get('/userinfo', userinfoHandler.getUserInfo)

router.post('/userinfo', updateUserInfo_schema, userinfoHandler.updateUserInfo)

router.post('/updatepwd', updatePwd_schema, userinfoHandler.updatePwd)

module.exports = router
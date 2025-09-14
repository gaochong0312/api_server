const express = require('express')
const router = express.Router()
const userinfoHandler = require('../router_handler/userinfo')
router.get('/userinfo', (req, res, next) => {
    next()
}, userinfoHandler.getUserInfo)

module.exports = router
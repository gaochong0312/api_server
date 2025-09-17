const express = require('express')
const router = express.Router()
const { validationResult } = require('express-validator')
const { add_schema } = require('../schema/customers')

const handleValidationErrors = (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.cc(errors.array()[0].msg, 400)
    }
    next()
}

router.post('/add', add_schema, handleValidationErrors, (req, res) => {

})

module.exports = router
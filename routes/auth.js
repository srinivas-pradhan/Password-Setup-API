const express = require('express')
const router = express.Router()

const {
    LoginUser
} = require('../controllers/auth')

router.route('/').post(LoginUser)

module.exports = router

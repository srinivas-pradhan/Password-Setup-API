const express = require('express')
const router = express.Router()

const {
    login
} = require('../controllers/auth')

const JwtVerify = require('../middleware/verifyToken')
router.route('/').post(login)

module.exports = router

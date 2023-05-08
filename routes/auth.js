const express = require('express')
const router = express.Router()

const {
    login
} = require('../controllers/auth')


router.route('/').post(login)

module.exports = router

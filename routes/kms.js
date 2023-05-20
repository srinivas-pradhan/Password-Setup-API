const express = require('express')
const router = express.Router()

const {
    CreateMRKey,
    ShareMRKeyByAccountNumber,
    GetMRKeyByAccountNumber
} = require('../controllers/kms')

const JwtVerify = require('../middleware/verifyToken')
const JwtAuthorize = require('../middleware/verifyAuthorization')

router.route('/').post(JwtVerify, JwtAuthorize, CreateMRKey)

router
  .route('/:id')
  .get(JwtVerify, JwtAuthorize, GetMRKeyByAccountNumber)
  .post(JwtVerify, JwtAuthorize, ShareMRKeyByAccountNumber)

module.exports = router

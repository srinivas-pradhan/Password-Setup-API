const express = require('express')
const router = express.Router()

const {
    CreateSecret,
    UpdateSecret,
    DeleteSecret,
    GetSecrets,
    GetOneSecret
} = require('../controllers/secrets')

const JwtVerify = require('../middleware/verifyToken')
const JwtAuthorize = require('../middleware/verifyAuthorization')

router.route('/').post(JwtVerify, JwtAuthorize, CreateSecret).get(JwtVerify, JwtAuthorize, GetSecrets)

router
  .route('/:id')
  .get(JwtVerify, JwtAuthorize, GetOneSecret)
  .delete(JwtVerify, JwtAuthorize, DeleteSecret)
  .patch(JwtVerify, JwtAuthorize, UpdateSecret)

module.exports = router

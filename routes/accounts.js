const express = require('express')
const router = express.Router()

const {
    SetupAccount,
    UpdateAccount,
    DeleteAccount,
    GetAllAccounts,
    GetOneAccountByNumber,
} = require('../controllers/accounts')

const JwtVerify = require('../middleware/verifyToken')
const JwtAuthorize = require('../middleware/verifyAuthorization')

router.route('/').post(JwtVerify, JwtAuthorize, SetupAccount).get(JwtVerify, JwtAuthorize, GetAllAccounts)

router
  .route('/:id')
  .get(JwtVerify, JwtAuthorize, GetOneAccountByNumber)
  .delete(JwtVerify, JwtAuthorize, DeleteAccount)
  .patch(JwtVerify, JwtAuthorize, UpdateAccount)

module.exports = router

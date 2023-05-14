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

router.route('/').post(JwtVerify, JwtAuthorize, SetupAccount).get(JwtVerify, GetAllAccounts)

router
  .route('/:id')
  .get(JwtVerify, GetOneAccountByNumber)
  .delete(JwtVerify, DeleteAccount)
  .patch(JwtVerify, UpdateAccount)

module.exports = router

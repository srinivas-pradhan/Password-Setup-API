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

router.route('/').post(JwtVerify, SetupAccount).get(JwtVerify, GetAllAccounts)

router
  .route('/:id')
  .get(JwtVerify, GetOneAccountByNumber)
  .delete(DeleteAccount)
  .patch(JwtVerify, UpdateAccount)

module.exports = router

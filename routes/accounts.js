const express = require('express')
const router = express.Router()

const {
    SetupAccount,
    UpdateAccount,
    DeleteAccount,
    GetAllAccounts,
    GetOneAccount
} = require('../controllers/accounts')

const JwtVerify = require('../middleware/verifyToken')

router.route('/').post(JwtVerify, SetupAccount).get(GetAllAccounts)

router
  .route('/:id')
  .get(GetOneAccount)
  .delete(DeleteAccount)
  .patch(UpdateAccount)

module.exports = router

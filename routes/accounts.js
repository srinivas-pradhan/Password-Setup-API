const express = require('express')
const router = express.Router()

const {
    SetupAccount,
    UpdateAccount,
    DeleteAccount,
    GetAllAccounts,
    GetOneAccount
} = require('../controllers/accounts')

router.route('/').post(SetupAccount).get(GetAllAccounts)

router
  .route('/:id')
  .get(GetOneAccount)
  .delete(DeleteAccount)
  .patch(UpdateAccount)

module.exports = router

const express = require('express')
const router = express.Router()

const {
    CreateSecret,
    UpdateSecret,
    DeleteSecret,
    GetSecrets,
    GetOneSecret
} = require('../controllers/secrets')

router.route('/').post(CreateSecret).get(GetSecrets)

router
  .route('/:id')
  .get(GetOneSecret)
  .delete(DeleteSecret)
  .patch(UpdateSecret)

module.exports = router

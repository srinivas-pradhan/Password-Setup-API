const express = require('express')
const router = express.Router()

const {
    CreateMRKey,
    UpdateMRKey,
    DeleteMRKey,
    GetMRKey,
    GetRegionalKey
} = require('../controllers/kms')

//const JwtVerify = require('../middleware/verifyToken')

router.route('/').post(CreateMRKey).get(GetMRKey)

router
  .route('/:id')
  .get(GetRegionalKey) // Still need to think this thru.
  .delete(DeleteMRKey)
  .patch(UpdateMRKey)

module.exports = router

const express = require('express')
const router = express.Router()

const {
    CreateMRKey,
    UpdateMRKey,
    DeleteMRKey,
    GetMRKey,
    GetRegionalKey
} = require('../controllers/kms')

const JwtVerify = require('../middleware/verifyToken')
const JwtAuthorize = require('../middleware/verifyAuthorization')

router.route('/').post(JwtVerify, JwtAuthorize, CreateMRKey).get(JwtVerify, JwtAuthorize, GetMRKey)

router
  .route('/:id')
  .get(JwtVerify, JwtAuthorize, GetRegionalKey) // Still need to think this thru.
  .delete(JwtVerify, JwtAuthorize, DeleteMRKey)
  .patch(JwtVerify, JwtAuthorize, UpdateMRKey)

module.exports = router

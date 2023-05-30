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
const GetCognitoGroups = require('../middleware/GetCognitoGroups')

router.route('/').post(JwtVerify, JwtAuthorize, CreateSecret)

router.route('/:CognitoGroup').get(JwtVerify, JwtAuthorize, GetCognitoGroups, GetSecrets)

router
  .route('/:Account/:Region/:SecretName')
  .get(JwtVerify, JwtAuthorize, GetCognitoGroups, GetOneSecret)
  .delete(JwtVerify, JwtAuthorize, GetCognitoGroups, DeleteSecret)
  .patch(JwtVerify, JwtAuthorize, GetCognitoGroups, UpdateSecret)

module.exports = router

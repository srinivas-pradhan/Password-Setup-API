const { StatusCodes } = require('http-status-codes')
const AccountStore = require('../models/AWSAccounts')
const SecretsStore = require('../models/SecretStore')
const GetKeyDetails = require('../utils/kms_get_mr_key')
const AssumeRole = require('../utils/assume_role')
const Secret = require('../utils/create_secret')


const CreateSecret  = async ( req, res ) => {
    if (res.locals.authenticated && (res.locals.authorized || res.locals.auth_user)) {
        try {
            const Acc = await AccountStore.findOne({ AccountNumber: req.body.AccountNumber })
            if (!res.locals.valid_group) {
                res.status(StatusCodes.NOT_ACCEPTABLE).json({ error: `The user is not authorized to upload secrets to ${req.body.Cognito_group} group.` })
                return
            }
            if (!Acc.SupportedRegions.includes(req.body.Region)) {
                res.status(StatusCodes.NOT_ACCEPTABLE).json({ error: `${req.body.Region} is not supported in ${req.body.AccountNumber}` })
                return
            }
            if (!Acc.IAMRole) {
                res.status(StatusCodes.FAILED_DEPENDENCY).json({ error: `Please setup IAMRole for ${req.body.AccountNumber}.` })
                return
            }
            if (!Acc.KMSKey) {
                res.status(StatusCodes.FAILED_DEPENDENCY).json({ error: `Please setup KMSKey for ${req.body.AccountNumber}.` })
                return
            }
            const STSession = await AssumeRole(Acc.IAMRole)
            MRKey = await GetKeyDetails({
                accessKeyId: STSession.Credentials.AccessKeyId,
                secretAccessKey: STSession.Credentials.SecretAccessKey,
                sessionToken: STSession.Credentials.SessionToken
            }, Acc.KMSKey)
            if (!MRKey.KeyMetadata.Enabled) {
                res.status(StatusCodes.NOT_ACCEPTABLE).json({ error: `KMSKey for ${req.body.AccountNumber} is DISABLED.` })
                return
            }
            SMSecret = await Secret({
                accessKeyId: STSession.Credentials.AccessKeyId,
                secretAccessKey: STSession.Credentials.SecretAccessKey,
                sessionToken: STSession.Credentials.SessionToken
            },  req.body.SecretName, Acc.KMSKey, req.body.SecretString, req.body.Desc, req.body.AWSTags)
            res.status(StatusCodes.CREATED).json({ msg: req.body })
        } catch (error) {
            res.status(StatusCodes.BAD_REQUEST).json({ error: error.name, message: error.message })
        }
    }
    else{
        res.status(StatusCodes.UNAUTHORIZED).json({ error: 'Invalid Bearer Token and/or Check Authorization' })
    }
}

const UpdateSecret = ( req, res ) => {
    res.status(StatusCodes.OK).json({ msg: req.body })
}

const DeleteSecret = ( req, res ) => {
    res.status(StatusCodes.OK).json({ msg: req.body })
}

const GetSecrets = ( req, res ) => {
    console.log(res.locals.authorized)
    console.log(res.locals.auth_user)
    res.status(StatusCodes.OK).json({ msg: req.body })
}

const GetOneSecret = ( req, res ) => {
    res.status(StatusCodes.OK).json({ msg: req.body })
}

module.exports = {
    CreateSecret,
    UpdateSecret,
    DeleteSecret,
    GetSecrets,
    GetOneSecret
  }

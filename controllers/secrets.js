const { StatusCodes } = require('http-status-codes')
const AccountStore = require('../models/AWSAccounts')
const SecretsStore = require('../models/SecretStore')
const GetKeyDetails = require('../utils/kms_get_mr_key')



const CreateSecret  = async ( req, res ) => {
    if (res.locals.authenticated && (res.locals.authorized || res.locals.auth_user)) {
        try {
            const Acc = await AccountStore.findOne({ AccountNumber: req.body.AccountNumber })
            console.log(Acc)
            switch (res.locals.valid_group) {
                //Check cases here
                case (!Acc.SupportedRegions.includes(req.body.Region)):
                    res.status(StatusCodes.NOT_ACCEPTABLE).json({ error: `${req.body.Region} is not supported in ${req.body.AccountNumber}` })
                    break;
                case !(Acc.IAMRole && Acc.KMSKey):
                    res.status(StatusCodes.FAILED_DEPENDENCY).json({ error: `${req.body.AccountNumber} setup is not complete yet.` })
                    break;
                case true:
                    res.status(StatusCodes.CREATED).json({ msg: req.body })
                    break;
                default:
                    res.status(StatusCodes.NOT_ACCEPTABLE).json({ error: `The user is not authorized to upload secrets to ${req.body.Cognito_group} group.` })
                    break;
            }
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

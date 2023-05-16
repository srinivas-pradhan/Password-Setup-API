const { StatusCodes } = require('http-status-codes')
const AssumeRole = require('../utils/assume_role')
const AccountStore = require('../models/AWSAccounts')
const CreateKMS = require('../utils/create_kms')


const CreateMRKey  = async ( req, res ) => {
    if (res.locals.authenticated && res.locals.authorized) {
        try {
            const Acc = await AccountStore.findOne({ AccountNumber: req.body.AccountNumber })
            if (Acc.IAMRole && ! Acc.KMSKey){
                let STSession = await AssumeRole(Acc.IAMRole)
                const KeyCreate = await CreateKMS({
                    accessKeyId: STSession.Credentials.AccessKeyId,
                    secretAccessKey: STSession.Credentials.SecretAccessKey,
                    sessionToken: STSession.Credentials.SessionToken
                })
                Acc.KMSKey = KeyCreate.KeyMetadata.KeyId
                const AccUpdateKMSKey = await AccountStore.findOneAndUpdate({ AccountNumber: req.body.AccountNumber }, Acc, {    
                    new: true,
                    runValidators: true              
                })
                res.status(StatusCodes.OK).json({
                    "KeyArn": KeyCreate.KeyMetadata.Arn,
                    "KeyId": KeyCreate.KeyMetadata.KeyId,
                    "ReplicaKeys": KeyCreate.KeyMetadata.MultiRegionConfiguration.ReplicaKeys
                })
            }
            else {
                res.status(StatusCodes.EXPECTATION_FAILED).json({ error: `Please setup an IAM Role for the AWS Account ${Acc.AccountNumber} and/or Check if KMS Key is already setup for the account.`})
            }
        } catch (error) {
            res.status(StatusCodes.BAD_REQUEST).json({ error: error.name, message: error.message })
        }

    } else {
        res.status(StatusCodes.UNAUTHORIZED).json({ error: 'Invalid Bearer Token and/or Check Authorization'})
    }
}

const UpdateMRKey = ( req, res ) => {
    if (res.locals.authenticated && res.locals.authorized) {
        try {
            console.log("Hello")
        } catch (error) {
            console.log("Hello Error")
        }

    } else {
        console.log("Hello Error 1")
    }
    res.status(StatusCodes.OK).json({ msg: req.params })
}

const DeleteMRKey = ( req, res ) => {
    if (res.locals.authenticated && res.locals.authorized) {
        try {
            console.log("Hello")
        } catch (error) {
            console.log("Hello Error")
        }

    } else {
        console.log("Hello Error 1")
    }
    res.status(StatusCodes.OK).json({ msg: req.params })
}

const GetMRKey = ( req, res ) => {
    if (res.locals.authenticated && res.locals.authorized) {
        try {
            console.log("Hello")
        } catch (error) {
            console.log("Hello Error")
        }

    } else {
        console.log("Hello Error 1")
    }
    res.status(StatusCodes.OK).json({ msg: req.body })
}

const GetRegionalKey = ( req, res ) => {
    if (res.locals.authenticated && res.locals.authorized) {
        try {
            console.log("Hello")
        } catch (error) {
            console.log("Hello Error")
        }

    } else {
        console.log("Hello Error 1")
    }
    res.status(StatusCodes.OK).json({ msg: req.params })
}

module.exports = {
    CreateMRKey,
    UpdateMRKey,
    DeleteMRKey,
    GetMRKey,
    GetRegionalKey
  }

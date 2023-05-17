const { StatusCodes } = require('http-status-codes')
const AssumeRole = require('../utils/assume_role')
const AccountStore = require('../models/AWSAccounts')
const CreateKMS = require('../utils/create_kms')
const ShareKey = require('../utils/kms_share_key_regionally')


const CreateMRKey  = async ( req, res ) => {
    if (res.locals.authenticated && res.locals.authorized) {
        try {
            const Acc = await AccountStore.findOne({ AccountNumber: req.body.AccountNumber })
            if (Acc.IAMRole && ! Acc.KMSKey){
                const STSession = await AssumeRole(Acc.IAMRole)
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
// Add one more route -> /api/v1/kms/region_id/account_id (POST not PATCH) 
const ShareMRKeyByAccountNumber = async ( req, res ) => {
    if (res.locals.authenticated && res.locals.authorized) {
        try {
            let regionalKeys = new Map()
            const { id: AccountID } = req.params
            const Acc = await AccountStore.findOne({ AccountNumber: AccountID })
            if (Acc.IAMRole && Acc.KMSKey){
                // TODO ONCE NEW KEY IS CREATED USE HERE
                // const STSession = await AssumeRole(Acc.IAMRole)
                for (let i=0; i < Acc.SupportedRegions.length; i++){
                    // const RegionalKey = await ShareKey({
                    //     accessKeyId: STSession.Credentials.AccessKeyId,
                    //     secretAccessKey: STSession.Credentials.SecretAccessKey,
                    //     sessionToken: STSession.Credentials.SessionToken
                    // }, Acc.KMSKey, Acc.SupportedRegions[i])
                    // regionalKeys.set(Acc.SupportedRegions[i], 'REGIONAL KEY HERE')
                }
            }
        } catch (error) {
            res.status(StatusCodes.UNAUTHORIZED).json({ error: 'Invalid Bearer Token and/or Check Authorization'})
        }
    } else {
        console.log("Hello Error 1")
    }
    res.status(StatusCodes.OK).json({ msg: req.params })
}

// const DeleteMRKey = ( req, res ) => {
//     if (res.locals.authenticated && res.locals.authorized) {
//         try {
//             console.log("Hello")
//         } catch (error) {
//             console.log("Hello Error")
//         }

//     } else {
//         console.log("Hello Error 1")
//     }
//     res.status(StatusCodes.OK).json({ msg: req.params })
// }

const GetMRKeyByAccountNumber = ( req, res ) => {
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
    ShareMRKeyByAccountNumber,
    GetMRKeyByAccountNumber
  }

const { StatusCodes } = require('http-status-codes')
const AccountStore = require('../models/AWSAccounts')

const SetupAccount  = async ( req, res ) => {
    if (res.locals.authenticated && res.locals.authorized) {
        try {
            req.body.Created_by = res.locals.email
            const Acc = await AccountStore.create(req.body)
            res.status(StatusCodes.CREATED).json({
                "AccountType": Acc.AccountType,
                "SupportedRegions": Acc.SupportedRegions,
                "AccountNumber": Acc.AccountNumber,
                "KMSKey": Acc.KMSKey,
                "IAMRole": Acc.IAMRole,
                "Created_by": Acc.Created_by
            })
        } catch (error) {
            if (error.name === "MongoError") {
                res.status(StatusCodes.BAD_REQUEST).json(
                    { error: "DuplicateKeyError", 
                    message: `Account Number ${req.body.AccountNumber} already exists.` 
                })
            }
            else if (error.name === "ValidationError") {
                res.status(StatusCodes.BAD_REQUEST).json(
                    { error: "InputParamsError", 
                    message: `Required Paramters : "AccountNumber" is not defined and/or is not defined correctly.` 
                })
            }
            else {
                res.status(StatusCodes.BAD_REQUEST).json({ error: error.name, message: error.message })
            }
        }
    } else {
        res.status(StatusCodes.UNAUTHORIZED).json({ error: 'Invalid Bearer Token and/or Check Authorization' })
    }
}

const UpdateAccount  = async ( req, res ) => {
    if (res.locals.authenticated && res.locals.authorized) {
        try {
            const { id: AccountID } = req.params
            if (req.body.SupportedRegions){
                const FindAcc = await AccountStore.findOne({ AccountNumber: AccountID })
                let regions = [...new Set([...FindAcc.SupportedRegions, ...req.body.SupportedRegions])]
                req.body.SupportedRegions = regions
            }
            const Acc = await AccountStore.findOneAndUpdate({ AccountNumber: AccountID }, req.body, {    
                new: true,
                runValidators: true              
            })
            if (Acc) {
                res.status(StatusCodes.OK).json({
                    "AccountType": Acc.AccountType,
                    "SupportedRegions": Acc.SupportedRegions,
                    "AccountNumber": Acc.AccountNumber,
                    "KMSKey": Acc.KMSKey,
                    "IAMRole": Acc.IAMRole,
                    "Created_by": Acc.Created_by
                }) 
            }
            else {
                res.status(StatusCodes.BAD_REQUEST).json({ error: `Account ID ${AccountID} not setup yet.`})
            }
        } catch (error) {
            if (error.name === "CastError") {
                res.status(StatusCodes.BAD_REQUEST).json(
                    { error: "CastError", 
                    message: `Expected Path Parameter Value - AWS Account Number` 
                })
            }
            else {
                res.status(StatusCodes.BAD_REQUEST).json({ error: error.name, message: error.message })

            }
        }

    } else {
        res.status(StatusCodes.UNAUTHORIZED).json({ error: 'Invalid Bearer Token and/or Check Authorization' })
    }
}
// Add calls to Schedule KMS Key Deletion
const DeleteAccount  = async ( req, res ) => {
    if (res.locals.authenticated && res.locals.authorized) {
        try {
            const { id: AccountID } = req.params
            const Acc = await AccountStore.findOneAndDelete({ AccountNumber: AccountID }) 
            if (!Acc) {
                res.status(StatusCodes.NOT_FOUND).json({ error: `Account ID ${AccountID} not setup yet.`})
            }
            else {
                res.status(StatusCodes.NO_CONTENT).send()
            }
        }
        catch (error) {
            if (error.name === "CastError") {
                res.status(StatusCodes.BAD_REQUEST).json(
                    { error: "CastError", 
                    message: `Expected Path Parameter Value - AWS Account Number` 
                })
            }
            else {
                res.status(StatusCodes.BAD_REQUEST).json({ error: error.name, message: error.message })
            }
        }
    }
    else {
        res.status(StatusCodes.UNAUTHORIZED).json({ error: 'Invalid Bearer Token and/or Check Authorization'})
    }
}

const GetAllAccounts  = async ( req, res ) => {
    if (res.locals.authenticated && res.locals.authorized) {
        const Acc = await AccountStore.find({})
        var result = []
        for (let i=0; i < Acc.length; i++){
            result.push({
                "AccountType": Acc[i].AccountType,
                "SupportedRegions": Acc[i].SupportedRegions,
                "AccountNumber": Acc[i].AccountNumber,
                "KMSKey": Acc[i].KMSKey,
                "IAMRole": Acc[i].IAMRole,
                "Created_by": Acc[i].Created_by
            })
        }
        res.status(StatusCodes.OK).json(result)

    } else {
        res.status(StatusCodes.UNAUTHORIZED).json({ error: 'Invalid Bearer Token and/or Check Authorization'})
    }
}

const GetOneAccountByNumber  = async ( req, res ) => {
    if (res.locals.authenticated && res.locals.authorized   ) {
        try {
            const { id: AccountID } = req.params
            const Acc = await AccountStore.findOne({ AccountNumber: AccountID })
            if(Acc) {
                res.status(StatusCodes.OK).json({
                    "AccountType": Acc.AccountType,
                    "SupportedRegions": Acc.SupportedRegions,
                    "AccountNumber": Acc.AccountNumber,
                    "KMSKey": Acc.KMSKey,
                    "IAMRole": Acc.IAMRole,
                    "Created_by": Acc.Created_by
                })
            } else {
                res.status(StatusCodes.NO_CONTENT).send()
            }
        } catch (error) {
            if (error.name === "CastError") {
                res.status(StatusCodes.BAD_REQUEST).json(
                    { error: "CastError", 
                    message: `Expected Path Parameter Value - AWS Account Number` 
                })
            }
            
            else {
                res.status(StatusCodes.BAD_REQUEST).json({ error: error.name, message: error.message })
            }
        }   
    } else {
        res.status(StatusCodes.UNAUTHORIZED).json({ error: 'Invalid Bearer Token and/or Check Authorization'})
    }
}
module.exports = {
    SetupAccount,
    UpdateAccount,
    DeleteAccount,
    GetAllAccounts,
    GetOneAccountByNumber
}

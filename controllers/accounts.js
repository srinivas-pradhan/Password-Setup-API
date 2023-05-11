const { StatusCodes } = require('http-status-codes')
const AccountStore = require('../models/AWSAccounts')

const SetupAccount  = async ( req, res ) => {
    if (res.locals.authenticated) {
        try {
            const Acc = await AccountStore.create(req.body)
            res.status(StatusCodes.CREATED).json({
                "AccountType": Acc.AccountType,
                "DefaultRegion": Acc.DefaultRegion,
                "AccountNumber": Acc.AccountNumber
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
        res.status(StatusCodes.UNAUTHORIZED).json({'error': 'Invalid Bearer Token'})
    }
}

const UpdateAccount  = async ( req, res ) => {
    if (res.locals.authenticated) {
        try {
            const { id: AccountID } = req.params
            const Acc = await AccountStore.findOneAndUpdate({ AccountNumber: AccountID }, req.body, {
                new: true,
                runValidators: true,
              })
            if (Acc) {
                res.status(StatusCodes.OK).json({
                    "AccountType": Acc.AccountType,
                    "DefaultRegion": Acc.DefaultRegion,
                    "AccountNumber": Acc.AccountNumber
                }) 
            }
            else {
                res.status(StatusCodes.BAD_REQUEST).json({"error": `Account ID ${AccountID} not setup yet.`})
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
        res.status(StatusCodes.UNAUTHORIZED).json({'error': 'Invalid Bearer Token'})
    }
}

const DeleteAccount  = ( req, res ) => {
    res.status(StatusCodes.OK).json({ msg: req.body });
}

const GetAllAccounts  = async ( req, res ) => {
    if (res.locals.authenticated) {
        const Acc = await AccountStore.find({})
        var result = []
        for (let i=0; i < Acc.length; i++){
            result.push({
                "AccountType": Acc[i].AccountType,
                "DefaultRegion": Acc[i].DefaultRegion,
                "AccountNumber": Acc[i].AccountNumber
            })
        }
        res.status(StatusCodes.OK).json(result)

    } else {
        res.status(StatusCodes.UNAUTHORIZED).json({'error': 'Invalid Bearer Token'})
    }
}

const GetOneAccountByNumber  = async ( req, res ) => {
    if (res.locals.authenticated) {
        try {
            const { id: AccountID } = req.params
            const Acc = await AccountStore.findOne({ AccountNumber: AccountID })
            if(Acc) {
                res.status(StatusCodes.OK).json({
                    "AccountType": Acc.AccountType,
                    "DefaultRegion": Acc.DefaultRegion,
                    "AccountNumber": Acc.AccountNumber
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
        res.status(StatusCodes.UNAUTHORIZED).json({'error': 'Invalid Bearer Token'})
    }
}
module.exports = {
    SetupAccount,
    UpdateAccount,
    DeleteAccount,
    GetAllAccounts,
    GetOneAccountByNumber
}

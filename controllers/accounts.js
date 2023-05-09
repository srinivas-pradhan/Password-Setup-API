const { StatusCodes } = require('http-status-codes')
const AccountStore = require('../models/AWSAccounts')

const SetupAccount  = async ( req, res ) => {
    if (res.locals.authenticated) {
        try {
            const Acc = await AccountStore.create(req.body)
            res.status(StatusCodes.CREATED).json(Acc)
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
                    message: `Required Paramters : "AccountNumber" is not defined.` 
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

const UpdateAccount  = ( req, res ) => {
    res.status(StatusCodes.OK).json({ msg: req.body });
}

const DeleteAccount  = ( req, res ) => {
    res.status(StatusCodes.OK).json({ msg: req.body });
}

const GetAllAccounts  = async ( req, res ) => {
    if (res.locals.authenticated) {
        const Acc = await AccountStore.find({})
        res.status(StatusCodes.OK).json(Acc)
    } else {
        res.status(StatusCodes.UNAUTHORIZED).json({'error': 'Invalid Bearer Token'})
    }
}

const GetOneAccount  = ( req, res ) => {
    res.status(StatusCodes.OK).json({ msg: req.body });
}

module.exports = {
    SetupAccount,
    UpdateAccount,
    DeleteAccount,
    GetAllAccounts,
    GetOneAccount
}

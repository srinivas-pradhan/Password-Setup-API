const { StatusCodes } = require('http-status-codes')
const AccountStore = require('../models/AWSAccounts')

const SetupAccount  = async ( req, res ) => {
    if (res.locals.authenticated) {
        try {
            const Acc = await AccountStore.create(req.body)
            res.status(StatusCodes.CREATED).json(Acc)
        } catch (error) {
            res.status(StatusCodes.BAD_REQUEST).json({ msg: error.name })
        }
    } else {
        res.status(StatusCodes.UNAUTHORIZED).json({'msg': 'Invalid Bearer Token'})
    }
}

const UpdateAccount  = ( req, res ) => {
    res.status(StatusCodes.OK).json({ msg: req.body });
}

const DeleteAccount  = ( req, res ) => {
    res.status(StatusCodes.OK).json({ msg: req.body });
}

const GetAllAccounts  = ( req, res ) => {
    res.status(StatusCodes.OK).json({ msg: req.body });
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

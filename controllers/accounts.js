const { StatusCodes } = require('http-status-codes')


const SetupAccount  = ( req, res ) => {
    res.status(StatusCodes.CREATED).json({ msg: req.body });
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

const { StatusCodes } = require('http-status-codes')


const SetupAccount  = ( req, res ) => {
    if (res.locals.authenticated) {
        console.log(res.locals.uname)
        res.status(StatusCodes.CREATED).json({ msg: req.body })
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

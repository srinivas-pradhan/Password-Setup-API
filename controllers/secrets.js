const { StatusCodes } = require('http-status-codes')


const CreateSecret  = ( req, res ) => {
    if (res.locals.authenticated && (res.locals.authorized || res.locals.auth_user)) {
        console.log(res.locals.authorized)
        console.log(res.locals.auth_user)
    }
    else{
        res.status(StatusCodes.UNAUTHORIZED).json({ error: 'Invalid Bearer Token and/or Check Authorization' })
    }
    res.status(StatusCodes.CREATED).json({ msg: req.body })
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

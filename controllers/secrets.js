const { StatusCodes } = require('http-status-codes')


const CreateSecret  = ( req, res ) => {
    res.status(StatusCodes.CREATED).json({ msg: req.body })
}

const UpdateSecret = ( req, res ) => {
    res.status(StatusCodes.OK).json({ msg: req.body })
}

const DeleteSecret = ( req, res ) => {
    res.status(StatusCodes.OK).json({ msg: req.body })
}

const GetSecrets = ( req, res ) => {
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

const { StatusCodes } = require('http-status-codes')

const CreateMRKey  = ( req, res ) => {
    res.status(StatusCodes.CREATED).json({ msg: req.body })
}

const UpdateMRKey = ( req, res ) => {
    res.status(StatusCodes.OK).json({ msg: req.params })
}

const DeleteMRKey = ( req, res ) => {
    res.status(StatusCodes.OK).json({ msg: req.params })
}

const GetMRKey = ( req, res ) => {
    res.status(StatusCodes.OK).json({ msg: req.body })
}

const GetRegionalKey = ( req, res ) => {
    res.status(StatusCodes.OK).json({ msg: req.params })
}

module.exports = {
    CreateMRKey,
    UpdateMRKey,
    DeleteMRKey,
    GetMRKey,
    GetRegionalKey
  }

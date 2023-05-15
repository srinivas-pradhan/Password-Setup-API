const { StatusCodes } = require('http-status-codes')

const CreateMRKey  = ( req, res ) => {
    if (res.locals.authenticated && res.locals.authorized) {
        try {
            console.log("Hello")
        } catch (error) {
            console.log("Hello Error")
        }

    } else {
        console.log("Hello Error 1")
    }
    res.status(StatusCodes.OK).json({ msg: req.body })
}

const UpdateMRKey = ( req, res ) => {
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

const DeleteMRKey = ( req, res ) => {
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

const GetMRKey = ( req, res ) => {
    if (res.locals.authenticated && res.locals.authorized) {
        try {
            console.log("Hello")
        } catch (error) {
            console.log("Hello Error")
        }

    } else {
        console.log("Hello Error 1")
    }
    res.status(StatusCodes.OK).json({ msg: req.body })
}

const GetRegionalKey = ( req, res ) => {
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
    UpdateMRKey,
    DeleteMRKey,
    GetMRKey,
    GetRegionalKey
  }

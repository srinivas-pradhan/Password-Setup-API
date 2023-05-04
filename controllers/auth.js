const { StatusCodes } = require('http-status-codes')


const LoginUser  = ( req, res ) => {
    res.status(StatusCodes.OK).json({ msg: req.body });
}

module.exports = {
    LoginUser
  }

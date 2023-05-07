const ValidateToken = require('../utils/cognito_getuser')
const { StatusCodes } = require('http-status-codes')


const TokenValidity = ( req, res, next ) => {
    const payload = ValidateToken(
        req.headers.authorization.split(' ')[1]
    ).then(
        (result) => {
            console.log(result)
            //res.status(StatusCodes.OK).json(result)
            next()
        }
    ).catch(
        (err) => {
            res.status(StatusCodes.UNAUTHORIZED).json({'msg': 'Invalid Credentials'})
            next(err)
        }
    )
}

module.exports = TokenValidity

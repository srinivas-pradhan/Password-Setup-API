const ValidateToken = require('../utils/cognito_getuser')
const { StatusCodes } = require('http-status-codes')


const TokenValidity = ( req, res, next ) => {
    if (!req.headers.authorization) {
        return res.status(StatusCodes.BAD_REQUEST).json({ error: 'Please pass the Bearer Token in Headers' });
    }
    const payload = ValidateToken(
        req.headers.authorization.split(' ')[1]
    ).then(
        (result) => {
            if (!result){
                res.locals.authenticated = false
            } 
            else {
                res.locals.authenticated = true
                res.locals.uname = result.Username
            }
            next()
        }
    ).catch(
        (err) => {
            next(err)
        }
    )
}

module.exports = TokenValidity

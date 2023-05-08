const ValidateToken = require('../utils/cognito_getuser')
const { StatusCodes } = require('http-status-codes')


const TokenValidity = ( req, res, next ) => {
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
            throw new Error('Exception message')
        }
    )
}

module.exports = TokenValidity

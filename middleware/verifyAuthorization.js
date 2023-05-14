const JWTDecode = require('../utils/jwt_decode')
const { StatusCodes } = require('http-status-codes')
const conf = require('../config')

const JWTAuthorizer = ( req, res, next ) => {
    const payload = JWTDecode(
        req.headers.authorization.split(' ')[1]
    ).then(
        (result) => {
            if (result['cognito:groups'] == null){
                res.locals.authorized = false
            } 
            else {
                const authorized = conf.AUTHORIZED_ADMINS.some(r=> result['cognito:groups'].indexOf(r) >= 0)
                res.locals.authorized = authorized
            }
            next()
        }
    ).catch(
        (err) => {
            next(err)
        }
    )
}

module.exports = JWTAuthorizer

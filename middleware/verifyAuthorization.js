const JWTDecode = require('../utils/jwt_decode')
const { StatusCodes } = require('http-status-codes')
const conf = require('../config')

const JWTAuthorizer = ( req, res, next ) => {
    const payload = JWTDecode(
        req.headers.authorization.split(' ')[1]
    ).then(
        (result) => {
            if (!result){
                res.locals.authorized = false
            } 
            else {
                const authorized = conf.AUTHORIZED_ADMINS.some(r=> result.indexOf(r) >= 0)
                res.locals.authorized = authorized
                const auth_user = conf.AUTHORIZED_USERS.some(r=> result.indexOf(r) >= 0)
                res.locals.auth_user = auth_user
                if (result.includes(req.body.Cognito_group)) {
                    res.locals.valid_group = true
                }
                else {
                    res.locals.valid_group = false
                }
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

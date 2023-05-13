const JWTDecode = require('../utils/jwt_decode')
const { StatusCodes } = require('http-status-codes')

const JWTAuthorizer = ( req, res, next ) => {
    const payload = JWTDecode(
        req.headers.authorization.split(' ')[1]
    )
    console.log(payload)
    next()
}

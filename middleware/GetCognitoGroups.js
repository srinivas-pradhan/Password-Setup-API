const JWTDecode = require('../utils/jwt_decode')
const { StatusCodes } = require('http-status-codes')

const GetCognitoGroups = (req, res, next) => {
    const payload = JWTDecode(
        req.headers.authorization.split(' ')[1]
    ).then(
        (result) => {
            res.locals.user_groups = result
            next()
        }
    )
}
 
module.exports =  GetCognitoGroups;

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
            console.log(result.UserAttributes.length)
            if (!result){
                res.locals.authenticated = false
            } 
            else {
                res.locals.authenticated = true
                for (let i = 0; i < result.UserAttributes.length; i++) {
                    if (result.UserAttributes[i].Name === 'email') {
                        res.locals.email = result.UserAttributes[i].Value                        
                    }
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

module.exports = TokenValidity

const { StatusCodes } = require('http-status-codes')
const UserAuth = require('../utils/cognito_initate_auth')
const config = require('../config')

const login  = ( req, res ) => {
    const { email, password } = req.body
    if (!email || !password) {
        res.status(StatusCodes.BAD_REQUEST)('Please provide email and password') // Fix this
    }
    auth = UserAuth(email, 
        password, 
        config.COGNITO_APP_CLIENT, 
        config.COGNITO_USER_POOL
    )
    res.status(StatusCodes.OK).json({ auth }) // Add checks around Cognito Auth
    // res.status(StatusCodes.OK).json({ 
    //     'access_token' : auth['AuthenticationResult']['AccessToken'],
    //     'token_type' : auth['AuthenticationResult']['TokenType'],
    //     'expires_in' : auth['AuthenticationResult']['ExpiresIn'],
    //     'refresh_token' : auth['AuthenticationResult']['RefreshToken'],
    //     'token_id' : auth['AuthenticationResult']['IdToken']
    // });
}

module.exports = {
    login
  }

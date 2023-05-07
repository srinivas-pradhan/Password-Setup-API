const { StatusCodes } = require('http-status-codes')

const UserAuth = require('../utils/cognito_initate_auth')
const config = require('../config')

const login  = ( req, res ) => {
    const { username, password } = req.body
    if (!username || !password) {
        res.status(StatusCodes.EXPECTATION_FAILED).json({'msg':'Please provide username and password'})
        return;
    }
    auth = UserAuth(username, 
        password, 
        config.COGNITO_APP_CLIENT, 
        config.COGNITO_USER_POOL
    ).then(
        (result) => {
            res.status(StatusCodes.OK).json(result.AuthenticationResult)
        }
    ).catch(
        (err) => {
            res.status(StatusCodes.UNAUTHORIZED).json({'msg': 'Invalid Credentials'})
        }
    )
    
    
    // .then(
    //     function (result) {
    //         res.status(StatusCodes.OK).json(result.AuthenticationResult)
    //     }
    // ) 


}

module.exports = {
    login
  }

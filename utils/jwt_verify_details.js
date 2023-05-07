const CognitoJwtVerifier = require('aws-jwt-verify')
const config = require('../config')

const jwt_verify_details = async (token) => {
    const verifier = CognitoJwtVerifier.create({
        userPoolId: config.COGNITO_USER_POOL,
        tokenUse: token,
        clientId: config.COGNITO_APP_CLIENT
    })
    try {
        const payload = await verifier.verify(token)
        console.log('Token is valid. Payload:', payload)
        return payload
    } 
    catch (error) {
        console.log(error)
    }
}
module.exports = jwt_verify_details

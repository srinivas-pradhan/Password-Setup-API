const { CognitoIdentityProviderClient, AdminInitiateAuthCommand, AuthFlowType } = require("@aws-sdk/client-cognito-identity-provider")
const client = new CognitoIdentityProviderClient();
const config = require('./config')

const admin_initiate_auth = async (username, password, next) => {
    const command = new AdminInitiateAuthCommand({
        ClientId: config.COGNITO_APP_CLIENT,
        UserPoolId: config.COGNITO_USER_POOL,
        AuthFlow: AuthFlowType.ADMIN_USER_PASSWORD_AUTH,
        AuthParameters: { USERNAME: username, PASSWORD: password },
    })
    try {
        response = await client.send(command);
        return response
        next()
    } catch (error) {
        console.log(error)
    }
}

module.exports = admin_initiate_auth

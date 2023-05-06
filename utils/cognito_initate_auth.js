const { CognitoIdentityProviderClient, AdminInitiateAuthCommand, AuthFlowType } = require("@aws-sdk/client-cognito-identity-provider")
const client = new CognitoIdentityProviderClient();

const admin_initiate_auth = async (username, password, app_client, user_pool) => {
    const command = new AdminInitiateAuthCommand({
        ClientId: app_client,
        UserPoolId: user_pool,
        AuthFlow: AuthFlowType.ADMIN_USER_PASSWORD_AUTH,
        AuthParameters: { USERNAME: username, PASSWORD: password },
    })
    try {
        response = await client.send(command)
        return response
    } catch (error) {
        console.log(error)
    }
}

module.exports = admin_initiate_auth

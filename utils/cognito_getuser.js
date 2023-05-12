const { CognitoIdentityProviderClient, GetUserCommand } = require("@aws-sdk/client-cognito-identity-provider")

const client = new CognitoIdentityProviderClient();

const get_user = async (token) => {
    const command = new GetUserCommand({
        AccessToken: token
    })
    try {
        response = await client.send(command);
        return response
    } catch (error) {
        return error.name
    }
}

module.exports = get_user

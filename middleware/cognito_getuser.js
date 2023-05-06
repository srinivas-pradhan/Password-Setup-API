const { CognitoIdentityProviderClient, GetUserCommand } = require("@aws-sdk/client-cognito-identity-provider")
const config = require('./config')

const get_user = async (token, next) => {
    const command = new GetUserCommand({
        AccessToken: token
    })
    try {
        response = await client.send(command);
        return response
        next()
    } catch (error) {
        console.log(error)
    }
}

module.exports = get_user

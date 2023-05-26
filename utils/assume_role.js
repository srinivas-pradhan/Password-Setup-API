const { STSClient, AssumeRoleCommand } = require("@aws-sdk/client-sts")
const client = new STSClient();


const assume_role = async ( role_arn, role_session_name = "Password-Setup-API") => {
    const command = new AssumeRoleCommand({
        "RoleArn": role_arn,
        "RoleSessionName": role_session_name,
    });
    try {
        response = await client.send(command)
        return response
    } catch (error) {
        return error
    }
}

module.exports = assume_role

const { KMSClient, CreateKeyCommand } = require("@aws-sdk/client-kms")


// Setup and use Assume Role for multiple accounts
// https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/clients/client-batch/classes/assumerolecommand.html
// config = { credentials: AssumeRole.credentials, region: 'default_region'}
// KMS Client - pass the credentials object eg: new KMSClient()

const create_kms_key = async () => {
    const client = new KMSClient()
    const command = new CreateKeyCommand({
        KeySpec: "RSA_4096",
        KeyUsage: "ENCRYPT_DECRYPT",
        MultiRegion: true,
        Tags: [
            {
                TagKey: "Owner",
                TagValue: "Password-Setup-API"
            }
        ]
    })
    try {
        response = await client.send(command)
        return response
    } catch (error) {
        console.log(error)
    }
}

module.exports = create_kms_key

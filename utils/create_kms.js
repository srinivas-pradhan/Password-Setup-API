const { KMSClient, CreateKeyCommand } = require("@aws-sdk/client-kms")

const create_kms_key = async (creds) => {
    const client = new KMSClient({'credentials': creds})
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

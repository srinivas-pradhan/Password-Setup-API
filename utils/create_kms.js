const { KMSClient, CreateKeyCommand } = require("@aws-sdk/client-kms")

const create_kms_key = async (creds) => {
    const client = new KMSClient({'credentials': creds})
    const command = new CreateKeyCommand({
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
        return error
    }
}

module.exports = create_kms_key

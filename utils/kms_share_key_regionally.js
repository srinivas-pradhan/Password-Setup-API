const { KMSClient, ReplicateKeyCommand } = require("@aws-sdk/client-kms")

const share_kms_key_regionally = async (creds, key_id) => {
    const client = new KMSClient({'credentials': creds})
    const command = "hey"
    try {
        response = await client.send(command)
        return response
    } catch (error) {
        console.log(error)
    }
}

module.exports = share_kms_key_regionally

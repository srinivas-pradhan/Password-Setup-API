const { KMSClient, ReplicateKeyCommand } = require("@aws-sdk/client-kms")

const share_kms_key_regionally = async (creds, key_id, replica_region) => {
    const client = new KMSClient({'credentials': creds})
    const command = new ReplicateKeyCommand({
        "KeyId": key_id,
        "ReplicaRegion": replica_region,
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

module.exports = share_kms_key_regionally

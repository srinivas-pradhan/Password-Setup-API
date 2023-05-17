const { KMSClient, ScheduleKeyDeletionCommand } = require("@aws-sdk/client-kms")

const delete_kms_key = async (creds, key_id) => {
    const client = new KMSClient({'credentials': creds})
    const command = "hey"
    try {
        response = await client.send(command)
        return response
    } catch (error) {
        console.log(error)
    }
}

module.exports = delete_kms_key

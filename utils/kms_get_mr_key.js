const { KMSClient, DescribeKeyCommand } = require("@aws-sdk/client-kms")

const get_kms_key_details = async (creds, key_id) => {
    const client = new KMSClient({'credentials': creds})
    const command = new DescribeKeyCommand({
        KeyId: key_id
    })
    try {
        response = await client.send(command)
        return response
    } catch (error) {
        return error
    }
}

module.exports = get_kms_key_details

const { KMSClient, DescribeKeyCommand } = require("@aws-sdk/client-kms")

const get_kms_key_details = async (creds, key_id) => {
    const client = new KMSClient({'credentials': creds})
    const command = "hey"
    try {
        response = await client.send(command)
        return response
    } catch (error) {
        console.log(error)
    }
}

module.exports = get_kms_key_details

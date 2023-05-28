const { SecretsManagerClient, UpdateSecretCommand } = require("@aws-sdk/client-secrets-manager")

const update_secret = async (creds, region, kmsid, secret_id, desc, secret_string) => {
    const client = new SecretsManagerClient({'credentials': creds, 'region': region});
    const command = new UpdateSecretCommand({
        SecretId: secret_id,
        Description: desc,
        KmsKeyId: kmsid,
        SecretString: secret_string
      })
    try {
        response = await client.send(command)
        return response
    } catch (error) {
        console.log(error)
    }
}

module.exports = update_secret

const { SecretsManagerClient, DeleteSecretCommand } = require("@aws-sdk/client-secrets-manager")

const delete_secret = async (creds, region, secret_id, kms_recovery_window) => {
    const client = new SecretsManagerClient({'credentials': creds, 'region': region});
    const command = new DeleteSecretCommand({
        SecretId: secret_id,
        RecoveryWindowInDays: Number(kms_recovery_window),
        ForceDeleteWithoutRecovery: false
      })
    try {
        response = await client.send(command)
        return response
    } catch (error) {
        console.log(error)
    }
}

module.exports = delete_secret

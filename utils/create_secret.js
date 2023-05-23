const { SecretsManagerClient, CreateSecretCommand } = require("@aws-sdk/client-secrets-manager")

const create_secret = async (creds, name, kmsid, secret_string, desc ,tags = [{}]) => {
    const client = new SecretsManagerClient({'credentials': creds});
    const command = new CreateSecretCommand(
        {
            Name: name,
            Description: desc,
            KmsKeyId: kmsid,
            SecretString: secret_string,
            Tags: tags
        }
    )
    try {
        response = await client.send(command)
        return response
    } catch (error) {
        console.log(error)
    }
}

module.exports = create_secret

const { SecretsManagerClient, CreateSecretCommand } = require("@aws-sdk/client-secrets-manager")

const create_secret = async (creds, region, name, kmsid, secret_string, desc) => {
    const client = new SecretsManagerClient({'credentials': creds, 'region': region} );
    const command = new CreateSecretCommand(
        {
            Name: name,
            Description: desc,
            KmsKeyId: kmsid,
            SecretString: secret_string,
            Tags: [{
                Key: "Owner",
                Value: "Password-Setup-API"
            }]
        }
    )
    try {
        response = await client.send(command)
        return response
    } catch (error) {
        return error.name
    }
}

module.exports = create_secret

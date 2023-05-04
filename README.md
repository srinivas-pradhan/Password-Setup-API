# Password-Setup-API
 This API takes password and stores a hash in MongoDB and uploads the secret to AWS Secrets Manager

## App Setup 

### Install App Dependencies
```
npm install
```

### Start the App
```
npm start
```

### Setup `.env` file

```
MONGO_URI=[MONGODB_ATLAS_URI]
PORT=[App PORT]
COGNITO_APP_CLIENT=[Cognito App Client Key]
COGNITO_USER_POOL=[Cognito User Pool ID]
```


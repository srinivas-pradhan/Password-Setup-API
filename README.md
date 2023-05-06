# Password-Setup-API
This API takes password and stores metadata in MongoDB and uploads the secret to AWS Secrets Manager


## App Setup 

### Node Version
```
node --version
v19.6.1
```
### NPM Version
```
npm --version
9.4.0
```
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
MONGO_URI=[MONGODB ATLAS URI]
PORT=[App PORT]
COGNITO_APP_CLIENT=[Cognito App Client Key]
COGNITO_USER_POOL=[Cognito User Pool ID]
```

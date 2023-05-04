require('dotenv').config()

const PORT = process.env.PORT
const MONGO_URI = process.env.MONGO_URI
const COGNITO_APP_CLIENT = process.env.COGNITO_APP_CLIENT
const COGNITO_USER_POOL = process.env.COGNITO_USER_POOL

module.exports = {
    PORT,
    MONGO_URI,
    COGNITO_APP_CLIENT,
    COGNITO_USER_POOL
}

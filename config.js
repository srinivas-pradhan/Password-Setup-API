require('dotenv').config()

const PORT = process.env.PORT
const MONGO_URI = process.env.MONGO_URI
const COGNITO_APP_CLIENT = process.env.COGNITO_APP_CLIENT
const COGNITO_USER_POOL = process.env.COGNITO_USER_POOL
const LOG_LEVEL = process.env.LOG_LEVEL
const AUTHORIZED_ADMINS = process.env.AUTHORIZED_ADMINS.split(',')


module.exports = {
    PORT,
    MONGO_URI,
    COGNITO_APP_CLIENT,
    COGNITO_USER_POOL,
    LOG_LEVEL,
    AUTHORIZED_ADMINS
}

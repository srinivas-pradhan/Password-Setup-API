const express = require('express')
const morgan = require('morgan');
const app = express()
const MongoDB = require('./db/mongo')

const { MONGO_URI, PORT, LOG_LEVEL } = require('./config')
const accountRouter = require('./routes/accounts')
const kmsRouter = require('./routes/kms')
const secretsRouter = require('./routes/secrets')
const AuthRouter = require('./routes/auth')

app.use(express.json())
app.use(morgan(LOG_LEVEL))


// routes
app.use('/api/v1/accounts', accountRouter)
app.use('/api/v1/kms', kmsRouter)
app.use('/api/v1/secrets', secretsRouter)
app.use('/api/v1/auth', AuthRouter)

const start = async () => {
    try {
        await MongoDB(MONGO_URI)
        app.listen(PORT, () => 
                console.log(`Server is listening on ${PORT}...`)
            )   
    } catch (error) {
        console.log(error)
    }
}
start()

const express = require('express')
const app = express()
const MongoDB = require('./db/mongo')
const {PORT, MONGO_URI } = require('./config')
require('dotenv').config()

app.use(express.json())



const start = async () => {
    try {
        await MongoDB(MONGO_URI)
        app.listen(PORT, () => 
                console.log(`Server is listening on ${PORT} `)
            )   
    } catch (error) {
        console.log(error)
    }
}
start()

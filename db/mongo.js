const mongoose = require('mongoose')

const MongoDB = (url) => {
return mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
}

module.exports = MongoDB

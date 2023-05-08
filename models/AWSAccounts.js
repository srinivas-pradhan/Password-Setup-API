const mongoose = require('mongoose')

const AWSAccountSchema = new mongoose.Schema(
    {
        AccountNumber: {
            type: Number,
            required: [true, 'AWS Account Number must be provided.'],
        },
        AccountType: {
            type: String,
            enum: ['prod', 'stg'],
            default: 'prod',
        },
        DefaultRegion: {
            type: String,
            enum: ['us-east-1', 'us-east-2', 'us-west-1'],
            default: 'us-east-1',
        }
})

module.exports = mongoose.model('AccountStore', AWSAccountSchema)

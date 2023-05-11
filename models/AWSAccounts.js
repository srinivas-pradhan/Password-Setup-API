const mongoose = require('mongoose')

const AWSAccountSchema = new mongoose.Schema(
    {
        AccountNumber: {
            type: Number,
            required: [true, 'AWS Account Number must be provided.'],
            unique: true,
            index: true,
            max: 12,
            min: 12
        },
        AccountType: {
            type: String,
            enum: ['default','prod', 'stg'],
            default: 'default',
            index: true
        },
        DefaultRegion: {
            type: String,
            enum: ['us-east-1', 'us-east-2', 'us-west-1'],
            default: 'us-east-1'
        }
})

module.exports = mongoose.model('AccountStore', AWSAccountSchema)

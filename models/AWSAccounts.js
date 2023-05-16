const mongoose = require('mongoose')

const AWSAccountSchema = new mongoose.Schema(
    {
        AccountNumber: {
            type: Number,
            required: [true, 'AWS Account Number must be provided.'],
            unique: true,
            validate: {
                validator: function(v) {
                  return /^([0-9]{12}$)/.test(v);
            }},
        },
        AccountType: {
            type: String,
            enum: ['default','prod', 'stg'],
            default: 'default',
        },
        SupportedRegions: {
            type: [String],
            default: ['us-east-1'],
            enum: ['us-east-1', 'us-east-2', 'us-west-1'],
            required: [true, 'AWS SupportedRegions must be provided']
        },
        KMSKey: {
            type: String,
            default: null

        },
        Created_by: {
            type: String,
            match: [
              /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            ]        
        },
        IAMRole: {
            type: String,
            default: null
        }
})

module.exports = mongoose.model('AccountStore', AWSAccountSchema)

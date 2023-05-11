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

        }
})

AWSAccountSchema.index({ AccountNumber: 1, AccountType: 1 }, { unique: true });

module.exports = mongoose.model('AccountStore', AWSAccountSchema)

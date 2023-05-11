const mongoose = require('mongoose')

const RegionSchema = new mongoose.Schema(
    {
        Regions: {
            type: String,
            enum: ['us-east-1', 'us-east-2', 'us-west-1'],
            default: 'us-east-1'
        }
    }
)

const AWSAccountSchema = new mongoose.Schema(
    {
        AccountNumber: {
            type: Number,
            required: [true, 'AWS Account Number must be provided.'],
            unique: true,
            index: true,
            validate: {
                validator: function(v) {
                  return /^([0-9]{12}$)/.test(v);
            }},
        },
        AccountType: {
            type: String,
            enum: ['default','prod', 'stg'],
            default: 'default',
            index: true
        },
        SupportedRegions: {
            Array: [RegionSchema]
        }
})

AWSAccountSchema.index({ AccountNumber: 1, AccountType: 1 }, { unique: true });

module.exports = mongoose.model('AccountStore', AWSAccountSchema)

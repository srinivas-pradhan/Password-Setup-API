const mongoose = require('mongoose')

const SecretSchema = new mongoose.Schema(
    {
      secretName: {
        type: String,
        required: [true, 'Please provide a secret name'],
        maxlength: 50,
      },
      SecretString: {
        type: String,
        required: [true, 'Please provide a secret to upload to Secrets Manager'],
        maxlength: 100,
      },
      AccountNumber: {
        type: Number,
        required: [true, 'AWS Account Number must be provided.'],
        unique: true,
        validate: {
            validator: function(v) {
              return /^([0-9]{12}$)/.test(v);
        }},
      },
      Region: {
        type: String,
        enum: ['us-east-1', 'us-east-2', 'us-west-1'],
        required: [true, 'AWS SupportedRegions must be provided']
      },
      Created_by: {
        type: String,
        match: [
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        ]        
      }
    },
    { timestamps: true }
  )
  
  module.exports = mongoose.model('SecretStore', SecretSchema)
  
